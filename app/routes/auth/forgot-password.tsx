import Logo from "../../assets/images/logo.png";
import Key from "../../assets/icons/key.svg?react";
import Back from "../../assets/icons/back.svg?react";
import IconContainer from "./components/icon-container";
import { InputField } from "~/components/ui/input-field";
import { Button } from "~/components/ui/button";

const ForgotPassword = () => {
  return (
    <section className="mx-auto  flex flex-col items-center justify-center h-screen">
      <img src={Logo} />
      <div className="text-center">
        <IconContainer icon={Key} />
        <h6>نسيت كلمة المرور؟</h6>
        <p>لا تقلق، سنرسل لك تعليمات إعادة تعيين كلمة المرور.</p>

        <InputField label="البريد الإلكتروني" placeholder="أدخل بريدك الإلكتروني"/>
        <Button variant={"secondary"}>إعادة تعيين كلمة المرور</Button>


        <p className="flex items-center text-tertiary gap-x-2">

            <span>العودة إلى تسجيل الدخول</span>
            <Back/>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
