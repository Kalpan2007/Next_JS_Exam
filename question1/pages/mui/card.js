import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";

export default function CardPage() {
  return (
    <div>
      <h1>/mui/card</h1>
      <Card sx={{ maxWidth: 360, m: 2 }}>
        <CardContent>
          <Typography variant="h6">Material UI Card</Typography>
          <Typography variant="body2">This is a simple card with content and actions.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Action</Button>
        </CardActions>
      </Card>
    </div>
  );
}
