import { Box, Button, TextField } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import React from "react";

const NewMoviePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root radius="large" placeholder="Title" />
      <Button>Submit New Movie</Button>
    </div>
  );
};

export default NewMoviePage;
