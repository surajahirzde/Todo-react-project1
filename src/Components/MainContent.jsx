import "./styles/mainContent.css";
import PropTypes from "prop-types";
import bgImg from "../assets/bg.svg";
import { IoMdLock } from "react-icons/io";
import saveBtn from "../assets/saveBtn.svg";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const MainContent = ({ todo, selectedIndex, changeIndex, setTodo }) => {
  const [text, setText] = useState("");

  function formatDate() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${formattedHours}:${formattedMinutes} ${ampm}, ${day} ${month} ${year}`;
  }

  const saveData = () => {
    if (selectedIndex === null) return;

    const newTodo = {
      text: text.trim(),
      createdAt: formatDate(),
    };

    const updatedTodos = todo.map((item, index) => {
      if (index === selectedIndex) {
        return {
          ...item,
          todoList: [...item.todoList, newTodo],
        };
      }
      return item;
    });

    setTodo(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setText("");
  };

  const inputHandler = (e) => {
    setText(e.target.value);
  };

  if (selectedIndex === null) {
    return (
      <section
        className={`mainContent ${selectedIndex === null ? "empty" : "active"}`}
      >
        <div className="emptyContainer">
          <div className="breakWrapper">
            <img src={bgImg} alt="notes" className="img" />
            <div className="wrapper">
              <h2>Pocket Notes</h2>
              <p>
                Send and receive messages without keeping your phone online. Use
                Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
            </div>
            <div className="footer">
              <IoMdLock /> <span>end-to-end encrypted</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const selectedTodo = todo[selectedIndex];

  return (
    <section
      className={`mainContent ${selectedIndex === null ? "empty" : "active"}`}
    >
      <div className="todoWrapper">
        <div className="todoHeader">
          <div className="icons" onClick={() => changeIndex(null)}>
            <FaArrowLeft />
          </div>
          <div
            className="toDoAvatar"
            style={{ backgroundColor: selectedTodo.color }}
          >
            {selectedTodo?.gName?.split(" ")[0]?.slice(0, 1) +
              selectedTodo?.gName?.split(" ")[1]?.slice(0, 1)}
          </div>
          <div className="gName">{selectedTodo.gName}</div>
        </div>
        <div className="todoContent">
          {selectedTodo.todoList.map((item, index) => (
            <div key={index} className="toDo">
              <div className="time">
                {item.createdAt.split(",")[0]}
                <br />
                {item.createdAt.split(",")[1]}
              </div>
              <div className="content">
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="todoAddBox">
          <textarea
            className="addBox"
            value={text}
            onChange={inputHandler}
            onKeyUp={(e) => e.key === "Enter" && saveData()}
            placeholder="Enter your text here..........."
          ></textarea>
          <button onClick={saveData} disabled={text.length === 0}>
            <img src={saveBtn} alt="save" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;

MainContent.propTypes = {
  todo: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  setTodo: PropTypes.func.isRequired,
  changeIndex: PropTypes.func.isRequired,
};
