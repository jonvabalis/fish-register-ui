import { useState, useEffect } from "react";

interface WebSocketMessage {
  message: string;
}

export const useWebSocketMessage = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const wsUrl = `${import.meta.env.VITE_BASE_URL?.replace(/^http/, "ws")}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        setMessage(data.message);
      } catch {}
    };

    ws.onerror = () => {
      setMessage("");
    };

    return () => {
      ws.close();
    };
  }, []);

  return message;
};
