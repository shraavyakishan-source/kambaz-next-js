"use client";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useState, useEffect } from "react";
import { add } from "./addReducer";
import { Button, FormControl } from "react-bootstrap";
import React from "react";
import { Provider } from "react-redux";
import store from "../../store";

export default function AddRedux() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const [isClient, setIsClient] = useState(false);

  const { sum } = useSelector(
    (state: { addReducer: { sum: number } }) => state.addReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }
  return (
    <Provider store={store}>
      <div className="w-25" id="wd-add-redux">
        <h2>Passing Data to Reducers</h2>
        <h2>Add Redux</h2>
        <h2>
          {a} + {b} = {sum}
        </h2>
        <FormControl
          type="number"
          defaultValue={a}
          onChange={(e) => setA(parseInt(e.target.value) || 0)}
        />
        <FormControl
          type="number"
          defaultValue={b}
          onChange={(e) => setB(parseInt(e.target.value) || 0)}
        />
        <Button id="wd-add-redux-click" onClick={() => dispatch(add({ a, b }))}>
          Add Redux
        </Button>
        <hr />
      </div>
    </Provider>
  );
}
