"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import './styles.css'

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState("");
  const [streaming, setStreaming] = useState("");
  const [streamResponse, setStreamResponse] = useState("");




  const handleChat = async () => {
    setLoading(true)
    setResponse("")


    try {
      const res = await fetch("/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })

      })
      const data = await res.json();
      const parsed = JSON.parse(data.response);
      setResponse(parsed.response);


    } catch (error) {
      setResponse("Error: " + error.message)
    }
    setLoading(false)
  }


  return (

    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>Hii!! I'm a ChatBot</h1>

      {/* Flex wrapper to keep textarea and button side by side */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px", alignItems: "center" }}>
        <textarea
          placeholder="ask anything beta!!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={10}
          cols={50}
        />

        <button
          onClick={handleChat}
          style={{ padding: "20px 10px", backgroundColor: "orange" }}
        >
          {loading ? "Loading..." : "Chat Kijiye"}
        </button>
      </div>
      <div
        style={{ border: "1px solid gray", padding: "10px", whiteSpace: "pre-wrap", fontSize: "24px", margin: "24px" }}
      >
        {response}
      </div>
    </div>

  );
}
