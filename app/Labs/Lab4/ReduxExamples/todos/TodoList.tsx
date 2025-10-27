"use client";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

interface Todo {
  id: string;
  title: string;
}

export default function TodoList() {
  //  Get todos directly from the reducer
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        {/* Form for adding/updating todos */}
        <TodoForm />
        {/* Render each todo item */}
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
