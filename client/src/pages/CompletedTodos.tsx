import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";
import { custom_axios } from "../axios/AxiosSetup";
import CompletedTodoList from "../components/CompletedTodoList";
import Navbar from "../components/Navbar";
import { LoginInfo } from "../utils/LoginInfo";

interface TodoModel {
  title: string;
  date: string;
  id: number;
}

const CompletedTodos = () => {
  const [todos, setTodos] = useState<TodoModel[]>([]);

  useEffect(() => {
    if (todos.length === 0) {
      getAllCompletedTodos();
    }
  }, [todos.length]);

  const getAllCompletedTodos = async () => {
    const userId = LoginInfo()?.userId;
    if (userId) {
      const response = await custom_axios.get(
        ApiConstants.TODO.FIND_COMPLETED(userId)
      );

      setTodos(response.data);
    } else {
      toast.error("Please Login to access this resource!!");
    }
  };


  return (
    <div>
      <Navbar />
      <h1 className=" text-center text-5xl p-4">Completed Todos</h1>
      <div className="container mb-2 flex mx-auto w-full items-center justify-center">
        <ul className="flex flex-col p-4">

        {todos &&
            todos.map((todo) => {
              return (
                <CompletedTodoList
                  key={todo.id}
                  dateTime={todo.date}
                  deleteTodo={async () => {
                    await custom_axios.delete(
                      ApiConstants.TODO.DELETE(todo.id)
                    );
                    getAllCompletedTodos();
                  }}
                  id={todo.id}
                  todo={todo.title}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default CompletedTodos;
