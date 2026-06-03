
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupForm } from '@/components/Forms/signup-form'
import axios from 'axios'
import { toast } from "sonner"
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigate();
    const signupSchema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        rePassword: z.string(),
        phone: z.string()
    }).refine((data) => data.password === data.rePassword, {
        message: "Passwords don't match",
        path: ["rePassword"],
    })

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(signupSchema),
        mode: "onBlur",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
    })
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
            console.log(response.data)
            toast.success("Account created successfully")
            navigate("/login", { replace: true });
        } catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.message || "Signup failed")
        }
        console.log("Form submitted:", data);

    }

    return (
        <div className='flex flex-col md:px-20 sm:px-10 px-4 flex items-center justify-center py-12 '>
            <div className='text-4xl font-bold mb-4 text-center py-4 gap-4 flex flex-col justify-start'>Create Account
                <p className='text-muted-foreground text-sm text-center font-normal text-center'>
                    Already have an account?
                    <Link to="/login">
                        <span className='underline'>Sign in
                        </span>
                    </Link>
                </p>
            </div>
            <div className='w-full max-w-2xl'>
                <SignupForm
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    isSubmitting={isSubmitting}
                    errors={errors}
                />
            </div>
        </div>
    )
}
