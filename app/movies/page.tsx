"use client";
import { Button, Card } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import axios from "axios";
import Link from "next/link";
import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
enum Watchstatus {
  TO_WATCH = "TO_WATCH",
  IN_PROGRESS = "IN_PROGRESS",
  WATCHED = "WATCHED",
}
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  AddedAt: string;
  status?: Watchstatus;
}

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentStatus, setCurrentStatus] = useState<Watchstatus | null>(null);

  const getWatchList = useCallback(async (status: Watchstatus) => {
    try {
      // Update current status for UI feedback
      setCurrentStatus(status);

      // Fetch movies based on status
      const response = await axios.get(
        `/api/movies/watchlist?status=${status}`
      );

      // Update movies state
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("Failed to fetch movies. Please try again.");
    }
  }, []);

  useEffect(() => {
    // Default to 'TO_WATCH' when page loads
    getWatchList(Watchstatus.TO_WATCH);
  }, [getWatchList]);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex justify-center">
        <Button variant="solid" color="indigo">
          <Link href="/movies/new" className="no-underline">
            Add New Movie
          </Link>
        </Button>
      </div>

      <div className="flex justify-center gap-3">
        {[
          { status: Watchstatus.TO_WATCH, label: "To Watch", color: "blue" },
          {
            status: Watchstatus.IN_PROGRESS,
            label: "Watching Now",
            color: "yellow",
          },
          { status: Watchstatus.WATCHED, label: "Watched", color: "green" },
        ].map(({ status, label, color }) => (
          <Button
            key={status}
            variant={currentStatus === status ? "solid" : "outline"}
            color={color as any}
            onClick={() => getWatchList(status)}
            className="flex-1"
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Card key={movie.id} className="hover:shadow-lg transition-shadow">
              <div className="relative pb-[150%] overflow-hidden rounded-md">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <p>No poster available</p>
                )}
              </div>

              <div className="mt-2 text-center">
                <h3 className="font-semibold text-sm truncate">
                  {movie.title}
                </h3>
                <p className="text-xs text-gray-500">
                  Added: {format(new Date(movie.AddedAt), "MMMM d, yyyy")}
                </p>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No movies in this category
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
