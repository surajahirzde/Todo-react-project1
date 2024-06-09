import { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import MainContent from "./Components/MainContent";

const App = () => {
  const [todo, setTodo] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelector = (index) => {
    setSelectedIndex(index);
  };

  return (
    <main className="Todo">
      <Sidebar clickHandler={handleSelector} todo={todo} setTodo={setTodo} />
      <MainContent
        todo={todo}
        selectedIndex={selectedIndex}
        changeIndex={setSelectedIndex}
        setTodo={setTodo}
      />
    </main>
  );
};

export default App;
