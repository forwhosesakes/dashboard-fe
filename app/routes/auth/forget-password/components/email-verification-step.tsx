import { Button } from "~/components/ui/button";
import IconContainer from "~/components/ui/icon-container";
import Email from "~/assets/icons/mail.svg?react";
import { useReducer, useState } from "react";
import Passcode from "~/components/ui/passcode";
import { useLoaderData } from "react-router";
import { authClient } from "~/lib/auth-client";

interface IProps {
  handleStepChange: (passcode: string) => void;
  email: string;
}
const EmailVerification = (props: IProps) => {
  const [isManualMode, triggerManualMode] = useReducer((st) => !st, false);
  const [isLoading, setLoading] = useState(false);
  const baseUrl = useLoaderData<string>();

  const handleStepChange = (passcode: string) => {
    props.handleStepChange(passcode);
  };

  const sendVer = () => {
    return isManualMode
      ? authClient(baseUrl).emailOtp.sendVerificationOtp({
          email: props.email,
          type: "forget-password",
        })
      : authClient(baseUrl).forgetPassword({
          email: props.email,
          redirectTo: "/reset-password",
        });
  };
  return (
    <div className="text-center">
      <IconContainer className="mx-auto my-6" icon={Email} />
      <h5>تحقق من بريدك الإلكتروني </h5>
      <p className="text-primary-900 mt-2 mb-8">
        لقد أرسلنا رابط التحقق إلى {props.email}
      </p>

      {isManualMode ? (
        <Passcode
          title="رمز الأمان"
          noDigits={6}
          onFinishTyping={handleStepChange}
        />
      ) : (
        <Button
          onClick={() => {
            setLoading(true);
            authClient(baseUrl)
              .emailOtp.sendVerificationOtp({
                email: props.email,
                type: "forget-password",
              })
              .then((res) => {

                setLoading(false);
                triggerManualMode();
              })
              .catch((e: any) => {
                setLoading(false);
                console.log("error in sendVerificationOtp", e);
              });
          }}
          variant={"secondary"}
          loading={isLoading}
        >
          {" "}
          أدخل الرمز يدويًا
        </Button>
      )}
      <p className="my-8">
        <span className=" ml-2 text-tertiary-600">
          لم تستلم البريد الإلكتروني؟
        </span>
        <button
          onClick={() => {
            setLoading(true);
            sendVer()
              .then((res) => {

                setLoading(false);
                triggerManualMode();
              })
              .catch((e: any) => {
                setLoading(false);
                console.log("error in sendVerificationOtp", e);
              });
          }}
          className="font-bold text-[#286456]"
        >
          اضغط لإعادة الإرسال
        </button>
      </p>
    </div>
  );
};
export default EmailVerification;
