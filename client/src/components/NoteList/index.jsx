import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLoaderData,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import { Box } from "@mui/system";
import {
  Card,
  CardContent,
  Grid,
  List,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { NoteAddOutlined } from "@mui/icons-material";

function NoteList() {
  console.log("Re-rendering NoteList");
  const { noteId, folderId } = useParams();
  const { folder } = useLoaderData();
  const [activeNoteId, setActiveNoteId] = useState();
  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }
 
    if (folder?.notes?.[0]) {
      navigate(`note/${folder.notes[0].id}`);
    }
  }, [noteId, folder.notes]);

  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId,
      },
      { method: "post", action: `/folder/${folderId}` }
    );
  };

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
            <Box
              sx={{
                display: "flex",
                alignItem: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Notes</Typography>
              <Tooltip title="Add Note" onClick={handleAddNewNote}>
                <IconButton size="small">
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
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
