"use client";
import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import type { AppDispatch } from "../../store";

interface Todo {
  id: string;
  title: string;
}

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ListGroupItem key={todo.id} className="d-flex gap-2 align-items-center">
      <span className="flex-grow-1">{todo.title}</span>
      <Button
        className="btn btn-primary"
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
      >
        Edit
      </Button>
      <Button
        className="btn btn-danger"
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
      >
        Delete
      </Button>
    </ListGroupItem>
  );
}
