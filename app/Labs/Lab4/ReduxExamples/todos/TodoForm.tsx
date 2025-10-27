import React from "react";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
export default function TodoForm({
  todo,
  setTodo,
  addTodo,
  updateTodo,
}: {
  todo: { id: string; title: string };
  setTodo: (todo: { id: string; title: string }) => void;
  addTodo: (todo: { id: string; title: string }) => void;
  updateTodo: (todo: { id: string; title: string }) => void;
}) {
  return (
    <ListGroupItem className="d-flex gap-2">
      <FormControl
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        className="flex-grow-1"
      />
      <Button
        className="btn btn-warning"
        onClick={() => addTodo(todo)}
        id="wd-add-todo-click"
      >
        Update
      </Button>
      <Button
        className="btn btn-success"
        onClick={() => updateTodo(todo)}
        id="wd-update-todo-click"
      >
        Add
      </Button>
    </ListGroupItem>
  );
}
