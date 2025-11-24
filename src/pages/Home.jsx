import { useState, useEffect, useReducer, useCallback, useMemo } from "react";
import { userReducer, initialState } from "../reducers/userReducer";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";
import ThemeToggle from "../components/ThemeToggle";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("az");


  const fetchUsers = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      const withStatus = data.map((u) => ({ ...u, active: true }));
      dispatch({ type: "FETCH_SUCCESS", payload: withStatus });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    let list = state.users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOption === "az") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "za") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "active") {
      list.sort((a, b) => (b.active === a.active ? 0 : b.active ? 1 : -1));
    }

    return list;
  }, [state.users, search, sortOption]);

  function selectUser(id) {
    navigate(`/posts/${id}`);
  }

  function toggleStatus(id) {
    dispatch({ type: "TOGGLE_STATUS", payload: id });
  }

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <ThemeToggle />
      <SearchBar value={search} onChange={setSearch} />

      <div className="sort-box">
        <label>Sort: </label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="az">Name (A → Z)</option>
          <option value="za">Name (Z → A)</option>
          <option value="active">Active First</option>
        </select>
      </div>

      {state.error && (
        <div className="error-box">
          <p>⚠️ Failed to load users</p>
          <button className="retry-btn" onClick={fetchUsers}>
            Retry 🔁
          </button>
        </div>
      )}

      {!state.loading && !state.error && (
        <UserList
          users={filteredUsers}
          selectUser={selectUser}
          toggleStatus={toggleStatus}
        />
      )}
    </div>
  );
}
