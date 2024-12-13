"use client";

import { Button, Callout, Card, Grid, Text, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMovieSchema } from "@/app/validationSchemas";
import { EnumLike, z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

export const searchMovieSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
});

type SearchMovieForm = z.infer<typeof searchMovieSchema>;

enum Watchstatus {
  TO_WATCH = "TO_WATCH",
  IN_PROGRESS = "IN_PROGRESS",
  WATCHED = "WATCHED",
}
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  status?: Watchstatus;
}
const NewMoviePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const { register, handleSubmit } = useForm<SearchMovieForm>({
    resolver: zodResolver(searchMovieSchema),
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const SearchMovie = async (data: SearchMovieForm) => {
    setSubmitting(true);
    try {
      const response = await axios.get(
        `/api/movies/search?title=${data.title}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
    setSubmitting(false);
  };

  const addMovieTowatchList = async (movie: Movie, status: Watchstatus) => {
    try {
      const movieToSave = { ...movie, status };
      await axios.post("/api/movies/save", movieToSave);
      router.push("/movies");
    } catch (error) {
      console.error("Error adding movie", error);
      alert("Failed to save the movie. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form className="mb-4 flex gap-2" onSubmit={handleSubmit(SearchMovie)}>
        <TextField.Root
          {...register("title")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search for a movie..."
          className="flex-grow p-2 border rounded"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className=" text-white px-4 py-2 rounded hover:bg-cyan-700"
        >
          {isSubmitting && <Spinner />}Search
        </Button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap=4">
        {movies &&
          movies.map((movie) => (
            <Card
              key={movie.id}
              className=" p-3 flex flex-col items-center justify-between text-center"
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto object-cover rounded mb-3"
                />
              )}
              <div className="p-3 text-center">
                <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
                <p className="text-sm mb-2">Release: {movie.release_date}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    onClick={() =>
                      addMovieTowatchList(movie, Watchstatus.TO_WATCH)
                    }
                    className="flex-1 !bg-blue-400 !text-white py-1 px-2 rounded hover:!bg-blue-800"
                  >
                    To watch
                  </Button>
                  <Button
                    onClick={() =>
                      addMovieTowatchList(movie, Watchstatus.IN_PROGRESS)
                    }
                    className="flex-1 !bg-yellow-500 !text-white py-1 px-2 rounded hover:!bg-yellow-600"
                  >
                    Watching now
                  </Button>
                  <Button
                    onClick={() =>
                      addMovieTowatchList(movie, Watchstatus.WATCHED)
                    }
                    className="flex-1 !bg-green-500 !text-white py-1 px-2 rounded hover:!bg-green-600"
                  >
                    Watched
                  </Button>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};
export default NewMoviePage;

/* const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieForm>({
    resolver: zodResolver(createMovieSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/movies", data);
      router.push("/movies");
    } catch (error) {
      setSubmitting(false);
      setError("An unexcepted error occured.");
    }
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          radius="large"
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Movie {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  ); 
};*/
