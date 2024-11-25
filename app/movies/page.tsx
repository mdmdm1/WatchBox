import { Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import Link from "next/link";

import React from "react";
const MoviesPage = () => {
  return (
    <div>
      <Button>
        <Link href="/movies/new">New Movie</Link>
      </Button>
    </div>
  );
};

export default MoviesPage;
