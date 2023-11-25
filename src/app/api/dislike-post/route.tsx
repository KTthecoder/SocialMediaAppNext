import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body = await req.json()
        const { postId, userId } = body

        const existingPostById = await prisma.posts.findFirst({where: {id: postId}})
        if(!existingPostById){
            return NextResponse.json({message: 'Post with that id does not exists'}, {status: 409})
        }

        const existinguserById = await prisma.users.findFirst({where: {id: userId}})
        if(!existinguserById){
            return NextResponse.json({message: 'User with that id does not exists'}, {status: 409})
        }

        const updatedPost = await prisma.posts.update({where: {id: existingPostById.id}, data: {
            disLikes: existingPostById.disLikes + 1
        }})

        const likedPosts = await prisma.disLikedPosts.create({data: {postsId: postId, usersId: userId}})

        return NextResponse.json({message: 'Post liked succesfully'}, {status: 201})
    }
    catch (error){
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}