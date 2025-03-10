import { Hourglass } from 'lucide-react';

const UnderConstructionCard = ({content}:{content?:string})=>{


    return <div className='flex justify-center items-center flex-col gap-4 backdrop-blur-2xl w-full h-full'>


        <Hourglass />
        <p className='opacity-50 text-xs'>{content || "لا توجد بيانات لهذا المؤشر"}</p>
        
        
         </div>
}

export default UnderConstructionCard