import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body = await req.json()
        const { user1Id, user2Id } = body
    
        const existingUserById1 = await prisma.users.findFirst({where: {id: user1Id}})
        if(!existingUserById1){
            return NextResponse.json({message: 'User with that id does not exists'}, {status: 409})
        }

        const existingUserById2 = await prisma.users.findFirst({where: {id: user2Id}})
        if(!existingUserById2){
            return NextResponse.json({message: 'User with that id does not exists'}, {status: 409})
        }
    
        const newFriend = await prisma.friends.create({data: {
            user1Id: user1Id,
            user2Id: user2Id
        }})
    
        return NextResponse.json({message: 'Friend added succesfully'}, {status: 201})
    }
    catch (error){
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}

export async function DELETE(req:Request){
    try{
        const body = await req.json()
        const { user1Id, user2Id } = body
    
        const existingUserById1 = await prisma.users.findFirst({where: {id: user1Id}})
        if(!existingUserById1){
            return NextResponse.json({message: 'User with that id does not exists'}, {status: 409})
        }

        const existingUserById2 = await prisma.users.findFirst({where: {id: user2Id}})
        if(!existingUserById2){
            return NextResponse.json({message: 'User with that id does not exists'}, {status: 409})
        }

        const existingInvitationByUsers = await prisma.friends.findFirst({where: {user1Id: user1Id, user2Id: user2Id}})
        if(!existingInvitationByUsers){
            return NextResponse.json({message: 'Invitation with that credentials does not exists'}, {status: 409})
        }

        const newFriend = await prisma.friends.delete({where: {
            id: existingInvitationByUsers.id
        }})
    
        return NextResponse.json({message: 'Friend deleted succesfully'}, {status: 201})
    }
    catch (error){
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}