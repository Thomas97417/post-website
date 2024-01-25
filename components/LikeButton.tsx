import { handleLike } from "@/app/actions/likeAction";
import { Heart } from "lucide-react";

const LikeButton = ({
  user,
  post,
  isLiked,
  location,
}: {
  user: string;
  post: string;
  isLiked: boolean;
  location: string;
}) => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    handleLike({ user, post });
    console.log("liked");
    console.log(location);
  };
  return (
    <form action={handleSubmit}>
      <button type="submit">
        <Heart
          className={`hover:text-white h-5 w-5 ${
            isLiked ? "text-red-500" : "text-gray-400"
          }`}
        />
      </button>
    </form>
  );
};

export default LikeButton;
