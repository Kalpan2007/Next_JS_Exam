"use client";

import { useState } from "react";
import { TextField, Button, List, ListItem, Typography } from "@mui/material";

export default function SearchWidget() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  async function handleSearch() {
    if (!query) return;
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=5`
      );
      const data = await res.json();
      setResults(data.hits);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <TextField
        label="Search stories"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="small"
        sx={{ mr: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

      {loading && <Typography>Searching…</Typography>}
      {!loading && results.length === 0 && query && <Typography>No results.</Typography>}

      <List>
        {results.map((story) => (
          <ListItem key={story.objectID}>
            {story.title || "Untitled"}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
