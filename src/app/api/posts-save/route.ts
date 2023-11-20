import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body = await req.json()
        const { postId, username } = body
    
        const existingUserByUsername = await prisma.users.findFirst({where: {username: username}})
        if(!existingUserByUsername){
            return NextResponse.json({message: 'User with that username does not exists'}, {status: 409})
        }
    
        const newPost = await prisma.savedPosts.create({data: {
            usersId: existingUserByUsername.id,
            postsId: postId
        }})
    
        return NextResponse.json({message: `Post saved for ${username} succesfully`}, {status: 201})
    }
    catch (error){
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}