import { Drawer, Box, Typography } from "@mui/material";
import { useState } from "react";

export default function DrawerPage() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <h1>/mui/drawer</h1>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <Typography variant="h6">Material UI Drawer</Typography>
        </Box>
      </Drawer>
    </div>
  );
}