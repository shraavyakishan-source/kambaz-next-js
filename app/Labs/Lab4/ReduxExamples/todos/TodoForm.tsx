"use client";
import React from "react";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import type { RootState, AppDispatch } from "../../store";
export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <ListGroupItem className="d-flex gap-2 align-items-center">
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        className="flex-grow-1"
      />
      <Button
        className="btn btn-success"
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
      >
        Update
      </Button>
      <Button
        className="btn btn-warning"
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
      >
        Add
      </Button>
    </ListGroupItem>
  );
}
