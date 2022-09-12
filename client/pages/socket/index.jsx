import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const index = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    socket.on("error", (data) =>{
        setData(data.error)
    })
  },[socket]);

  const submit = () => {
    socket.emit("submit", { message: "hahaahha" });
  };

  return (
    <div>
      <button onClick={submit}>submit</button>
      <p>{data}</p>
    </div>
  );
};

export default index;
