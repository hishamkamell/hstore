import { LoginForm } from '@/components/login-form'


export default function Login() {
  /*  const { token, login } = useContext(AuthContext)
 
   const navigate = useNavigate();
   const loginSchema = z.object({
     email: z.string().email("Invaild email address"),
     password: z.string().min(8, "Password must be at least 8 characters"),
 
   })
   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
     resolver: zodResolver(loginSchema),
     mode: "onBlur"
   })
   const onSubmit = async (data) => {
     console.log("Form submitted:", data);
     try {
       const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
       toast.success(`Login successfully`)
       login(response.data.token)
       navigate("/home", { replace: true });
     } catch (error) {
       console.log(error.response?.data?.message)
 
       toast.error(
         error.response?.data?.message || "Login failed")
     }
   } */

  return (
    <div className='px-8 flex items-center justify-center py-12'>
      <LoginForm>
      </LoginForm>
    </div>
  )
}
