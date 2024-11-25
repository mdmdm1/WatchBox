import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";


const createMovieSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255)
})

export async function POST(request: NextRequest)
{
    const body = await request.json();
    const validation =createMovieSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})
 
    const newMovie= await prisma.movie.create({
    data:{title: body.title} 
    });

    return NextResponse.json(newMovie, {status: 201});
    
}