import React from "react";
import { Routes, Route } from "react-router-dom";

import SavedBooks from "./pages/SavedBooks";
import SearchBooks from "./pages/SearchBooks";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={SearchBooks} />
      <Route exact path="/saved" element={SavedBooks} />
      <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
    </Routes>
  );
};
