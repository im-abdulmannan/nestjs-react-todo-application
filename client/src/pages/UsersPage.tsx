import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";
import { custom_axios } from "../axios/AxiosSetup";
import Navbar from "../components/Navbar";
import { LoginInfo } from "../utils/LoginInfo";

interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  role: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  console.log("🚀 ~ UsersPage ~ users:", users);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const role = LoginInfo()?.role;
    if (role !== null && role === "ADMIN") {
      const response = await custom_axios.get(ApiConstants.USER.FIND_ALL);
      setUsers(response.data);
    } else {
      toast.error("Forbidden Error");
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl text-[black] text-center p-4">Users</h1>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Active
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {users &&
                      users.map((user) => {
                        return (
                          <tr
                            key={user.id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {user.firstName}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                              {user.lastName}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {user.email}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-start whitespace-nowrap">
                              <button
                                hidden={user.role == "ADMIN" ? true : false}
                                onClick={async () => {
                                  const response = await custom_axios.delete(
                                    ApiConstants.USER.DELETE(user.id)
                                  );
                                  if (response.status === 200) {
                                    toast.success("User deleted successfully");
                                    getAllUsers();
                                  } else {
                                    toast.error("Failed to delete user");
                                  }
                                }}
                                className="bg-red-400 hover:bg-red-500 rounded-lg px-4 py-1 text-white shadow-sm text-xl"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
