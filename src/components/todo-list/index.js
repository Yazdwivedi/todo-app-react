import { useEffect, useMemo, useState } from "react";
import "./style.css";
import TodoInput from "../todo-input";
import { createSearchParams, useNavigate } from "react-router-dom";

const TodoList = () => {
  const getItemsFromStorage = () => {
    let itemsFromStorage = localStorage.getItem("todo-items");
    return (itemsFromStorage && JSON.parse(itemsFromStorage)) || [];
  };

  const navigate = useNavigate();
  const [todoItems, setTodoItems] = useState(getItemsFromStorage());
  const [editItemId, setEditItemId] = useState("");

  useEffect(() => {
    const storageListener = window.addEventListener("storage", () => {
      const itemsFromStorage = localStorage.getItem("todo-items");
      const newItems = (itemsFromStorage && JSON.parse(itemsFromStorage)) || [];
      setTodoItems(newItems);
    });
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  const onDelete = (userId) => {
    let itemsFromStorage = getItemsFromStorage();
    let updatedItems =
      itemsFromStorage.length > 0 &&
      itemsFromStorage.filter(({ id, data }) => userId !== id);
    updatedItems = JSON.stringify(updatedItems);
    localStorage.setItem("todo-items", updatedItems);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="all-items-container">
      {todoItems.length > 0
        ? todoItems.map(({ id, data }) => {
            return (
              <div className="item-container" key={id}>
                <div
                  className="list-item"
                  onClick={() =>
                    navigate({
                      pathname: "/capture-details",
                      search: createSearchParams({
                        type: "edit",
                        id: id,
                        title: data?.title,
                        desc: data?.desc,
                      }).toString(),
                    })
                  }
                >
                  <p>{data?.title}</p>
                </div>
                <img
                  onClick={() => onDelete(id)}
                  src={require("../../static/images/delete.png")}
                  style={{ marginRight: "10px" }}
                />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default TodoList;
