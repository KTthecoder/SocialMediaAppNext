import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body = await req.json()
        const { text, userId, postId } = body
    
        const existingUserById = await prisma.users.findUnique({where: {id: userId}})
        if(!existingUserById){
            return NextResponse.json({message: 'User with that id does not exists'}, {status: 409})
        }

        const existingPostById = await prisma.posts.findUnique({where: {id: postId}})
        if(!existingPostById){
            return NextResponse.json({message: 'Post with that id does not exists'}, {status: 409})
        }
    
        const newPostComment = await prisma.postComments.create({data: {
            usersId: userId,
            postsId: postId,
            text: text
        }})
    
        return NextResponse.json({message: 'Comment added succesfully'}, {status: 201})
    }
    catch (error){
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}