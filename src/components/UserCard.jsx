export default function UserCard({ user, onSelect, onToggle }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>

      <button className="status-btn" onClick={() => onToggle(user.id)}>
        {user.active ? "Active" : "Inactive"}
      </button>

      <button className="view-btn" onClick={() => onSelect(user.id)}>
        View Posts
      </button>
    </div>
  );
}
