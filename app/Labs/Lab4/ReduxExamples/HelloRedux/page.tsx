"use client";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

export default function HelloRedux() {
  const [isClient, setIsClient] = useState(false);

  const { message } = useSelector(
    (state: { helloReducer: { message: string } }) => state.helloReducer
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4> <hr />
    </div>
  );
}
