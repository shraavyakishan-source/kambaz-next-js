"use client";
import { useState } from "react";
import ChildStateComponent from "./ChildStateComponent";
import React from "react";
export default function ParentStateComponent() {
  const [counter, setCounter] = useState(123);
  return (
    <div>
      <h2>Sharing State Between Components</h2>
      <h2>Counter {counter}</h2>
      <ChildStateComponent counter={counter} setCounter={setCounter} />
      <hr />
    </div>
  );
}
