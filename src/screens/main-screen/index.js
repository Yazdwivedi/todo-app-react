import './style.css';
import TodoInput from '../../components/todo-input';
import TodoList from '../../components/todo-list';
import { BoxLayout } from '../../layouts/box-layout/box-layout';

const MainScreen = () => {
  return (
   <BoxLayout>
        <h1>Plans for Today</h1>
        <TodoInput />
        <TodoList/>
    </BoxLayout>
  );
}

export default MainScreen;
