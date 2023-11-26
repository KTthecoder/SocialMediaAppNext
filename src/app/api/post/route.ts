import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body = await req.json()
        const { description, images, username } = body
    
        const existingUserByUsername = await prisma.users.findFirst({where: {username: username}})
        if(!existingUserByUsername){
            return NextResponse.json({message: 'User with that username does not exists'}, {status: 409})
        }
    
        const newPost = await prisma.posts.create({data: {
            description: description,
            usersId: existingUserByUsername.id,
            PostImages: {create: {src: images, alt: 'Post'}}
        }})
    
        return NextResponse.json({message: 'Post created succesfully'}, {status: 201})
    }
    catch (error){
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}

export async function DELETE(req:Request){
    try{
        const body = await req.json()
        const { username, postId } = body
    
        const existingUserByUsername = await prisma.users.findUnique({where: {username: username}})
        if(!existingUserByUsername){
            return NextResponse.json({message: 'User with that id does not exists'}, {status: 409})
        }

        const existingPostById = await prisma.posts.findUnique({where: {id: postId}})
        if(!existingPostById){
            return NextResponse.json({message: 'Post with that id does not exists'}, {status: 409})
        }

        const deletePost = await prisma.posts.delete({where: {
            id: postId,
            usersId: existingUserByUsername.id
        }})

        return NextResponse.json({message: 'Post deleted succesfully'}, {status: 200})
    }
    catch (error){
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}