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
            status: visibility,
            image: images,
            imageAlt: 'Group'
        }})

        const newUserInGroup = await prisma.userInGroup.create({data: {
            usersId: existingUserByUsername.id,
            groupsId: newGroup.id,
        }})
    
        return NextResponse.json({message: 'Group created succesfully'}, {status: 201})
    }
    catch (error){
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}

export async function DELETE(req:Request){
    try{
        const body = await req.json()
        const { username, groupId } = body
    
        const existingUserByUsername = await prisma.users.findUnique({where: {username: username}})
        if(!existingUserByUsername){
            return NextResponse.json({message: 'User with that id does not exists'}, {status: 409})
        }

        const existingGroupById = await prisma.groups.findUnique({where: {id: groupId}})
        if(!existingGroupById){
            return NextResponse.json({message: 'Group with that id does not exists'}, {status: 409})
        }

        const deleteGroup = await prisma.groups.delete({where: {
            id: groupId,
            usersId: existingUserByUsername.id
        }})

        return NextResponse.json({message: 'Group deleted succesfully'}, {status: 200})
    }
    catch (error){
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}