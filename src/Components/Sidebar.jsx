import { useState } from "react";
import "./styles/sideBar.css";
import { FaPlus } from "react-icons/fa6";
import Popup from "../Utils/Popup";
import PropTypes from "prop-types";

const Sidebar = (props) => {
  const [active, setActive] = useState(false);
  const popupHandler = () => {
    setActive((pre) => !pre);
  };
  return (
    <section className="sideBar">
      <h2 className="title">Pocket Notes</h2>
      <button className="createBtn" onClick={popupHandler}>
        <span className="icon">
          <FaPlus />
        </span>
        <span className="text">Create Notes Group</span>
      </button>
      <div className="toDoGroup">
        {props.todo.length > 0 &&
          props.todo.map((item, index) => {
            return (
              <div key={index} className="toDo" onClick={() => props.clickHandler(index)}>
                <div
                  className="toDoAvatar"
                  style={{ backgroundColor: item.color }}
                >
                  {item?.gName?.split(" ")[0]?.slice(0, 1) +
                    "" +
                    item?.gName?.split(" ")[1]?.slice(0, 1)}
                </div>
                <div className="gName">{item.gName}</div>
              </div>
            );
          })}
      </div>
      {active  && <Popup todo={props.setTodo} func={popupHandler} />}
    </section>
  );
};

export default Sidebar;
Sidebar.propTypes = {
  todo: PropTypes.array.isRequired,
  setTodo: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
