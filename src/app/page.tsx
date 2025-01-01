"use client"
import { Explore, Footer, Navbar, NewPost, Settings } from "./components";
import { useState } from "react";

const pages = [
  <NewPost key="newPost" />,
  <Explore key="explore" />,
  <Settings key="settings" />
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div className="px-5">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      {pages[currentPage]}
      <Footer />
    </div>
  );
}