import { useState } from "react";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === "home" ? (
        <HomePage navigateTo={navigateTo} />
      ) : (
        <MoviesPage navigateTo={navigateTo} />
      )}
    </>
  );
}

export default App;
