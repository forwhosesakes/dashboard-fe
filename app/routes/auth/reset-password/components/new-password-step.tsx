import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Lock from "~/assets/icons/lock.svg?react"
import { authClient } from "~/lib/auth-client";
import IconContainer from "~/components/ui/icon-container";
import { InputField } from "~/components/ui/input-field";
import { SPECIAL_REGEX } from "~/lib/constants";
import CheckComponent from "~/components/ui/check-component";
import { Button } from "~/components/ui/button";
import { toasts } from "~/lib/utils/toast";

type Inputs = {
  password: string;
  passwordConfirmation: string;
};
interface IProps {
  handleStepChange: (state: string) => void;
  email: string;
  otp: string;
}

const NewPasswordStep = (props: IProps) => {
  const baseUrl = useLoaderData<string>();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState, getFieldState, trigger } =
    useForm<Inputs>({
      mode: "onChange",
      criteriaMode: "all",
    });

  const { errors, touchedFields, validatingFields, ...state } = formState;


  const resetPassword = async (data: Inputs) => {
    const flow: "otp" | "regular" = props.otp ? "otp" : "regular";
    const client = authClient(baseUrl);
    if (flow === "otp") {
      return client.emailOtp.resetPassword({
        email: props.email,
        otp: props.otp,
        password: data.password,
      });
    } else {
      // const session = await client.getSession();
      // const email = session.data?.user.email;
      // console.log("props:::", props)
      // if (!email) {
      //   throw new Error("no session in here");
      // }
      return client.resetPassword({
        newPassword: data.password,
      });
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    setLoading(true);

    resetPassword(data)
      .then(() => {
        setLoading(false);
        props.handleStepChange("")
      })
      .catch((e) => {
        setLoading(false);
        console.log("error happen when resetting password::", e)
        toasts.error({message:"حدث خطأ أثناء إعادة تعيين كلمة المرور"})

        //todo: handle error in here
      });
  };

  return (
    <div className="text-center">
      <IconContainer className="mx-auto my-6" icon={Lock} />
      <h5>تعيين كلمة مرور جديدة </h5>
      <p className="text-primary-900 mb-8">
        يجب أن تكون كلمة المرور الجديدة مختلفة عن كلمات المرور المستخدمة سابقًا.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          className="mt-1 mb-6"
          label="كلمة المرور"
          type={"password"}
          onFocus={() => trigger("password")}
          error={errors.password?.message}
          {...register("password", {
            required: " هذا الحقل مطلوب",
            minLength: {
              value: 8,
              message: "يجب ان تتكون كلمة المرور من اكثر من ٨ أحرف",
            },

            validate: {
              digit: (_, values) =>
                values.password.split("").some((c) => c >= "0" && c <= "9") ||
                "يجب أن تحتوي كلمة المرور من رقم واحد على الأقل",

              special: (_, values) =>
                SPECIAL_REGEX.test(values.password) ||
                "  يجب أن تحتوي على حرف خاص واحد على الأقل   ",
            },
          })}
          placeholder="••••••••"
        />

        <InputField
          className="mt-1 mb-6"
          label="تأكيد كلمة المرور"
          type={"password"}
          onFocus={() => trigger("passwordConfirmation")}
          placeholder="••••••••"
          error={errors.passwordConfirmation?.message}
          {...register("passwordConfirmation", {
            required: " هذا الحقل مطلوب",
            minLength: {
              value: 8,
              message: "يجب ان تتكون كلمة المرور من اكثر من ٨ أحرف",
            },
            validate: {
              equal: (_, values) =>
                (values.password === values.passwordConfirmation &&
                  values.password.trim().length > 0 &&
                  values.passwordConfirmation.trim().length > 0) ||
                "يجب إن تتطابق كلمتي المرور المدخلة  ",
            },
          })}
        />

        <div className="conditions my-2">
          <p className="text-right w-full flex items-center py-1  justify-between">
            يجب أن تتكون من 8 أحرف على الأقل{" "}
            <CheckComponent
              checked={
                !!touchedFields.password &&
                (!!(
                  "password" in errors &&
                  !Object.keys(errors?.password?.types!).includes("minLength")
                ) ||
                  !getFieldState("password").invalid)
              }
            />{" "}
          </p>
          <p className=" w-full text-right flex py-1 items-center justify-between">
            يجب أن تحتوي على رقم واحد على الأقل
            <CheckComponent
              checked={
                !!touchedFields.password &&
                (!!(
                  "password" in errors &&
                  !Object.keys(errors?.password?.types!).includes("digit")
                ) ||
                  !getFieldState("password").invalid)
              }
            />
          </p>
          <p className=" w-full text-right flex py-1 items-center justify-between">
            يجب أن تحتوي على حرف خاص واحد على الأقل
            <CheckComponent
              checked={
                !!touchedFields.password &&
                (!!(
                  "password" in errors &&
                  !Object.keys(errors?.password?.types!).includes("special")
                ) ||
                  !getFieldState("password").invalid)
              }
            />
          </p>
        </div>
        <Button
        disabled={
          !!errors.passwordConfirmation ||
          !!errors.password ||
          !touchedFields.passwordConfirmation ||
          !touchedFields.password
        }
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
export default NewPasswordStep;
