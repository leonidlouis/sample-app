"use client";
import { fetchClientHandler } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  async function getData() {
    console.log("run");
    const res = await fetchClientHandler("/todo");
    console.log(res, "res");
    setData(res.data.todos);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>To Do List</h1>
      <section id="list-of-todos">
        {data.map((val, key) => (
          <div key={key}>{val.name}</div>
        ))}
      </section>
    </main>
  );
}
