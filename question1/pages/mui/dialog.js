import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";

export default function DialogPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <h1>/mui/dialog</h1>
      <Button sx={{ m: 2 }} variant="contained" onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Material UI Dialog</DialogTitle>
        <DialogContent>
          <Typography>This is a dialog example.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
