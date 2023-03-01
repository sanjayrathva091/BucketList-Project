import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Todos from "./Todos";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/to-dos" element={<Todos />} />
    </Routes>
  );
};

export default AllRoutes;
