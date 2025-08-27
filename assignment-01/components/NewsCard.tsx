"use client";

import { Card, CardContent, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

type NewsCardProps = {
  id: string;
  title: string;
  url?: string;
  points?: number;
  author?: string;
  timeAgo?: string;
};

export default function NewsCard({ id, title, url, points, author, timeAgo }: NewsCardProps) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        {/* External link */}
        <MuiLink
          href={url || "http://codinggita.com/"}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          variant="h6"
        >
          {title || "Untitled"}
        </MuiLink>

        {/* Metadata */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {points ?? 0} points • {author ?? "unknown"} • {timeAgo ?? ""}
        </Typography>

        {/* Internal link to story details */}
        <MuiLink component={Link} href={`/story/${id}`} underline="hover" variant="body2">
          View details →
        </MuiLink>
      </CardContent>
    </Card>
  );
}
