import Image from "next/image";
import { useState } from "react";

const headerText = [
  "Nothread is Not a Threads!",
  "Not a Threads, what u expect?",
  "Stop clicking!",
  "Stop it!",
  <a href="https://github.com/abcdavk/nothread" target="_blank" key="Header Text Link">Ok you won, here is the source code</a>
]

export function Navbar({ currentPage, setCurrentPage }: { currentPage: number; setCurrentPage: (page: number) => void }) {
  const [headerTextCount,setHeaderTextCount] = useState(0);
  function setStyleByPage(pageId: number) {
    let style = "border-none bg-zinc-950 text-white rounded-lg hover:bg-white/70 hover:text-zinc-950 transition duration-300";
    if (currentPage !== pageId) {
      return style;
    } else {
      style = "border-none rounded-lg bg-white text-zinc-950 transition duration-300";
      return style;
    }
  }

  return (
    <nav className="pb-10">
      <div className="flex flex-row justify-center group">
        <Image 
          src="/icon_small.png"
          alt="Logo"
          className="relative"
          width={80}
          height={80}
        />
        {/* <span className="rounded-md bg-white group-hover:text-zinc-950 p-2 absolute ml-1 mt-5 opacity-0 group-hover:opacity-100 transition duration-300"> */}
          <button onClick={() => setHeaderTextCount(headerTextCount + 1)} className="border-transparent bg-white rounded-lg group-hover:text-zinc-950 p-2 absolute ml-1 mt-5 opacity-0 group-hover:opacity-100 transition duration-300">
            {headerText[headerTextCount]}
          </button>
        {/* </span> */}
      </div>
      <div className="grid gap-4 grid-flow-row-dense grid-cols-2">
        <button
          className={`py-3 px-4 rounded-lg transition-all duration-300 ${setStyleByPage(0)}`}
          onClick={() => setCurrentPage(0)}
        >
          Create New Post
        </button>
        <button
          className={`py-3 px-4 rounded-lg transition-all duration-300 ${setStyleByPage(1)}`}
          onClick={() => setCurrentPage(1)}
        >
          Explore
        </button>
        <button
          className={`py-3 px-4 rounded-lg transition-all duration-300 col-span-2 ${setStyleByPage(2)}`}
          onClick={() => setCurrentPage(2)}
        >
          Settings
        </button>
      </div>
    </nav>
  );
}
