import UpdateReviewModal from '../ui/updateReviewModal'
import { Button } from '../ui/button'
import { StarHalf, Star, Calendar } from 'lucide-react'
import { AuthContext } from '@/Context/AuthContext'
import { useVerify } from '@/hooks/useVerify'
import { toast } from 'sonner'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'


export default function ReviewsCard({ review }) {
    const { token, login } = useContext(AuthContext)

    const queryClient = useQueryClient()
    const { data: verify } = useVerify()
    const userId = verify?.decoded?.id
    const userName = verify?.decoded?.name
    async function deleteReview(reviewId, token) {
        try {
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
                {
                    headers: {
                        token: token,
                    },
                },
            );
            toast.success("Delete review successfully");
            queryClient.invalidateQueries({ queryKey: ["productReviews"] })
            return data;
        } catch (error) {
            toast.success("An error occurred while deleting the review");
        }
    }
    return (
        <>

            {review?.user._id === userId ?
                <div className='p-5 border-1 rounded-2xl grid gap-4 border-amber-500/35 items-center transition-all duration-500 hover:scale-101 hover:shadow-sm hover:bg-amber-500/5' key={review?._id}>
                    <div className='flex items-center gap-5 justify-between'>
                        <div className='flex items-start gap-3'>
                            <div className=' h-12 w-12 flex items-center justify-center border rounded-4xl bg-amber-500/35 flex-shrink-0'>
                                <img src="https://notion-avatars.netlify.app/api/avatar/?face=8&nose=3&mouth=17&eyes=4&eyebrows=1&glasses=1&hair=2&accessories=0&details=0&beard=0&halloween=0&christmas=0" alt="Notion Avatar" />                            </div>
                            <div className='flex flex-col'>
                                <span className='text-sm '>{review?.user.name}</span>
                                <div className="flex items-center gap-0.5 ">
                                    {[...Array(5)].map((_, index) => {
                                        if (index + 1 <= review?.rating) {
                                            return <Star key={index} className={`text-amber-600 fill-amber-600`} size={13} />
                                        }
                                        if (review?.rating + 0.5 >= index + 1) {
                                            return <div className="relative " key={index}>

                                                <StarHalf className={`absolute text-amber-600 fill-amber-600`} size={13} />
                                                <Star className={`text-amber-600`} size={13} />
                                            </div>
                                        }
                                        else {
                                            return <Star key={index} className="text-gray-300 " size={13} />
                                        }
                                    })}
                                    <p className='px-2 text-xs text-muted-foreground'>({review?.rating})</p>
                                </div>

                            </div>
                        </div>

                        <div className='flex items-center gap-1'>
                            <Calendar size={13} ></Calendar>

                            <span className='text-xs text-muted-foreground  '>

                                {new Date(review?.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>

                    </div>

                    <div className='flex gap-3'>
                        <p className='text-justify text-sm text-muted-foreground flex-1'>{review?.review}</p>
                        <UpdateReviewModal
                            reviewId={review?._id}
                            userName={userName}
                            token={token}
                            reviewData={review?.review}
                            btn={<Button
                                variant='outline'
                                className="bg-transparent border-amber-500/50 hover:bg-amber-500/20 hover:border-amber-600">
                                Edit
                            </Button>}>
                        </UpdateReviewModal>

                        <Button variant='outline'
                            onClick={() => deleteReview(review?._id, token)}
                            className="bg-transparent border-destructive/50 hover:bg-destructive/20 hover:border-destructive">
                            Delete
                        </Button>
                    </div>
                </div>
                :
                <div className='p-5 border-1 p-4 rounded-2xl grid gap-4 items-center transition-all duration-500 hover:scale-101 hover:shadow-sm hover:bg-primary/10' key={review?._id}>
                    <div className='flex items-center gap-5 justify-between'>
                        <div className='flex items-start gap-3'>
                            <div className=' h-12 w-12 flex items-center justify-center border rounded-4xl bg-primary/35 flex-shrink-0'>
                                <img src="https://notion-avatars.netlify.app/api/avatar/?face=10&nose=13&mouth=17&eyes=9&eyebrows=0&glasses=9&hair=5&accessories=0&details=0&beard=0&halloween=0&christmas=0" alt="Notion Avatar" />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-sm '>{review?.user.name}</span>
                                <div className="flex items-center gap-0.5 ">
                                    {[...Array(5)].map((_, index) => {
                                        if (index + 1 <= review?.rating) {
                                            return <Star key={index} className={`text-amber-600 fill-amber-600`} size={13} />
                                        }
                                        if (review?.rating + 0.5 >= index + 1) {
                                            return <div className="relative " key={index}>

                                                <StarHalf className={`absolute text-amber-600 fill-amber-600`} size={13} />
                                                <Star className={`text-amber-600`} size={13} />
                                            </div>
                                        }
                                        else {
                                            return <Star key={index} className="text-gray-300 " size={13} />
                                        }
                                    })}
                                    <p className='px-2 text-xs text-muted-foreground'>({review?.rating})</p>
                                </div>

                            </div>
                        </div>

                        <div className='flex items-center gap-1'>
                            <Calendar size={13} ></Calendar>

                            <span className='text-xs text-muted-foreground  '>

                                {new Date(review?.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>

                    </div>
                    <div className=''>
                        <p className='text-justify text-sm text-muted-foreground break-all'>{review?.review}</p>
                    </div>
                </div>
            }
        </>

    )
}
