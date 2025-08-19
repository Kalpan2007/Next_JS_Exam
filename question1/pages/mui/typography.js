import { Typography, Stack } from "@mui/material";

export default function TypographyPage() {
  return (
    <div>
      <h1>/mui/typography</h1>
      <Stack spacing={1} sx={{ p: 2 }}>
        <Typography variant="h3">Material UI Typography</Typography>
        <Typography variant="h5">Heading 5</Typography>
      </Stack>
    </div>
  );
}
