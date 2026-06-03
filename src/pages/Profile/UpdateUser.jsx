import React from 'react'
import { useVerify } from '@/hooks/useVerify'
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { toast } from "sonner"
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from '@/components/ui/spinner'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { useContext } from 'react'
import { AuthContext } from '@/Context/AuthContext'
import { useQueryClient } from '@tanstack/react-query'

export default function UpdateUser({ btn }) {
    const queryClient = useQueryClient()

    const { token } = useContext(AuthContext)
    const { data: user } = useVerify()
    const navigate = useNavigate();
    const signupSchema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        phone: z.string()
    })

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(signupSchema),
        mode: "onBlur",
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })
    async function onSubmit(data) {
        console.log("object")
        try {
            const response = await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', data
                , {
                    headers: {
                        token: token,
                    },
                }
            )
            queryClient.invalidateQueries({ queryKey: ["verifyToken"] })
            console.log(response.data)
            toast.success("Account updated successfully")
        } catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.message || "update failed")
        }
        console.log("Form submitted:", data);
    }
    return (
        <div className=''>
            <Dialog>
                <DialogTrigger render={btn}>
                </DialogTrigger>
                <DialogContent >
                    <Card className='flex rounded-lg transtion-all duration-500 border-0 p-0 '>
                        <div className='flex gap-2 items-center text-primary'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            <span className='text-xl text-primary font-jetbrains font-semibold '>Update Details</span>
                        </div>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <FieldGroup className="grid grid-cols-2 gap-4 items-end">
                                    <Field>
                                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                        <Input id="name" type="text" placeholder="John Doe" defaultValue={user?.name} {...register("name")} />
                                        {errors.name &&
                                            (<FieldDescription className="text-red-500">
                                                {errors.name.message}
                                            </FieldDescription>)}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
                                        {errors.email &&
                                            (<FieldDescription className="text-red-500">
                                                {errors.email.message} </FieldDescription>)
                                        }
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                        <Input id="phone" type="tel" placeholder="0123456789" {...register('phone')} />
                                        {errors.phone && (<FieldDescription className="text-red-500">
                                            {errors.password.message} </FieldDescription>)}
                                    </Field>
                                    <FieldGroup>
                                        <Field>
                                            <Button type="submit">{isSubmitting ? <><Spinner /> Loading
                                            </> : 'Save'}</Button>
                                        </Field>
                                    </FieldGroup>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>

        </div>
    )
}
