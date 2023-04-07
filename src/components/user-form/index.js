import { useForm } from "react-hook-form";
import "./style.css";
import { useNavigate } from "react-router-dom";

const UserForm = ({ type, initValues, onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (userData) => {
    if (type === "new") {
      onFormSubmit(userData);
    }
    let itemsFromStorage = localStorage.getItem("todo-items");
    itemsFromStorage = (itemsFromStorage && JSON.parse(itemsFromStorage)) || [];
    let updatedItems =
      itemsFromStorage.length > 0 &&
      itemsFromStorage.map(({ id, data }) => {
        if (id === initValues?.id) {
          return { id, data: { title: userData?.title, desc: userData?.desc } };
        }
        return { id, data };
      });
    updatedItems = JSON.stringify(updatedItems);
    localStorage.setItem("todo-items", updatedItems);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container"
      >
        <div className="input-group">
          <div className="title-input">
            <label>Title of Task</label>
            <input
              defaultValue={initValues?.title}
              {...register("title", { required: true })}
              style={errors.title ? { border: "2px solid crimson" } : {}}
            />
            {errors.title && <span>*Title is required</span>}
          </div>
          <div className="desc-input">
            <label>Description of Task</label>
            <input
              defaultValue={initValues?.desc}
              {...register("desc")}
              style={errors.desc ? { border: "2px solid crimson" } : {}}
            />
          </div>
        </div>
        <input type="submit" className="submitBtn" />
      </form>
  );
};

export default UserForm;
