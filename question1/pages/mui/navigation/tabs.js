import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

export default function TabsPage() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <h1>/mui/navigation/tabs</h1>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={(e, v) => setValue(v)}>
          <Tab label="Tab One" />
          <Tab label="Tab Two" />
          <Tab label="Tab Three" />
        </Tabs>
      </Box>
      <Box sx={{ p: 2 }}>
        {value === 0 && <Typography>First tab content</Typography>}
        {value === 1 && <Typography>Second tab content</Typography>}
      </Box>
    </div>
  );
}
