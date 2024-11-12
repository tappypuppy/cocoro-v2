"use client";

import { useState, useRef } from "react";

function Home() {
  const [message, setMessage] = useState("");
  const textRef = useRef<HTMLInputElement>(null);
  const configRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputMessage = textRef.current?.value;
    const inputConfig = configRef.current?.value;
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputMessage, inputConfig }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>Home</h1>
      <p>{message}</p>
      <form onSubmit={onSubmit}>
        <label htmlFor="message">Message</label>
        <input type="text" id="message" ref={textRef} />
        <br />
        <label htmlFor="config">Config</label>
        <input type="text" ref={configRef} />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Home;
