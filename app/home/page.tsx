import Posts from "@/components/Posts"

const page = () => {
  return (
    <div className="min-h-screen">
      <div className="mt-8">
        <Posts location={"home"} />
      </div>
    </div>
  )
}

export default page