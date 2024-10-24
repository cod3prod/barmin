import PostItem from "./PostItem";
import { FaRegSadCry } from "react-icons/fa";

export default function PostsList({ username, posts }) {
  return (
    <div className="flex flex-col">
      <p
        className={"text-2xl font-bold mb-4"}
      >{`${username}님의 게시글`}</p>
      <div className="custom-scroll h-[35rem] flex flex-col overflow-y-auto">
        {posts.map((post) => (
          <PostItem key={post._id} location={post} />
        ))}
        {posts.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <FaRegSadCry className="mb-4" size={100}/>
            <p>작성한 글이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
