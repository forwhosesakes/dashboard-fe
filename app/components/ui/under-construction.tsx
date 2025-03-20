import { Hourglass } from 'lucide-react';

const UnderConstructionCard = ({content,textColor="",mode="normal"}:{content?:string,textColor?:string,mode?:"normal"|"iconOnly"})=>{


    return <div className='flex justify-center items-center flex-col gap-4 backdrop-blur-2xl w-full h-full'>


        <Hourglass className={`${textColor}`}/>
        {mode==="normal"&&(
            <p className={`opacity-50 ${textColor} text-xs`}>{content || "لا توجد بيانات لهذا المؤشر"}</p>
        )}
        
        
         </div>
}

export default UnderConstructionCard