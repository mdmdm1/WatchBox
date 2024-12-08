import prisma from "@/prisma/client";
import axios from "axios";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const {searchParams}  = new URL(req.url)
    const status = searchParams.get("status")
    if (!status) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    try {
        const movies = await prisma.movie.findMany({where: {
                    status: status as any, },
            select: {
                id: true,
                title: true,
                poster_path: true,
                status: true,
                AddedAt: true,
                updatedAt: true,
            },
        });
        return NextResponse.json(movies, {status: 200})
          }
          catch(error){
            console.error("Error fetching movies,", error);
            return NextResponse.json(
                {error: "failed to fetch movies"},
                {status: 500}
            )
          }
} 