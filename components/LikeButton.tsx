import { handleLike } from '@/app/actions/likeAction';
import { Heart } from 'lucide-react';

const LikeButton = ({user, post}: {user: string, post: string}) => {
  const handleSubmit = async (formData: FormData) => {
    "use server"
    handleLike({user, post})
  }
  return (
    // <button onClick={() => handleLike({user, post})}>
    //   <Heart className='text-gray-400 hover:text-white' />
    // </button>
    <form action={handleSubmit}>
      <button type='submit'>
        <Heart className='text-gray-400 hover:text-white' />
      </button>
    </form>
  )
}

export default LikeButton