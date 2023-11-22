import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body = await req.json()
        const { images, name, visibility, description, username } = body
    
        const existingUserByUsername = await prisma.users.findFirst({where: {username: username}})
        if(!existingUserByUsername){
            return NextResponse.json({message: 'User with that username does not exists'}, {status: 409})
        }
    
        const newGroup = await prisma.groups.create({data: {
            description: description,
            name: name,
            usersId: existingUserByUsername.id,
            status: visibility
        }})

        const newUserInGroup = await prisma.userInGroup.create({data: {
            usersId: existingUserByUsername.id,
            groupsId: newGroup.id
        }})
    
        return NextResponse.json({message: 'Group created succesfully'}, {status: 201})
    }
    catch (error){
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}