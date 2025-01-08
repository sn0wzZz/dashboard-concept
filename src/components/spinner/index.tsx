import { Loader2 } from 'lucide-react';


export default function Spinner() {
  return (
    <div className='w-full h-full flex justify-center items-center'><Loader2 className='animate-spin repeat-infinite' /></div>
  )
}