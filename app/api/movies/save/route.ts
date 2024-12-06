import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createMovieSchema } from "../../../validationSchemas";


export async function POST(request: NextRequest)
{
    const body = await request.json();
    const validation =createMovieSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})
  
    const newMovie= await prisma.movie.create({
    data:{title: body.title, poster_path: body.Plot, status:body.status} 
    });

    return NextResponse.json(newMovie, {status: 201});
    
}