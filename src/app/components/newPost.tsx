import { IoSend } from "react-icons/io5";
import { getDatabase, ref, set } from "firebase/database";
import { useState } from "react";
import { fetchDatabase } from "../lib/database";

const motivations = [
  <h1 className="text-2xl font-semibold mb-4 text-gray-100">
    EVERY <span className="font-formal">word</span> is an{" "}
    <span className="font-informal text-xl">Art</span>
  </h1>,
  <h1 className="text-xl italic text-indigo-300">
    <span className="font-bold text-white">"Write"</span> your dreams,{" "}
    <span className="underline decoration-dotted">they matter!</span>
  </h1>,
  <p className="text-lg text-green-400">
    <span className="uppercase tracking-widest">ideas</span> are{" "}
    <span className="font-semibold text-yellow-300">timeless!</span>
  </p>,
  <h2 className="text-3xl font-light text-pink-500">
    <span className="uppercase font-bold text-pink-200">Inspire</span> the world
    with your <span className="italic">voice.</span>
  </h2>,
  <p className="text-sm text-blue-400">
    Words have the <span className="font-mono text-blue-300">power</span> to{" "}
    <span className="underline text-blue-500">heal</span>.
  </p>,
  <h3 className="text-lg text-yellow-300">
    <span className="font-serif">Share</span> your{" "}
    <span className="uppercase tracking-wide">story</span>, it’s unique.
  </h3>,
  <h4 className="text-xl text-red-400 font-extrabold">
    <span className="italic">Your words</span> are{" "}
    <span className="underline decoration-wavy">unstoppable!</span>
  </h4>,
  <p className="text-base text-teal-500">
    Don’t <span className="line-through">fear</span>{" "}
    <span className="font-bold">expression</span>.
  </p>,
  <h2 className="text-2xl text-orange-400">
    <span className="uppercase font-black tracking-tight">Dream</span> big,
    <span className="text-white">write</span> bigger.
  </h2>,
  <p className="text-lg text-gray-500">
    A <span className="font-medium text-gray-200">simple</span>{" "}
    <span className="italic">sentence</span> can{" "}
    <span className="font-extrabold text-gray-100">change lives</span>.
  </p>
];


function writeNewPost(name: string, content: string, id: number) {
  const db = getDatabase();

  // Normalize the name
  const normalizedName = name.trim() === "" 
    ? "anonymous" 
    : name
        .trim() // Remove leading/trailing whitespace
        .replace(/\s+/g, "_") // Replace all spaces, tabs, and newlines with "_"
        .replace(/[^a-zA-Z0-9_]/g, "_") // Replace non-alphanumeric characters with "_"
        .slice(0, 32); // Limit to 32 characters

  // Replace newline characters with \n (escaped version)
  const normalizedContent = content.replace(/\n/g, "\\n");
  // Save the post to the database
  set(ref(db, 'posts/' + id), {
    id: id,
    name: normalizedName,
    content: normalizedContent,
    date: new Date().toLocaleDateString(),
  });
}


export function NewPost() {
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");

  const handleSubmit = async () => {
    if (postContent.trim() === "") {
      return;
    }
    const id = await fetchDatabase('/posts');
    const idx = id && Array.isArray(id) ? id.length : 0;
  
    writeNewPost(postName, postContent, idx);
    setPostName("");
    setPostContent("");
  };
  

  return (
    <section className="bg-zinc-950 flex flex-col">
      {motivations[Math.floor(Math.random() * motivations.length)]}

      <input
        className="mb-2 font-informal p-4 flex-grow rounded-xl bg-zinc-950 text-gray-100 placeholder-gray-500 border-transparent outline outline-gray-500 outline-1 resize-none transition duration-300"
        placeholder="Add a nickname here if you want"
        value={postName}
        onChange={(e) => setPostName(e.target.value)}
      >
      </input>

      <textarea
        className="font-informal h-screen p-4 flex-grow rounded-xl bg-zinc-950 text-gray-100 placeholder-gray-500 border-gray-500 outline-none focus:outline-none resize-none transition duration-300"
        placeholder="Type something and something will happen, try it!"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      ></textarea>

      <button
        className="flex items-center justify-center mt-4 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-300 hover:text-zinc-950 transition duration-300 fixed bottom-4 left-0 right-0 mx-auto max-w-md w-11/12"
        onClick={handleSubmit}
      >
        Post
        <IoSend className="pl-2 text-2xl" />
      </button>
    </section>
  );
}
