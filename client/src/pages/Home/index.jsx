import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import UserMenu from "../../components/UserMenu";
import FolderList from "../../components/FolderList";
import { Outlet } from "react-router-dom";
function Home() {
  console.log("Re-rendering Home Page")
  return (
    <>
      <Typography variant="h4" sx={{ mb: "50px" }}>
        Note App
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "right", mb: "10px" }}>
        <UserMenu />
      </Box>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "50vh",
          boxShadow: "0 0 15px 0 rgb(193 193 193/60%) ",
        }}
      >
        <Grid
          item
          xs={3}
          sx={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
          <FolderList
            folders={[
              { id: 1, name: "Plan for Tet holiday " },
              { id: 2, name: "Plants & Zombies " },
            ]}
          />
        </Grid>
        <Grid
          item
          xs={9}
          sx={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
export default Home;
