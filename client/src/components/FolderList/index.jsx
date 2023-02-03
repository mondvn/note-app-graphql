import { Card, CardContent, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function FolderList({ folders }) {
  console.log("Re-rendering FolderList...");
  const { folderId } = useParams();

  const [activeFolderId, setActiveFolderId] = useState(folderId);
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "#7D9D9C",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
      }}
      subheader={
        <Box>
          <Typography sx={{ fontWeight: "bold", color: "White", mb: "8px" }}>
            Folders
          </Typography>
        </Box>
      }
    >
      {folders.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`/folder/${id}`}
            style={{
              textDecoration: "none",
            }}
            onClick={() => setActiveFolderId(id)}
          >
            <Card
              sx={{
                mb: "8px",
                bgcolor: id === activeFolderId ? "rgb(255,211,140)" : null,
              }}
            >
              <CardContent
                sx={{ padding: "10px", "&:last-child": { pb: "10px" } }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}

export default FolderList;
