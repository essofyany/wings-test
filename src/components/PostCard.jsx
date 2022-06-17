const PostCard = ({title, body}) => {
  return (
    <div className="flex flex-col gap-1 bg-white p-4 rounded-lg shadow-lg shadow-gray-200/75">
        <h3 className="text-lg text-black font-bold first-letter:capitalize">{title}</h3>
        <p className="text-sm font-medium text-black/50">{body}</p>
    </div>
  )
}

export default PostCard