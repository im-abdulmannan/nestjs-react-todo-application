import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";
import { custom_axios } from "../axios/AxiosSetup";
import ActiveTodoList from "../components/ActiveTodoList";
import Navbar from "../components/Navbar";
import { LoginInfo } from "../utils/LoginInfo";

interface TodoModel {
  title: string;
  date: string;
  id: number;
}

const ActiveTodos = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const title: any = useRef();
  const [todos, setTodos] = useState<TodoModel[]>([]);

  useEffect(() => {
    if (todos.length === 0) {
      getAllNotCompletedTodos();
    }
  }, [todos.length]);

  const getAllNotCompletedTodos = async () => {
    const userId = LoginInfo()?.userId;
    if (userId) {
      const response = await custom_axios.get(
        ApiConstants.TODO.FIND_NOT_COMPLETED(userId)
      );

      setTodos(response.data);
    } else {
      toast.error("Please Login to access this resource!!");
    }
  };

  const handleCreateTodo = async () => {
    if (title.current.value === "") {
      toast.error("Please enter a Todo title");
      return;
    }

    const userId = LoginInfo()?.userId;
    if (userId) {
      await custom_axios.post(ApiConstants.TODO.ADD(userId), {
        title: title.current.value,
      });
      getAllNotCompletedTodos();
      title.current.value = "";
      toast.success("Todo added successfully");
    } else {
      toast.error("Please Login to access this resource!!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mb-2 flex mx-auto w-full items-center justify-center">
        <ul className="flex flex-col p-4">
          <span className="text-black text-2xl ">Enter Todo : </span>

          <input
            type="text"
            ref={title}
            className="mt-2 p-2 rounded-xl border-2 border-indigo-600 focus:border-indigo-700"
          />
          <button
            className="w-36 px-1 py-2 text-white mx-auto mb-12 mt-2 bg-green-400 rounded-xl hover:bg-green-500 text-2xl"
            onClick={handleCreateTodo}
          >
            Save
          </button>

          {todos &&
            todos.map((todo) => {
              return (
                <ActiveTodoList
                  key={todo.id}
                  dateTime={todo.date}
                  deleteTodo={async () => {
                    await custom_axios.delete(
                      ApiConstants.TODO.DELETE(todo.id)
                    );
                    getAllNotCompletedTodos();
                  }}
                  markCompleted={async () => {
                    await custom_axios.patch(
                      ApiConstants.TODO.MARK_COMPLETED(todo.id)
                    );
                    getAllNotCompletedTodos();
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

export default ActiveTodos;
