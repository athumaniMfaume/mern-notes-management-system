import { Link } from 'react-router-dom'
import { NotebookIcon } from 'lucide-react'

export const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
      <div className='bg-primary/10 rounded-full p-8'>
        <NotebookIcon className='size-10 text-primary' />
      </div>
        <h3 className='text-2xl font-bold'> No notes yet</h3>
        <p className='text-base-content/70'>Read to organize your thought? create your first notes to get started in your journey</p>
        <Link to='/create' className='btn btn-primary'>
           Create your first note
        </Link>
    </div>
  )
}

export default NotesNotFound
