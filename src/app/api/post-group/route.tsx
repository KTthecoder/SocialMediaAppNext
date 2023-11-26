import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body = await req.json()
        const { description, images, username, groupId } = body
    
        const existingUserByUsername = await prisma.users.findFirst({where: {username: username}})
        if(!existingUserByUsername){
            return NextResponse.json({message: 'User with that username does not exists'}, {status: 409})
        }
    
        const existingGroupById = await prisma.groups.findFirst({where: {id: groupId}})
        if(!existingGroupById){
            return NextResponse.json({message: 'Group with that id does not exists'}, {status: 409})
        }

        const newPost = await prisma.posts.create({data: {
            description: description,
            usersId: existingUserByUsername.id,
            groupsId: groupId,
            PostImages: {create: {src: images, alt: 'Post'}}
        }})
    
        return NextResponse.json({message: 'Post created succesfully'}, {status: 201})
    }
    catch (error){
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}