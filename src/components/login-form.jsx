import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { StoreIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Spinner } from "./ui/spinner"
import { useContext } from 'react'
import { AuthContext } from '@/Context/AuthContext'
import { LoginPost } from '@/Services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'



export function LoginForm({
  className,

  setClose,
  ...props
}) {
  const { token, login } = useContext(AuthContext)

  const loginSchema = z.object({
    email: z.string().email("Invaild email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),

  })
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur"
  })
  const onSubmit = async (data) => {
    try {
      const response = await LoginPost(data)
      toast.success(`Login successfully`)
      login(response.data.token)
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed")
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form >
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-8 items-center justify-center rounded-md">
              <StoreIcon className="size-6" />
            </div>
            <h1 className="text-xl font-bold">Welcome to H-Store</h1>
            <FieldDescription>
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel >Email</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
            {errors.email && <FieldDescription className="text-red-500">
              {errors.email.message}</FieldDescription>}
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <FieldDescription className="text-red-500">
              {errors.password.message}</FieldDescription>}
          </Field>
          <Field>
            <Button type="Button" onClick={handleSubmit(onSubmit)}>{isSubmitting ? <><Spinner /> Loading...</> : 'Login'}</Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our Terms of Service
        and Privacy Policy.
      </FieldDescription>
    </div>
  );
}
