import IconContainer from "~/components/ui/icon-container";
import CheckCircle from "~/assets/icons/check-circle.svg?react";
import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router";


const PostChangeConformation = ({handleStepChange}:any)=>{

  const navigate = useNavigate()
    return <div className="text-center">
    <IconContainer className="mx-auto my-6" icon={CheckCircle} />
    <h5>تعيين كلمة مرور جديدة  </h5>
    <p className="text-primary-900 mb-8">
    تمت إعادة تعيين كلمة المرور بنجاح. انقر أدناه لتسجيل الدخول  .
    </p>
    <Button onClick={()=>navigate("login")} variant={"secondary"} loading={false}>استمر   </Button>
  </div>
}

export default PostChangeConformation