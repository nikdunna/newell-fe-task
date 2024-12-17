import { useEffect, useState } from "react";
import "../index.css";

export default function PostList() {
  const [posts, setPosts] = useState([]); // Posts from fetch stored in state

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          // Check for valid network return
          throw new Error("Network error");
        }
        return response.json; // Parse response
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.error("Fetching error: ", err);
      });
  });

  return (
    <div className="flex items-center justify-center flex-col">
        <p className="text-2xl">Post Feed</p>
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <p className="text-lg">{post.title}</p>
                    <p className="">{post.body}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}
