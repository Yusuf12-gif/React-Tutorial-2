import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostsList from "../components/PostsList";

export default function UserPosts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        );
        setPosts(await res.json());
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>
      <h2>User Posts ({posts.length})</h2>
      <PostsList posts={posts} />
    </div>
  );
}
