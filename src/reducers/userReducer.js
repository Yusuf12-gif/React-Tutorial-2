export const initialState = {
  users: [],
  loading: false,
  error: null,
};

export function userReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "TOGGLE_STATUS":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload
            ? { ...user, active: !user.active }
            : user
        ),
      };
    default:
      return state;
  }
}
