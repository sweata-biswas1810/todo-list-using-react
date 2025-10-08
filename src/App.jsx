import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtodo, deletetodo, removetodo } from "./actions/action";
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
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AddIcon from "@mui/icons-material/Add";
import "./App.css"; 

const App = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todoreducer.list);

  const handleAdd = () => {
    if (input.trim() !== "") {
      dispatch(addtodo(input));
      setInput("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deletetodo(id));
  };

  const handleRemoveAll = () => {
    dispatch(removetodo());
  };

  return (
    <Container maxWidth="sm" className="todo-container">
      <Paper className="todo-paper" elevation={4}>
        <Typography variant="h4" align="center" className="todo-title">
          Redux Todo App
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
            Add
          </Button>
        </div>

        <List className="todo-list">
          {list.map((item) => (
            <ListItem
              key={item.id}
              className="todo-item"
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(item.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
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
      </Paper>
    </Container>
  );
};

export default App;
