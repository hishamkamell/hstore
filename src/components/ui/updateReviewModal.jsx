import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StarIcon } from "lucide-react"
import z from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "./spinner"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

export default function UpdateReviewModal({ btn, reviewId, reviewData, token }) {
    const userImg = "https://notion-avatars.netlify.app/api/avatar/?face=8&nose=3&mouth=17&eyes=4&eyebrows=1&glasses=1&hair=2&accessories=0&details=0&beard=0&halloween=0&christmas=0"

    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const UpdateReviewSchema = z.object({
        review: z.string().min(1, "Please write a review before submitting"),

        rating: z.coerce.number("Please enter a review rating before submitting").min(1, "Please enter a review rating before submitting").max(5)

    })
    const { control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm(
        {
            resolver: zodResolver(UpdateReviewSchema),
            mode: "onBlur",
            defaultValues: {
                review: "",
                rating: 0,
            },
        }
    )

    async function updateReview(reviewId, reviewData, token, setOpen) {
        try {
            const res = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
                reviewData,
                {
                    headers: {
                        token: token,
                    },
                },
            );
            toast.success("Update review successfully");
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ["productReviews"] })
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Update review failed");
        }
    }
    function onSubmit(data) {
        updateReview(reviewId, data, token, setOpen)
    }

    return (
        <div >
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger render={btn}>
                </DialogTrigger>
                <DialogContent >
                    <form className="transition-all duration-500" onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <div className="flex flex-col items-center gap-2 justify-center">
                                    <div className="flex size-12 items-center justify-center rounded-full  border border-primary/20">
                                        <img src={userImg} className="size-12" />
                                    </div>
                                    <h3 className="text-xl font-bold">Update Your Feedback</h3>
                                </div>
                                <Controller
                                    control={control}
                                    name="rating"
                                    render={({ field }) => (

                                        <div className="text-center text-sm ">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Button
                                                    className=" items-center justify-center w-12"
                                                    type="button"
                                                    key={star}
                                                    variant="secondry"
                                                    onClick={() => field.value === star ? field.onChange(0) : field.onChange(star)}>
                                                    <StarIcon className={`${star <= field.value ? "text-center text-amber-600 fill-amber-600 " : "text-muted-foreground/50"} size-10 transition-all duration-500 sm:size-10`} />
                                                </Button>))}
                                        </div>

                                    )}
                                />
                                {errors.rating && <FieldDescription className="text-orange-600 text-xs">
                                    {errors.rating.message}</FieldDescription>}
                            </Field>
                            <Field>
                                <FieldLabel>Review </FieldLabel>
                                <Textarea defaultValue={reviewData} id="review" placeholder={reviewData} className='rounded-2xl h-25' {...register('review')} />
                                {errors.review && <FieldDescription className="text-orange-600 text-xs">
                                    {errors.review.message}</FieldDescription>}
                            </Field>
                            <Button
                                type="submit"
                                disabled={isSubmitting}>
                                {isSubmitting ?
                                    <><Spinner /> Loading...</>
                                    : 'save'}
                            </Button>
                        </FieldGroup>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    )
}
