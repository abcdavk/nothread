"use client"
import { Explore, Footer, Navbar, NewPost } from "./components";
import { useState } from "react";

const pages = [
  <NewPost key="newPost" />,
  <Explore key="explore" /> 
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="px-5">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      {pages[currentPage]}
      <Footer />
    </div>
  );
}
