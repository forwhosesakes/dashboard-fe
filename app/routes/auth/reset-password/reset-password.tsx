import { useMemo, useState } from "react";
import NewPasswordStep from "./components/new-password-step";
import PostChangeConformation from "./components/postchange-confirmation";
import { Link, useLocation } from "react-router";

import Logo from "~/assets/images/logo.png";
import Back from "~/assets/icons/back.svg?react";
import type { Route } from "./+types/reset-password";

export function loader({ context }: Route.LoaderArgs) {
  return context.cloudflare.env.BASE_URL;
}
  
const ResetPassword = ({ loaderData:baseUrl }: Route.ComponentProps) => {
  const location = useLocation();
  const otpData = location.state as { email: string; otp: string } || null;
  const [step, setStep] = useState(0);
  const flowSteps = [NewPasswordStep, PostChangeConformation];
  const StepComponent = useMemo(() => flowSteps[step], [step]);

  

  return (
    <section className="mx-auto   w-fit gap-y-8 mt-20">
      <img className="mx-auto mb-16" src={Logo} />
      <StepComponent
        handleStepChange={() => setStep((prev) => prev + 1)}
        email={otpData?.email}
        otp={otpData?.otp}
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

export default ResetPassword;
