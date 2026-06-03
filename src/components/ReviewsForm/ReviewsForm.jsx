import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { UserStar, StarIcon } from "lucide-react"
import { useContext } from 'react'
import { AuthContext } from '@/Context/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Spinner } from "../ui/spinner"
import { addReview } from "@/Services/reviews"
import LoginModal from "../auth/LoginModal"
import { useQueryClient } from "@tanstack/react-query"


export default function ReviewsForm({ id }) {
    const { token, login } = useContext(AuthContext)
    const queryClient = useQueryClient()
    const ReviewSchema = z.object({
        review: z.string().min(1, "Please write a review before submitting"),

        rating: z.coerce.number("Please enter a review rating before submitting").min(1, "Please enter a review rating before submitting").max(5)

    })
    const { control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm(
        {
            resolver: zodResolver(ReviewSchema),
            mode: "onBlur",
            defaultValues: {
                review: "",
                rating: 0,
            },
        }
    )

    async function onSubmit(data) {
        if (!token) {
            return toast.error("Please login first to submit a review")
        }
        else {
            try {
                const respond = await addReview(token, id, data)
                toast.success(`Add review successfully`)
                queryClient.invalidateQueries({ queryKey: ["productReviews"] })
            } catch (error) {
                toast.warning(
                    error.response?.data?.errors.msg || "Add review failed")
            }
        }
    }
    return (
        <div >
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup className=' flex ring-0 rounded-3xl shadow-none hover:shadow-lg transtion-all duration-500 border border-primary/20 p-8'>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <div className="flex size-8 items-center justify-center rounded-full  border border-primary/20">
                            <UserStar className="size-6" />
                        </div>
                        <h1 className="text-xl font-bold">Add Your Feedback</h1>
                        <p className="text-sm muted-foreground">Share your experience with our community</p>
                    </div>

                    <Field>
                        <Controller
                            control={control}
                            name="rating"
                            render={({ field }) => (

                                <div className="text-center ">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Button
                                            className='w-15'
                                            type="button"
                                            key={star}
                                            variant="secondry "
                                            onClick={() => field.value === star ? field.onChange(0) : field.onChange(star)}>
                                            <StarIcon className={`${star <= field.value ? "text-center text-amber-600 fill-amber-600 " : "text-muted-foreground/50"} size-10 transition-all duration-500 sm:size-12 p-0 m-0`} />
                                        </Button>))}
                                </div>

                            )}
                        />
                        {errors.rating && <FieldDescription className="text-orange-600 text-xs">
                            {errors.rating.message}</FieldDescription>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="review">Review </FieldLabel>
                        <Textarea id="review" placeholder="Share your experience with our community"
                            className='rounded-2xl' {...register('review')} />
                        {errors.review && <FieldDescription className="text-orange-600 text-xs">
                            {errors.review.message}</FieldDescription>}
                    </Field>


                    {!token ? <LoginModal btn={<Button type="Button">submit</Button>}></LoginModal> :
                        <Button
                            type="submit"
                            disabled={isSubmitting || !token}>
                            {isSubmitting ?
                                <><Spinner /> Loading...</>
                                : 'submit'}
                        </Button>
                    }
                </FieldGroup>
            </form>
        </div>
    )
}
