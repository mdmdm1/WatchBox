import { z } from "zod";

export const createMovieSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255)
});
