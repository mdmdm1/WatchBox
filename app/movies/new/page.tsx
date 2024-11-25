"use client";

import { Button, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
// import "@radix-ui/themes/styles.css";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

interface MovieForm {
  title: string;
}

const NewMoviePage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<MovieForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/movies", data);
        router.push("/movies");
      })}
    >
      <TextField.Root
        radius="large"
        placeholder="Title"
        {...register("title")}
      />
      <Button>Submit New Movie</Button>
    </form>
  );
};

export default NewMoviePage;
