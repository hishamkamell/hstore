import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getReviews } from '@/Services/reviews'
import ReviewsForm from '../ReviewsForm/ReviewsForm'
import ReviewsCard from './ReviewsCard'

export default function Reviews({ id }) {


    const { data: reviews } = useQuery({
        queryKey: ["productReviews"],
        queryFn: () => getReviews(id)
    })

    return (
        <div className='pt-20'>
            <div className='mb-12 text-center'>
                <h1 className='text-3xl font-bold'>Customer Reviews
                </h1>
                <p className='text-muted-foreground mx-auto mt-2 max-w-2xl'>Read what our customers have to say about their experience with our products and services.

                </p>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 flex-col gap-3 justify-center pb-10'>
                {reviews?.map((review) => (
                    <ReviewsCard review={review} key={review._id} />
                ))}
            </div>
            <ReviewsForm id={id} />

        </div >
    )
}
