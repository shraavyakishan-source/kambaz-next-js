"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  // ✅ Now strongly typed — no "any"
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables" className="p-3">
      <h2>Array State Variable</h2>
      <button className="btn btn-success mb-3" onClick={addElement}>
        Add Element
      </button>

      <ul className="list-group mb-3">
        {array.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <strong>{item}</strong>
            <button
              className="btn btn-danger btn-sm ms-auto me-1"
              onClick={() => deleteElement(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <h4>Todos from Redux Store</h4>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
