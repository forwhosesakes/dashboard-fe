import { useForm, type SubmitHandler } from "react-hook-form";
import { authClient } from "~/lib/auth-client";
import type { Route } from "./+types/login";
type Inputs = {
  email: string;
  password: string;
};

export function loader({ context }: Route.LoaderArgs) {
  return context.cloudflare.env.BASE_URL;
}

const Login = ({ loaderData: baseUrl }: Route.ComponentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    authClient(baseUrl).signIn.email({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <section>
      <h1>login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="email" {...register("email")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("password", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.email && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </section>
  );
};

export default Login;
