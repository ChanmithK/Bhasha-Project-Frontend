import React, { useState } from "react";
import axios from "axios";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const EditModal = ({ open, handleClose, project, onUpdate }) => {
  const { user } = React.useContext(AuthContext);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/projects/${project._id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      onUpdate(response.data);
      handleClose();
    } catch (error) {
      console.error("Error updating project", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Edit Project
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
          >
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditModal;
