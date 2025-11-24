import UserCard from "./UserCard";

export default function UserList({ users, selectUser, toggleStatus }) {
  return (
    <div className="user-list">
      {users.map((u) => (
        <UserCard
          key={u.id}
          user={u}
          onSelect={selectUser}
          onToggle={toggleStatus}
        />
      ))}
    </div>
  );
}
