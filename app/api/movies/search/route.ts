import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const apikey=process.env.TMDB_API_KEY;
    
    if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
              query: title, // Movie title to search for
              api_key: apikey, // Your TMDB API Key
            },
          });
          
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('TMDB API Error:', error);
        return NextResponse.json({ error: "Failed to fetch movie details" }, { status: 500 });
    }
}