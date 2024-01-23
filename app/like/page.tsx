import Posts from "@/components/Posts"

const page = () => {
  return (
    <div className="min-h-screen mt-4">
      <p className="text-2xl font-bold">Your Likes</p>
      <Posts location="like" />
    </div>
  )
}

export default page