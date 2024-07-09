export const ApiConstants = {
  TODO: {
    ADD: (userId: number) => {
      return "/todo/" + userId;
    },
    FIND_NOT_COMPLETED: (userId: number) => {
      return "/todo/find-all-not-completed-todo/" + userId;
    },
    FIND_COMPLETED: (userId: number) => {
      return "/todo/find-all-completed-todo/" + userId;
    },
    MARK_COMPLETED: (todoId: number) => {
      return "/todo/" + todoId;
    },
    DELETE: (todoId: number) => {
      return "/todo/" + todoId;
    },
  },
  USER: {
    SIGN_UP: "/user/signup",
    FIND_ALL: "/user",
    DELETE: (userId: number) => {
      return "/user/" + userId;
    },
  },
  LOGIN: "/auth/login",
};
