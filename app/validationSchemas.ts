import { z } from "zod";

export const createMovieSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255), 
    poster_path: z.string().optional(),
    status: z.enum(['TO_WATCH','IN_PROGRESS','WATCHED'])
   
});
