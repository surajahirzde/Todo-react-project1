import PropTypes from "prop-types";
import { useRef, useState } from "react";

const Popup = (props) => {
  const contentArea = useRef(null);
  const [gName, setGName] = useState("");
  const [gColor, setGColor] = useState("");

  const closeHandler = (e) => {
    if (contentArea.current && !contentArea.current.contains(e.target)) {
      props.func();
    }
  };

  const createGHandler = () => {
    if (gName.length > 0 && gColor.length > 0) {
      const newGroup = {
        gName: gName,
        todoList: [],
        color: gColor,
      };

      props.todo((prev) => {
        const updatedTodos = [...prev, newGroup];
        // Save updated todos to localStorage
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      });

      // Save gName to localStorage
      localStorage.setItem("lastGroupName", gName);

      props.func();
    } else {
      alert("Enter valid group name and select a color");
    }
  };

  const color = [
    "#b38bfa",
    "#ff79f2",
    "#43e6fc",
    "#f19576",
    "#0047ff",
    "#6691ff",
  ];

  return (
    <div className="popUp" onClick={closeHandler}>
      <div className="content" ref={contentArea}>
        <h3>Create New Notes Group</h3>
        <div className="input-group">
          <label htmlFor="name">Group Name</label>
          <input
            type="text"
            id="name"
            value={gName}
            onChange={(e) => setGName(e.target.value)}
            placeholder="Enter your group name...."
          />
        </div>
        <div className="input-group">
          <label htmlFor="color">Choose Color </label>
          <div className="colorGroup">
            {color.map((color) => (
              <button
                type="button"
                className={color === gColor ? "active" : ""}
                onClick={() => setGColor(color)}
                key={color}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <button className="create" onClick={createGHandler}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Popup;

Popup.propTypes = {
  func: PropTypes.func.isRequired,
  todo: PropTypes.func.isRequired,
};
