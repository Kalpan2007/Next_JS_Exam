"use client";

import { Typography, Button, Box, Stack } from "@mui/material";
import Link from "next/link";
import SearchWidget from "../../components/SearchWidget";

export default function HomePage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to Tech News
      </Typography>

      <Typography variant="h6">Rendering Methods:</Typography>
      <ul>
        <li><b>CSR</b>: Client-side rendering (fetch in browser)</li>
        <li><b>SSR</b>: Server-side rendering (fetch on server, every request)</li>
        <li><b>SSG</b>: Static site generation (build-time HTML)</li>
        <li><b>ISR</b>: Incremental static regeneration (rebuild after interval)</li>
      </ul>

      <Stack direction="row" spacing={2} my={2}>
        <Button component={Link} href="/top-news" variant="contained">
          Top News
        </Button>
        <Button component={Link} href="/story/38600909" variant="outlined">
          Sample Story
        </Button>
      </Stack>

      <Typography variant="h6" mt={3}>
        🔍 Try Searching
      </Typography>
      <SearchWidget />
    </Box>
  );
}
