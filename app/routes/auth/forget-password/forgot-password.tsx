import Logo from "~/assets/images/logo.png";
import Back from "~/assets/icons/back.svg?react";

import { Link, useNavigate } from "react-router";
import { useMemo, useState } from "react";
import ForgotPasswordStep from "./components/forget-pasword-step";
import EmailVerification from "./components/email-verification-step";
import type { Route } from "./+types/forgot-password";


export function loader({ context }: Route.LoaderArgs) {
  return context.cloudflare.env.BASE_URL;
}

const ForgotPassword = ({ loaderData:baseUrl }: Route.ComponentProps) => {
  
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handlePasscodeCheck = (otp: string) => {
    navigate("/reset-password", {state:{otp, email},replace:true});
  };

  const flowSteps = [
    {
      component: ForgotPasswordStep,
      function: (email:string) => {
        setEmail(email)
        setStep((prev) => prev + 1)},
    },
    { component: EmailVerification, function: handlePasscodeCheck },
  ];
  const Step = useMemo(() => flowSteps[step], [step]);

  return (
    <section className="mx-auto   w-fit gap-y-8 mt-20">
      <img className="mx-auto mb-16" src={Logo} />
      <Step.component
        handleStepChange={Step.function}
        email={email}
      />

      <Link
        to={"/login"}
        className="flex items-center justify-center my-4 text-tertiary gap-x-2">
        <span>العودة إلى تسجيل الدخول</span>
        <Back />
      </Link>
    </section>
  );
};

export default ForgotPassword;
