"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
// import "@radix-ui/themes/styles.css";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface MovieForm {
  title: string;
}

const NewMoviePage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<MovieForm>();
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
        <Button>Submit New Movie</Button>
      </form>
    </div>
  );
};

export default NewMoviePage;
