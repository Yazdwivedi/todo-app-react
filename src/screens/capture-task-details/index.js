import { BoxLayout } from "../../layouts/box-layout/box-layout";
import UserForm from "../../components/user-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CaptureTaskDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const nullCheck = (str) => {
    return str && str !== "undefined" && str !== "null" ? str : "";
  };

  const onFormSubmit = (userData) => {
    let itemList = localStorage.getItem("todo-items") || "[]";
    itemList = JSON.parse(itemList);
    itemList.unshift({
      id: uuidv4(),
      data: { title: userData?.title, desc: userData?.desc },
    });
    itemList = JSON.stringify(itemList);
    localStorage.setItem("todo-items", itemList);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <BoxLayout>
      <h2>Please Enter Details of The Task</h2>
      <UserForm
        type={searchParams.get("type")}
        initValues={{
          id: nullCheck(searchParams.get("id")),
          title: nullCheck(searchParams.get("title")),
          desc: nullCheck(searchParams.get("desc")),
        }}
        onFormSubmit={onFormSubmit}
      />
    </BoxLayout>
  );
};

export default CaptureTaskDetails;
