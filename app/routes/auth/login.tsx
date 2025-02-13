import { useForm, type SubmitHandler } from "react-hook-form";
import { authClient } from "~/lib/auth-client";
import LoadingOverlay from "~/components/loading-overlay";
import Logo from "~/assets/images/logo.svg";
import { useEffect, useState } from "react";
import {
  useNavigation,
  Form,
  Link,
  useNavigate,
  useLoaderData,
  redirect,
} from "react-router";
import LoginShapeImg from "~/assets/images/login-img.png";
import WhiteLogo from "~/assets/images/logo-white.png";
import { Checkbox } from "~/components/ui/checkbox";
import glossary from "~/constants/glossary";
import type { LoaderFunctionArgs } from "react-router";
import { orgApi } from "~/lib/api/org";

type Inputs = {
  email: string;
  password: string;
};

export async function loader({ request, context }: LoaderFunctionArgs) {
  const serverUrl = context.cloudflare.env.BASE_URL;

  const cookieHeader = request.headers.get("Cookie");
  const res = await authClient(serverUrl).getSession({
    fetchOptions: {
      headers: {
        Cookie: cookieHeader || "",
      },
      // credentials: "include",
    },
  });
  const session = res.data?.session;
  const user = res.data?.user
  // console.log("user is :: ",user);
  

  if (session && user && user.role === "user"){
    const org = await orgApi(serverUrl).getOrgByUderId("uRbAvjUssCc0yBVX0khphftqwQcbiZD5")
    console.log("org is ::",org);
    // if(!org)return redirect("/login")
    return redirect(`/org/${org.id}`)
  } else if(session && user && user.role === "admin"){
    return redirect(`/`)
  }
  

  return { serverUrl };
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const isSubmitting = navigation.state === "submitting";

  const { serverUrl } = useLoaderData<typeof loader>();

  const onSubmit: SubmitHandler<Inputs> = async () => {
    setLoading(true);
    if (email === "" || password === "") {
      setLoginError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      setLoading(false);
      return;
    }

    const res = await authClient(serverUrl).signIn.email({
      email,
      password,
      rememberMe,
      fetchOptions: {
        
        onSuccess: (data) => {
          console.log("success yaaaaay", data);
        },
        onError: (e) => {
          console.log("error", e);
        },
      },
    });

    if (res?.error) {
      const error = res?.error;
      if (error.message?.toLowerCase().includes("invalid")) {
        setLoginError(glossary.login.errors.invalid);
      } else if (error.message?.toLowerCase().includes("verified")) {
        setLoginError(glossary.login.errors.unverified);
      } else {
        setLoginError(glossary.login.errors.generic);
      }
      setLoading(false);
      return;
    }
    // console.log("hi");
    
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="lg:flex lg:flex-row  justify-between items-center w-full h-screen overflow-hidden ">
      {(loading || isSubmitting) && <LoadingOverlay />}
      <div className="blur-[180px] inset-0 absolute"></div>
      <div className="h-full w-full flex flex-col  justify-center items-center z-10 overflow-y-hidden">
        <img
          className="lg:my-16 my-8 z-10 lg:w-[186px] lg:h-[155px]  w-[144px] h-[120px] brd"
          src={Logo}
          alt=""
        />
        <h2 className="my-5 z-10 text-4xl">{glossary.login.title}</h2>

        <Form
          onSubmit={onSubmit}
          className="my-5 flex flex-col gap-2 w-full items-center justify-center z-10"
        >
          <div className="md:w-1/3  w-3/5">
            <p className="text-xs lg:text-base md:text-sm my-1 font-bold text-primary-foreground z-10">
              {glossary.login.email}
            </p>
            <input
              className="text-xs lg:text-base md:text-sm p-1 bg-primary text-primary-foreground border rounded w-full z-10"
              type="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* {actionData?.errors?.email && (
              <p className="text-red-500 text-xs mt-1">
                {actionData.errors.email}
              </p>
            )} */}
          </div>
          <div className="md:w-1/3 w-3/5">
            <p className="text-xs lg:text-base md:text-sm my-1 font-bold text-primary-foreground z-10">
              {glossary.login.password}
            </p>
            <div className="relative">
              <input
                className="text-xs lg:text-base md:text-sm p-1 bg-white text-primary-foreground border rounded w-full z-10"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="1127651158"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute hover:underline left-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? "إخفاء" : "إظهار"}
              </button>
            </div>
            {/* {actionData?.errors?.password && (
              <p className="text-red-500 text-xs mt-1">
                {actionData.errors.password}
              </p>
            )} */}
          </div>
          <div className="flex md:w-1/3 w-3/5 justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                name="remember"
                label="تذكرني"
                checked={rememberMe}
                onChange={(checked) => {
                  setRememberMe(checked);
                }}
              />
            </div>
            <Link
              className="text-black text-xs lg:text-lg md:text-sm text-secondary-900 hover:underline my-1 z-10"
              to={"/forgot-password"}
            >
              {glossary.login.forgot_password}
            </Link>
          </div>
          <div className="flex flex-col md:w-1/3 w-3/5 z-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="button text-xs lg:text-lg md:text-sm text-center bg-secondary hover:opacity-90 transition-opacity text-primary rounded-lg mt-6 border border-secondary-700 w-full p-3 z-10"
            >
              {isSubmitting ? "جاري تسجيل الدخول..." : glossary.login.login}
            </button>

            {/* {actionData?.errors?.generic && (
              <p className="text-red-500 text-xs mt-1">
                {actionData.errors.generic}
              </p>
            )} */}
            {loginError && (
              <p className="text-red-500 text-sm text-center mt-2">
                {loginError}
              </p>
            )}
          </div>
        </Form>
      </div>

      <div className="hidden lg:flex justify-center items-end h-full w-2/3 max-w-fit z-10 bg-primary">
        <div className="h-full w-full flex justify-end items-end relative ">
          <img
            src={WhiteLogo}
            className="absolute  left-1/2 -translate-x-1/2 bottom-16"
            alt=""
          />
          <img
            src={LoginShapeImg}
            className="h-full w-auto object-cover object-bottom"
            alt=""
          />
        </div>
      </div>
    </div>
  );
  // <section>

  //     <h1>login</h1>
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //   {/* register your input into the hook by invoking the "register" function */}
  //   <input defaultValue="email" {...register("email")} />

  //   {/* include validation with required or other standard HTML validation rules */}
  //   <input {...register("password", { required: true })} />
  //   {/* errors will return when field validation fails  */}
  //   {errors.email && <span>This field is required</span>}

  //   <input type="submit" />
  // </form>
  //     </section>
};

export default Login;
