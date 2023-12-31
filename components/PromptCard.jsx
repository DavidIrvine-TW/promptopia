"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import copyIcon from '../public/assets/icons/copy.svg'
import tickIcon from '../public/assets/icons/tick.svg'



const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const {data: session} = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const [copy, setCopy] = useState("");

  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopy(false), 3000);
  };

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start gap-3 cursor-pointer"  onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            alt="user image"
            width={44}
            height={44}
            className="object-cover rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            width={12}
            height={12}
            src={
              copy === post.prompt
                ? tickIcon
                : copyIcon
            }
            alt={copy === post.prompt ? "tick_icon" : "copy_icon"}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm cursor-pointer blue_gradient"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user._id === post.creator.id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
        </div>
      ) }
    </div>
  );
};

export default PromptCard;
