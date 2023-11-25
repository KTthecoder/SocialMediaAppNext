import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body = await req.json()
        const { inviteId } = body
    
        const existingInviteById = await prisma.friends.findFirst({where: {id: inviteId}})
        if(!existingInviteById){
            return NextResponse.json({message: 'Invitation with that id does not exists'}, {status: 409})
        }
    
        const newFriend = await prisma.friends.update({where: {
            id: inviteId
        }, data: {
            isPending: false
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
        const { inviteId } = body
    
        const existingInviteById = await prisma.friends.findFirst({where: {id: inviteId}})
        if(!existingInviteById){
            return NextResponse.json({message: 'Invitation with that id does not exists'}, {status: 409})
        }
    
        const newFriend = await prisma.friends.delete({where: {
            id: inviteId
        }})
    
        return NextResponse.json({message: 'Friend deleted succesfully'}, {status: 201})
    }
    catch (error){
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}