import React from "react";
import { ListGroupItem, Button } from "react-bootstrap";

export default function TodoItem({
  todo,
  deleteTodo,
  setTodo,
}: {
  todo: { id: string; title: string };
  deleteTodo: (id: string) => void;
  setTodo: (todo: { id: string; title: string }) => void;
}) {
  return (
    <ListGroupItem key={todo.id} className="d-flex gap-2 align-items-center">
      <span className="flex-grow-1">{todo.title}</span>
      <Button onClick={() => setTodo(todo)} id="wd-set-todo-click">
        Edit
      </Button>
      <Button
        className="btn btn-danger"
        onClick={() => deleteTodo(todo.id)}
        id="wd-delete-todo-click"
      >
        Delete
      </Button>
    </ListGroupItem>
  );
}
