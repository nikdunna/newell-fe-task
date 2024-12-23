import { useEffect, useState } from "react";
import "../index.css";

// Newell Brands Technical Assessment - Nikhil Dunna

export default function PostList() {
  const [posts, setPosts] = useState([]); // Posts from fetch stored in state
  const [parsedPosts, setParsedPosts] = useState([]); // Posts filtered and displayed
  const [newPost, setNewPost] = useState({ title: "", body: "" }); // State for building new posts
  const [editID, setEditID] = useState(null); // State stores ID of target post for editing
  const [query, setQuery] = useState(""); // Stores search query
  const [idFilter, setIdFilter] = useState(""); // Stores user filter id

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
        setParsedPosts(data);
      })
      .catch((err) => {
        console.error("Fetching error: ", err);
      });
  }, []);

  // Refreshes parsed posts
  useEffect(() => {
    let parsed = posts;

    // Filter by title
    if (query.trim() !== "") {
      parsed = parsed.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by user ID
    if (idFilter !== "") {
      parsed = parsed.filter((post) => post.userId === Number(idFilter));
    }

    setParsedPosts(parsed);
  }, [posts, query, idFilter]);

  const addPost = () => {
    if (!newPost.title.trim() || !newPost.body.trim()) {
      // Alert and exit in case of empty fields
      alert("Fields cannot be empty!");
      return;
    }
    const post = { ...newPost, id: posts.length + 1, userId: 0 }; // Finish building post by adding IDs
    setPosts([post, ...posts]); // Add post to list of current posts
    setNewPost({ title: "", body: "" }); // Reset newPost state, ready to build new post
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id)); // Build new list without desired post
  };

  const editPost = () => {
    if (!newPost.title.trim() || !newPost.body.trim()) {
      // Alert and exit in case of empty fields
      alert("Fields cannot be empty!");
      setEditID(null); // To escape from editing only
      return;
    }
    const updatedPost = { ...newPost, id: editID }; //Build "new" post, assign id of target
    const updatedPosts = posts.map(
      (post) =>
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post // Parse through posts, replace target post w/ updated post
    );
    setPosts(updatedPosts);
    setNewPost({ title: "", body: "" }); // Reset newPost state, ready to build new post
    setEditID(null); // Reset editID, ready to edit/add new post
  };

  return (
    <div className="flex items-center justify-center flex-col max-w-screen-md mx-auto my-4 bg-newell-gray opacity-80 p-4 text-white rounded-md">
      <p className="text-4xl">Post Feed</p>

      {/* Input field for adding/editing post, search bar */}
      <div className="flex flex-col text-black sticky top-10 m-4 space-y-2 bg-slate-700 rounded-lg p-4 w-full">
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
        <button
          className="text-white bg-newell-blue rounded-md"
          onClick={() => (editID ? editPost() : addPost())}
        >
          {editID ? "Submit changes" : "Submit post"}
        </button>
        <div className="flex flex-row p-4 mx-auto space-x-2">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="p-2 text-black rounded-md"
            value={idFilter}
            onChange={(e) => setIdFilter(e.target.value)}
          >
            <option value="">Filter by User ID</option>
            {[...new Set(posts.map((post) => post.userId))].map((id) => (
              <option key={id} value={id}>
                User ID: {id}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul>
        {parsedPosts.map((post) => (
          <div
            className="flex flex-col p-4 bg-newell-blue rounded-lg m-4"
            key={post.id}
          >
            <li>
              <p className="text-xl underline">{post.title}</p>
              <p className="">{post.body}</p>
              <p className="text-sm">User ID: {post.userId}</p>
              <div className="flex flex-row justify-start items-center space-x-10 text-lg m-2">
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
