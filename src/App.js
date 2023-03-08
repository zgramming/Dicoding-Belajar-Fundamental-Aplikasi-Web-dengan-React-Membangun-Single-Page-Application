import { Route, Routes } from "react-router-dom";
import React from "react";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />F
      </Routes>
    </>
  );
}

export default App;
