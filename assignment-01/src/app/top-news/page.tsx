import { Typography } from "@mui/material";
import NewsCard from "../../../components/NewsCard";

export const revalidate = 600; // ISR (10 min)

async function getTopNews() {
  const res = await fetch(
    "https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=10",
    { next: { revalidate: 600 } } // ensures ISR works properly
  );

  if (!res.ok) throw new Error("Failed to fetch top news");
  return res.json();
}

// helper to calculate time ago
function timeAgo(timestamp: number) {
  const diff = Math.floor((Date.now() - timestamp * 1000) / 1000 / 60);
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

export default async function TopNewsPage() {
  const data = await getTopNews();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Top 10 Stories
      </Typography>

      {data.hits.map((story: any) => (
        <NewsCard
          key={story.objectID}
          id={story.objectID}
          title={story.title}
          url={story.url}
          points={story.points}
          author={story.author}
          timeAgo={timeAgo(story.created_at_i)}
        />
      ))}
    </div>
  );
}
