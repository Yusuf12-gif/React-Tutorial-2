export default function PostsList({ posts }) {
  return (
    <ul className="posts">
      {posts.map((p) => (
        <li key={p.id}>
          <strong>Title:</strong> {p.title}
          <br />
          <strong>Body:</strong> {p.body}
        </li>
      ))}
    </ul>
  );
}
