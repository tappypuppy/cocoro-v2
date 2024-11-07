"use client";

import { useState, useEffect } from "react";

function Home() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Hello, World" }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <p>{message}</p>
    </div>
  );
}

export default Home;
