import { useState } from "react";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import { createSearchParams, useNavigate } from "react-router-dom";

const TodoInput = () => {
  const navigate = useNavigate();
  const [userInp, setUserInp] = useState();

  const onInputChange = (e) => {
    setUserInp(e?.target?.value);
  };

  const onTodoSubmit = () => {
    if (!userInp) {
      return;
    }
    let itemList = localStorage.getItem("todo-items") || "[]";
    itemList = JSON.parse(itemList);
    itemList.unshift({ id: uuidv4(), data: { title: userInp, desc: "" } });
    itemList = JSON.stringify(itemList);
    localStorage.setItem("todo-items", itemList);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="input-container">
      <input value={userInp || ""} onChange={onInputChange} />
      <button
        onClick={onTodoSubmit}
      >
        Add
      </button>
      <button
        onClick={() =>
          navigate({
            pathname: "/capture-details",
            search: createSearchParams({
              type: "new",
              title: userInp,
            }).toString(),
          })
        }
      >
        Add Description
      </button>
    </div>
  );
};

export default TodoInput;
