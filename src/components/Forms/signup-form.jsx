import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "../ui/spinner"
import { Link } from "react-router-dom"

export function SignupForm({ register, isSubmitting, handleSubmit, onSubmit, errors, ...props }) {

  return (
    <Card {...props} className='flex ring-0 rounded-lg shadow-none hover:shadow-lg transtion-all duration-500 border border-primary/20'>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription className="text-xs "> Enter your information below to create your account
        </CardDescription> </CardHeader> <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <FieldGroup className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" {...register("name")} />
              {errors.name &&
                (<FieldDescription className="text-red-500">
                  {errors.name.message}
                </FieldDescription>)}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
              {errors.email ?
                (<FieldDescription className="text-red-500">
                  {errors.email.message} </FieldDescription>)
                :
                (<FieldDescription className="text-xs "> We&apos;ll use this to contact you. We will not share your email with anyone else.
                </FieldDescription>)}
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" type="tel" placeholder="0123456789" {...register('phone')} />
              {errors.phone && (<FieldDescription className="text-red-500">
                {errors.password.message} </FieldDescription>)}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" {...register('password')} />
              {errors.password ? (<FieldDescription className="text-red-500">
                {errors.password.message} </FieldDescription>) :
                (<FieldDescription className="text-xs "> Must be at least 8 characters long. </FieldDescription>)}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password"> Confirm Password </FieldLabel>
              <Input id="confirm-password" type="password" {...register('rePassword')} />
              {errors.rePassword && (<FieldDescription className="text-red-500 text-xs">
                {errors.rePassword.message}
              </FieldDescription>)}
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit">{isSubmitting ? <><Spinner /> Loading
                </> : 'Create Account'}</Button>
                <FieldDescription className="px-6 text-center"> Already have an account?
                  <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>);
}