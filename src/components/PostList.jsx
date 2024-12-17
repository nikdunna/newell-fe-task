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
        return response.json(); // Parse response
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.error("Fetching error: ", err);
      });
  });

  return (
    <div className="flex items-center justify-center flex-col max-w-screen-md mx-auto my-4 bg-newell-gray opacity-80 p-4 text-white rounded-md">
      <p className="text-2xl">Post Feed</p>
      <ul>
        {posts.map((post) => (
          <div className="flex flex-col p-4 bg-newell-blue rounded-lg m-4">
            <li key={post.id}>
              <p className="text-xl underline">{post.title}</p>
              <p className="">{post.body}</p>
              <div className="flex flex-row justify-start items-centen space-x-10 text-lg m-2">
                <button className="bg-newell-gray w-20 h-10 rounded-md">
                  Edit
                </button>
                <button className="bg-red-500 w-20 h-10 rounded-md">
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
