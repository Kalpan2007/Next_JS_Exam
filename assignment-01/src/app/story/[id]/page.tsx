import { Typography, List, ListItem, Link as MuiLink } from "@mui/material";

export const dynamic = "force-dynamic"; // SSR

async function getStory(id: string) {
  const res = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
  if (!res.ok) return null;
  return res.json();
}

function timeAgo(timestamp: number) {
  const diff = Math.floor((Date.now() - timestamp * 1000) / 1000 / 60);
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

export default async function StoryPage({ params }: { params: { id: string } }) {
  const story = await getStory(params.id);

  if (!story) {
    return <Typography>❌ Story not found.</Typography>;
  }

  return (
    <div>
      <MuiLink
        href={story.url || "http://codinggita.com/"}
        target="_blank"
        variant="h5"
        underline="hover"
      >
        {story.title}
      </MuiLink>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {story.points} points • {story.author} • {timeAgo(story.created_at_i)}
      </Typography>

      <Typography variant="h6">Top Comments:</Typography>
      <List>
        {story.children.slice(0, 3).map((c: any) => (
          <ListItem key={c.id}>{c.text?.replace(/<[^>]+>/g, "") || "No text"}</ListItem>
        ))}
      </List>
    </div>
  );
}
