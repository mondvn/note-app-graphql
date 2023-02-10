import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { CreateNewFolderOutlined } from "@mui/icons-material";

import { addNewFolder } from "../../utils/folderUtils";

function NewFolder() {
  const [newFolderName, setNewFolderName] = useState();
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const popupName = searchParams.get("popup");

  useEffect(() => {
    if (popupName === "add-folder") {
      setOpen(true);
      return;
    }

    setOpen(false);
  }, [popupName]);

  const handleOpenPopup = () => {
    setSearchParams({ popup: "add-folder" });
  };

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleClose = () => {
    navigate(-1)
    setNewFolderName("");
  };

  const handleAddNewFolder = async () => {
    const { addFolder } = await addNewFolder({ name: newFolderName });
    console.log("[New Folder Component]", addFolder);

    handleClose();
  };

  return (
    <div>
      <Tooltip title="Add Folder" onClick={handleOpenPopup}>
        <IconButton>
          <CreateNewFolderOutlined sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewFolder;
