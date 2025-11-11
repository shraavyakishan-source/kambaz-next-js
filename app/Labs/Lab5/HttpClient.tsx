"use client";
import React, { useState } from "react";
import axios from "axios";
import * as client from "./client";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");

  const fetchWelcomeOnClick = async () => {
    console.log("HTTP_SERVER =", HTTP_SERVER);
    const message = await client.fetchWelcomeMessage();
    console.log("Fetched message =", message);
    setWelcomeOnClick(message);
  };

  return (
    <div>
      <h3>HTTP Client</h3> <hr />
      <h4>Requesting on Click</h4>
      <button className="btn btn-primary me-2" onClick={fetchWelcomeOnClick}>
        Fetch Welcome
      </button>{" "}
      <br />
      Response from server: <b>{welcomeOnClick}</b>
    </div>
  );
}
