import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Employee from "./pages/Employee";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employee />} />
    </Routes>
  );
};

export default Router;
