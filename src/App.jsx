import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtodo, deletetodo, removetodo, updatetodo } from "./actions/action";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AddIcon from "@mui/icons-material/Add";
import "./App.css"; 

const App = () => {
  const [input, setInput] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todoreducer.list);

  const handleAdd = () => {
    if (input.trim() !== "") {
      if (editingId) {
        
        dispatch(updatetodo(editingId, input));
        setEditingId(null);
      } else {
        dispatch(addtodo(input));
      }
      setInput("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deletetodo(id));
  };

  const handleEdit = (item) => {
    setInput(item.data);
    setEditingId(item.id);
  };

  const handleCancelEdit = () => {
    setInput("");
    setEditingId(null);
  };

  const handleRemoveAll = () => {
    dispatch(removetodo());
  };

  const sortedList = [...list].sort((a, b) => {
    if (sortOrder === "newest") {
      
      return Number(b.id) - Number(a.id);
    } else {
     
      return Number(a.id) - Number(b.id);
    }
  });

  return (
    <Container maxWidth="sm" className="todo-container">
      <Paper className="todo-paper" elevation={4}>
        <Typography variant="h4" align="center" className="todo-title">
         Todo App
        </Typography>

        <div className="input-section">
          <TextField
            className="todo-input"
            label="Add a task"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="add-btn"
            variant="contained"
            color="primary"
            onClick={handleAdd}
            startIcon={<AddIcon />}
          >
            {editingId ? "Update" : "Add"}
          </Button>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <Button
            size="small"
            variant={sortOrder === "newest" ? "contained" : "outlined"}
            onClick={() => setSortOrder("newest")}
          >
            Newest
          </Button>
          <Button
            size="small"
            variant={sortOrder === "oldest" ? "contained" : "outlined"}
            onClick={() => setSortOrder("oldest")}
          >
            Oldest
          </Button>
        </div>

        <List className="todo-list">
          {sortedList.map((item) => (
            <ListItem
              key={item.id}
              className="todo-item"
              secondaryAction={
                <div style={{ display: "flex", gap: 8 }}>
                  <IconButton edge="end" onClick={() => handleEdit(item)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
              }
            >
              <ListItemText primary={item.data} />
            </ListItem>
          ))}
        </List>

        {list.length > 0 && (
          <Button
            className="clear-btn"
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<ClearAllIcon />}
            onClick={handleRemoveAll}
          >
            Clear All
          </Button>
        )}
          {editingId && (
            <div style={{ marginTop: 8 }}>
              <Button variant="text" onClick={handleCancelEdit}>
                Cancel Edit
              </Button>
            </div>
          )}
      </Paper>
    </Container>
  );
};

export default App;
