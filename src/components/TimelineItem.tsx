import { FaUser, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Comment } from "@/utils/apiCall";
import { useState } from "react";
import CommentBox from "./CommentBox";
import { useRouter } from "next/navigation";

interface TimelineItemProps {
  postId: number;
  userName: string;
  title: string;
  body: string;
  comments: Comment[];
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  postId,
  userName,
  title,
  body,
  comments,
}) => {
  const [showComments, setShowComments] = useState(false);
  const router = useRouter();
  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-slate-200 shadow-md rounded-lg p-4 mb-4 ">
      <div className="flex flex-row justify-between items-center ">
        <h3 className="text-xl font-semibold ">{title.toUpperCase()}</h3>
        <button
          onClick={() => router.push(`/${postId}`)}
          className="text-black bg-blue-200 px-3 py-2 rounded-lg"
        >
          View Post
        </button>
      </div>
      <div className="flex flex-row gap-2 items-center mb-4">
        <FaUser size={35} className="border-2 rounded-full bg-gray-50" />
        <span className="text-xs font-semibold">by {userName}</span>
      </div>
      <p className="text-gray-700 text-lg mb-2">{body}</p>
      <button
        onClick={handleShowComments}
        className="text-blue-500 hover:underline"
      >
        {showComments ? (
          <span className="flex flex-row gap-2 items-center">
            <span>Hide Comments </span> <FaAngleUp size={25} />
          </span>
        ) : (
          <span className="flex flex-row gap-2 items-center">
            <span>Show Comments </span> <FaAngleDown size={25} />
          </span>
        )}
      </button>
      {showComments && (
        <div className="mt-4 transition-opacity duration-500 ease-in-out opacity-100">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <div className="space-y-2">
            {comments.map((comment) => (
              <CommentBox
                key={comment.id}
                name={comment.name}
                email={comment.email}
                body={comment.body}
              />
            ))}
          </div>
          {comments.length === 0 && (
            <p className="text-gray-500 mt-2">No comments yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TimelineItem;
