"use client";

import { useState, useEffect } from "react";
import { fetchDatabase } from "../lib/database";

export interface IDatabase {
  id: number
  name: string
  content: string
  date: string
}

const loadingText = [
  "Taking every word...",
  "Word by word...",
  "Hmmm....",
  "How did we get here?",
  ">.<",
  "rm -rf /",
  "Oh Threads where thee are...",
  "読み込み中...",
  "言葉が失われないことを願っています...",
];

function generateButtonPage(numberOfPage: number, explorePage: number, setExplorePage: (page: number) => void) {
  const buttons = [];

  for (let i = 0; i < numberOfPage; i++) {
    buttons.push(
      <button
        onClick={() => setExplorePage(i)}
        key={i}
        className={`mt-1 mx-1 p-3 border-none rounded-lg relative 
          ${explorePage === i 
            ? "bg-white text-black"
            : "bg-transparent text-white"} 
          hover:outline hover:outline-1 hover:outline-white 
          transition-all duration-300 ease-in-out min-w-[40px]`} // Set minimum width
      >
        <span
          className={`absolute inset-0 bg-transparent outline outline-1 outline-white/20 rounded-lg transition-all duration-300 ease-in-out 
            ${explorePage === i ? "transform scale-x-100" : "transform scale-x-0"}`}
        />
        {i + 1}
      </button>
    );
  }
  buttons.push(
    <button
      className={`mt-1 mx-1 p-3 border-none rounded-lg relative 
        bg-transparent text-white outline outline-white/20 outline-1 hover:outline-white 
        transition-all duration-300 ease-in-out min-w-[40px]`} // Set minimum width
      >
      👌
    </button>
  )
  return <div className="flex overflow-x-auto space-x-4 pb-6">{buttons}</div>;
}

export function Explore() {
  const [post, setPost] = useState<any>(null);
  const [numberOfPage, setNumberOfPage] = useState<number>(0);
  const [explorePage, setExplorePage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      

      try {
        const data = await fetchDatabase("posts");
        
        const reversedData = data.reverse();

        const numberOfPageByLength = Math.ceil(reversedData.length / 10);

        setPost(reversedData.slice(explorePage * 10, (explorePage + 1) * 10));
        setNumberOfPage(numberOfPageByLength);
      } catch (err) {
        console.error("Error fetching data:", (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [explorePage]);

  if (!post || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold text-white animate-pulse transition-all duration-500">
          {loadingText[Math.floor(Math.random() * loadingText.length)]}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div>
        {generateButtonPage(numberOfPage, explorePage, setExplorePage)}
      </div>
      <div className="bg-zinc-900 rounded-xl">
        {post.map((p: IDatabase) => (
          <div className="group px-6 font-informal text-white/40 hover:text-white/100 p-2 mb-2" key={p.id}>
            <h1 className="text-lg">
              {p.content.split("\\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>
            <div className="block pb-4">
              <p className="absolute text-sm -mt-3">@{p.name}</p>
              <p className="flex text-sm -mt-3 float-right">{p.date}</p>
            </div>
            <hr className="border-white/40 group-hover:border-white"/>
          </div>
        ))}
      </div>
    </div>
  );
}
