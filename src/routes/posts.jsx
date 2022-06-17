import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const getPosts = async ()=> {
    try {
      setLoading(true)
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data =  await res.json()
      const status = res.ok
      setLoading(false)
      setPosts(data||[])
      setError(status)
    } catch (error) {
      console.log(error);
      setError(true)
      setLoading(false)
    }
  }

  useEffect(()=> {
    getPosts()
  },[])

  return (
    <div className="">
      <h2 className="mb-4 text-2xl font-bold text-black">Posts</h2>
      {posts && <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, idx)=> <PostCard key={idx} title={post?.title} body={post?.body} />)} 
      </div>}
      {isLoading && <div className="w-1/2 mx-auto h-80 bg-white shadow-xl rounded-lg flex justify-center items-center">
        <div className="w-20 h-20 border-2 border-l-0 animate-spin rounded-full"/>
      </div>}
      {error && <div className="w-1/2 mx-auto h-80 bg-white shadow-xl rounded-lg flex justify-center items-center border-t-8 border-red-500">
        <p className="text-red-500 text-lg font-medium">
          Somthing went wrong!!
        </p>
      </div>}
    </div>
  );
}