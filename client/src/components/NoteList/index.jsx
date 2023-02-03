import { Card, CardContent, Grid, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link, Outlet, useParams, useLoaderData } from "react-router-dom";

function NoteList() {
  console.log("Re-rendering NoteList");
  const { noteId } = useParams();
  const { folder } = useLoaderData();

  console.log("[NodeList]: ", { folder });

  const [activeNoteId, setActiveNoteId] = useState();

  return (
    <Grid
      container
      sx={{
        height: "100%",
      }}
    >
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          maxWidth: "360px",
          bgcolor: "#F0EBE3",
          height: "100%",
          overflowY: "auto",
          padding: "10px",
          textAlign: "left",
        }}
      >
        <List
          subheader={
            <Box>
              <Typography>Notes</Typography>
            </Box>
          }
        >
          {folder.notes.map(({ id, content }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card
                  sx={{
                    mb: "5px",
                    bgcolor: id === activeNoteId ? "rgb(255,211,140)" : null,
                  }}
                >
                  <CardContent
                    sx={{ padding: "10px", "&:last-child": { pb: "10px" } }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || "Empty"}`,
                      }}
                    ></div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8} sx={{}}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default NoteList;
