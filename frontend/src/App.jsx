import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/blog/:id" element={<Blog/>}></Route>
        <Route path="/edit/:id" element={<Editpage/>}></Route>
        <Route path="/create" element={<CreatePage/>} ></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
