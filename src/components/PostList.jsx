import { useEffect, useState } from "react";
import "../index.css";

export default function PostList() {
  const [posts, setPosts] = useState([]); // Posts from fetch stored in state
  const [newPost, setNewPost] = useState({ title: "", body: "" }); // State for building new posts
  const [editID, setEditID] = useState(null); // State stores ID of target post for editing

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          // Check for valid network return
          throw new Error("Network error");
        }
        return response.json(); // Parse response
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.error("Fetching error: ", err);
      });
  }, []);

  const addPost = () => {
    if (!newPost.title.trim() || !newPost.body.trim()) {
      // Alert and exit in case of empty fields
      alert("Fields cannot be empty!");
      return;
    }
    const post = { ...newPost, id: posts.length + 1 }; // Finish building post by adding ID
    setPosts([post, ...posts]); // Add post to list of current posts
    console.log(post);
    setNewPost({ title: "", body: "" }); // Reset newPost state, ready to build new post
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id)); // Build new list without desired post.
  };

  const editPost = () => {
    if (!newPost.title.trim() || !newPost.body.trim()) {
        // Alert and exit in case of empty fields
        alert("Fields cannot be empty!");
        return;
      }
    const updatedPost = { ...newPost, id: editID };
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? { ...post, ...updatedPost } : post
    );
    setPosts(updatedPosts);
    setNewPost({ title: "", body: "" });
    setEditID(null);
  };

  return (
    <div className="flex items-center justify-center flex-col max-w-screen-md mx-auto my-4 bg-newell-gray opacity-80 p-4 text-white rounded-md">
      <p className="text-2xl">Post Feed</p>

      {/* Input field for adding/editing post */}
      <div className="flex flex-col text-black sticky top-10">
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <button onClick={() => (editID ? editPost() : addPost())}>
          {editID ? "Submit changes" : "Submit post"}
        </button>
      </div>

      <ul>
        {posts.map((post) => (
          <div
            className="flex flex-col p-4 bg-newell-blue rounded-lg m-4"
            key={post.id}
          >
            <li>
              <p className="text-xl underline">{post.title}</p>
              <p className="">{post.body}</p>
              <div className="flex flex-row justify-start items-centen space-x-10 text-lg m-2">
                <button
                  className="bg-newell-gray w-20 h-10 rounded-md"
                  onClick={() => setEditID(post.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 w-20 h-10 rounded-md"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
