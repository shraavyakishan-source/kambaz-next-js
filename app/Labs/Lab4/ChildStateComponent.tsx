"use client";
import React from "react";
export default function ChildStateComponent({
  counter,
  setCounter,
}: {
  counter: number;
  setCounter: (counter: number) => void;
}) {
  return (
    <div id="wd-child-state">
      <h4>Counter {counter}</h4>
      <button
        className="btn btn-success"
        onClick={() => setCounter(counter + 1)}
        id="wd-increment-child-state-click"
      >
        Increment
      </button>
      <button
        className="btn btn-danger"
        onClick={() => setCounter(counter - 1)}
        id="wd-decrement-child-state-click"
      >
        Decrement
      </button>
    </div>
  );
}
