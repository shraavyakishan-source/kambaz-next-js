"use client";
import React, { useEffect, useState } from "react";
import * as client from "./client";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaTrash, FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { FaPlusCircle } from "react-icons/fa";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // ✅ error state

  // ✅ Fetch assignment
  const fetchAssignment = async () => {
    const assignment = await client.fetchAssignment();
    setAssignment(assignment);
  };

  // ✅ Update assignment title
  const updateTitle = async (title: string) => {
    const updatedAssignment = await client.updateTitle(title);
    setAssignment(updatedAssignment);
  };

  // ✅ Fetch all todos
  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
  };

  // ✅ Create new todo (POST)
  const createNewTodo = async () => {
    try {
      const newTodo = await client.postNewTodo({
        title: `New Todo ${todos.length + 1}`,
        completed: false,
      });
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage("Unable to create new todo.");
    }
  };

  // ✅ Alternate create (POST)
  const postNewTodo = async () => {
    try {
      const newTodo = await client.postNewTodo({
        title: "New Posted Todo",
        completed: false,
      });
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage("Unable to post new todo.");
    }
  };

  // ✅ Delete todo with error handling
  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo.id);
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
      setErrorMessage(null);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Error deleting todo.");
    }
  };

  const removeTodo = async (id: number) => {
    try {
      await client.removeTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setErrorMessage(null);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Error removing todo.");
    }
  };

  // ✅ Enter editing mode
  const editTodo = (todo: any) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, editing: true } : t
    );
    setTodos(updatedTodos);
  };

  // ✅ Update todo with try/catch for 404 errors
  const updateTodo = async (updated: any) => {
    try {
      const saved = await client.updateTodo(updated.id, {
        title: updated.title,
        completed: updated.completed,
      });
      const updatedTodos = todos.map((t) =>
        t.id === updated.id
          ? { ...saved, editing: updated.editing ?? false }
          : t
      );
      setTodos(updatedTodos);
      setErrorMessage(null);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Error updating todo.");
    }
  };

  useEffect(() => {
    fetchAssignment();
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>

      {/* --- Error Alert --- */}
      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}

      {/* --- Assignment Section --- */}
      <h4>Assignment</h4>
      <FormControl
        value={assignment.title || ""}
        className="mb-2"
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <FormControl
        as="textarea"
        rows={3}
        value={assignment.description || ""}
        className="mb-2"
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <FormControl
        type="date"
        className="mb-2"
        value={assignment.due || ""}
        onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
      />
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          checked={assignment.completed || false}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>
      <button
        className="btn btn-primary me-2"
        onClick={() => updateTitle(assignment.title)}
      >
        Update Title
      </button>
      <pre>{JSON.stringify(assignment, null, 2)}</pre>

      <hr />

      {/* --- Todos Section --- */}
      <h4>
        Todos
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
          style={{ cursor: "pointer" }}
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
          style={{ cursor: "pointer" }}
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id} className="d-flex align-items-center">
            {/* ✅ Checkbox: update completed */}
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />

            {/* ✅ Editable title */}
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  flex: 1,
                }}
              >
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 me-2"
                value={todo.title}
                onChange={(e) =>
                  setTodos((prev) =>
                    prev.map((t) =>
                      t.id === todo.id ? { ...t, title: e.target.value } : t
                    )
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
              />
            )}

            {/* ✅ Pencil: enter edit mode */}
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary fs-5 me-3"
              style={{ cursor: "pointer" }}
            />

            {/* ✅ Delete icons */}
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
              style={{ cursor: "pointer" }}
            />
            <FaTrash
              onClick={() => removeTodo(todo.id)}
              className="text-danger ms-2"
              style={{ cursor: "pointer" }}
              title="Delete todo"
            />
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
