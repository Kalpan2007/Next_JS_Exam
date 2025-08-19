import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function AppBarPage() {
  return (
    <div>
      <h1>/mui/navigation/appbar</h1>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Material UI AppBar</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
