"use client";

import { useState, useEffect } from "react";
import { fetchDatabase } from "../lib/database";
import { IDatabase } from "../lib/database";

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
  const [post, setPost] = useState<IDatabase[]>([]);
  const [numberOfPage, setNumberOfPage] = useState<number>(0);
  const [explorePage, setExplorePage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };


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
      <div className="bg-zinc-900 rounded-xl text-informal">
      {post.map((p) => (
        <button
          key={p.id}
          onClick={() => toggleExpand(p.id)}
          className={`font-informal group w-full bg-transparent outline-none border-transparent px-6 pt-4 text-white/40 hover:text-white/100 transition-all duration-300 ${
            expandedId === p.id ? "bg-zinc-800 pb-2 mt-6" : "bg-transparent"
          }`}
        >
          <span
            className={`flex justify-center items-center bg-transparent ${
              expandedId === p.id ? "rounded-xl" : ""  
            } group-hover:bg-white group-hover:text-zinc-950 outline outline-1 outline-white/10 group-hover:outline-transparent mt-4 transition-all duration-300`}
          >
            {p.id}
          </span>

          <div
            className={`overflow-hidden transition-all duration-500 ${
              expandedId === p.id ? "max-h-[500px] overflow-y-auto" : "max-h-[100px]"
            }`}
          >
            <div className="pt-6">
              <p className="float-left text-sm -mt-3">@{p.name}</p>
              <p className="flex text-sm -mt-3 float-right">{p.date}</p>
            </div>
            <p className="justify-left">
              {p.content.split("\\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>

            
          </div>
        </button>
      ))}
      </div>
    </div>
  );
}
