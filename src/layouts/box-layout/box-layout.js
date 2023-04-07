import "./style.css";

export const BoxLayout = ({ children }) => {
  return (
    <div className="container">
      <div className="todo-box">{children}</div>
    </div>
  );
};
