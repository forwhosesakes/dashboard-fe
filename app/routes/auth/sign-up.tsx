import { useForm, type SubmitHandler } from "react-hook-form"
import { useLoaderData, type LoaderFunctionArgs } from "react-router"
import { authClient } from "~/lib/auth-client"
type Inputs = {
    email: string
    password: string
  }



  export async function loader({context}:LoaderFunctionArgs){
    const serverUrl = context.cloudflare.env.BASE_URL
    return{serverUrl}
  }


const SignUp = ()=>{
const { serverUrl } = useLoaderData<typeof loader>();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) => {
        
        authClient(serverUrl).signUp.email({email:data.email, password:data.password,name:"user_test"})
    
    }
    


    return <section>
            <h1>sign up new user</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input className="bg-white text-black" defaultValue="email" {...register("email")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input className="bg-white text-black" {...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.email && <span>This field is required</span>}

      <input type="submit" />

      <div className="w-52 h-52 bg-primary-500 border-2">
        hi
      </div>
    </form>

    </section>
    
    



}


export default SignUp