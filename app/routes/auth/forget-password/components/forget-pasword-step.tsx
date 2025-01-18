import { Button } from "~/components/ui/button";
import IconContainer from "~/components/ui/icon-container";
import { InputField } from "~/components/ui/input-field";
import Key from "~/assets/icons/key.svg?react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { EMAIL_REGEX } from "~/lib/constants";
import { useLoaderData } from "react-router";
import { authClient } from "~/lib/auth-client";
import { useState } from "react";

interface IProps {
  handleStepChange: (state: string) => void
}
type Inputs = {
  email: string;
};
const ForgotPasswordStep = (props: IProps) => {
  const baseUrl = useLoaderData<string>();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    authClient(baseUrl)
      .forgetPassword({ email: data.email, redirectTo: "/reset-password" })
      .then(() => {
        props.handleStepChange(data.email);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);

        //todo: handle error in here
      });
  };

  return (
    <div className="text-center">
      <IconContainer className="mx-auto my-6" icon={Key} />
      <h5>نسيت كلمة المرور؟</h5>
      <p className="text-primary-900 mb-8">
        لا تقلق، سنرسل لك تعليمات إعادة تعيين كلمة المرور.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          className="mt-1 mb-6"
          label="البريد الإلكتروني"
          type={"email"}
          {...register("email", { required: true, pattern: EMAIL_REGEX })}
          placeholder="أدخل بريدك الإلكتروني"
          error={!!errors.email && "البريد الإلكتروني غير صالح"}
        />
        <Button
          disabled={!!errors.email || !touchedFields.email}
          type="submit"
          loading={loading}
          variant={"secondary"}
        >
          إعادة تعيين كلمة المرور
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordStep;
