"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

function Home() {
  const nameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userName = nameRef.current?.value;
    router.push(`/dev/${userName}`);
  };

  return (
    <div>
      <h1>名前を入力してください</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="message">Name</label>
        <input type="text" id="message" ref={nameRef} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Home;
