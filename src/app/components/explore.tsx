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
          transition-all duration-300 ease-in-out min-w-[45px]`} // Set minimum width
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
  return <div className="flex overflow-x-auto space-x-4 pb-6 px-1">{buttons}</div>;
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
    <div className="space-y-6">
      <div className="flex justify-center">
        {generateButtonPage(numberOfPage, explorePage, setExplorePage)}
      </div>
      <div className="bg-zinc-900 rounded-xl shadow-lg">
        {post.map((p) => (
          <div
            key={p.id}
            className={`p-6 border-none  ${
              expandedId === p.id ? "bg-zinc-800" : "bg-transparent"
            } transition-colors duration-300`}
          >
            <button
              onClick={() => toggleExpand(p.id)}
              className="w-full text-left group border-transparent text-white/70 hover:text-white focus:outline-none transition-colors duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">@{p.name}</span>
                <span className="text-sm">{p.date}</span>
              </div>
              <div
                className={`font-informal mt-4 overflow-hidden transition-[max-height] duration-500 ${
                  expandedId === p.id ? "overflow-y-auto max-h-[500px]" : "max-h-[80px]"
                }`}
              >
                <p className="whitespace-pre-wrap">{p.content}</p>
              </div>
            </button>
            {expandedId === p.id && (
              <div className="mt-4">
                <button
                  className="flex items-center justify-center w-full text-sm text-white/50 hover:text-white py-2 rounded-xl border-transparent outline outline-white/10 outline-1 hover:outline-white hover:rounded-md transition-all duration-300"
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  );
}