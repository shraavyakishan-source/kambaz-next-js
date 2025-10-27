"use client";

import React from "react";

export default function PassingFunctions({
  theFunction,
}: {
  theFunction: () => void;
}) {
  return (
    <div>
      <h2> Passing Functions as Attributes</h2>
      <button onClick={theFunction} className="btn btn-primary">
        Invoke the Function
      </button>
      <hr />
    </div>
  );
}
