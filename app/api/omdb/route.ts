import axios from 'axios'
import { NextRequest } from 'next/server';

export default async function handler(req: { title: any; }, res: any){

//const res_exmple= `{"Title":"One Piece","Year":"1999–","Rated":"TV-14","Released":"20 Oct 1999","Runtime":"24 min","Genre":"Animation, Action, Adventure","Director":"N/A","Writer":"Eiichiro Oda","Actors":"Mayumi Tanaka, Akemi Okamura, Laurent Vernin","Plot":"There once lived a pirate named Gol D. Roger. He obtained wealth, fame, and power to earn the title of Pirate King. When he was captured and about to be executed, he revealed that his treasure called One Piece was hidden somewhere at the Grand Line. This made all people set out to search and uncover the One Piece treasure, but no one ever found the location of Gol D. Roger's treasure, and the Grand Line was too dangerous a place to overcome. Twenty-two years after Gol D. Roger's death, a boy named Monkey D. Luffy decided to become a pirate and search for Gol D. Roger's treasure to become the next Pirate King.","Language":"Japanese","Country":"Japan","Awards":"6 wins & 13 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BMTNjNGU4NTUtYmVjMy00YjRiLTkxMWUtNzZkMDNiYjZhNmViXkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"9.0/10"}],"Metascore":"N/A","imdbRating":"9.0","imdbVotes":"265,872","imdbID":"tt0388629","Type":"series","totalSeasons":"1","Response":"True"}`

const{title}= req;

try {
    const response= await axios.get(`http://www.ombdapi.com/?${title}&apikey=${process.env.OMDB_API_KEY}`);
    //const response= res_exmple 
    res.status(200).json(response.data);
} catch (error) {
    res.status(500).json({error:"Failed to fetch movie details"});
}

}