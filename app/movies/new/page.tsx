"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
// import "@radix-ui/themes/styles.css";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMovieSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type MovieForm = z.infer<typeof createMovieSchema>;

const NewMoviePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieForm>({
    resolver: zodResolver(createMovieSchema),
  });
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/movies", data);
            router.push("/movies");
          } catch (error) {
            setError("An unexcepted error occured.");
          }
        })}
      >
        <TextField.Root
          radius="large"
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Button>Submit New Movie</Button>
      </form>
    </div>
  );
};

export default NewMoviePage;
