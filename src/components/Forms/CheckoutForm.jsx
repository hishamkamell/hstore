import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { User2Icon, CreditCardIcon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Button } from '../ui/button'
import { toast } from 'sonner'
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export default function CheckoutForm({ paymentMethod, setPaymentMethod, isLoading, totalPrice, placeOrderHandler }) {
    const checkoutSchema = z.object({
        details: z.string().min(5, "Name must be at least 5 characters"),
        phone: z.string("Name must be at least 2 characters")
            .refine((value) => ((value.startsWith('0') && value.length === 11) || (value.startsWith('+20') && value.length === 13)),
                'invalid phone number (must start with 0 and have 11 digits)'),
        city: z.string().min(2, "Name must be at least 2 characters"),
    })
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(checkoutSchema),
        mode: "onBlur"
    })
    function onSubmitHandler(data) {
        setUserDetails(data)
        toast.success('Order placed successfully')
    }
    return (
        <>
            <form onSubmit={handleSubmit(placeOrderHandler)} className='grid gap-4 grid-cols-1 items-end'>
                <Accordion multiple defaultValue={["item-2", "item-1"]} className="rounded-lg border">
                    <AccordionItem value="item-2">
                        <AccordionTrigger> <div className='flex gap-2 items-center'>
                            <User2Icon className="text-primary" />
                            <span className='text-xl text-primary font-jetbrains font-semibold '>Contact Details</span>
                        </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4">

                            <div className='flex flex-col gap-2'>
                                <Label htmlFor='phone'>Phone number</Label>
                                <Input
                                    {...register('phone')}
                                    id='phone'
                                    type='tel'
                                    placeholder='+20 123 456 7890'
                                    className='h-9'
                                />
                                {errors.phone && <p className='text-xs text-red-500'>{errors.phone.message}</p>}
                            </div>
                            <div className='grid gap-4 '>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor='city'>City</Label>
                                    <Input
                                        {...register('city')}
                                        id='city'
                                        placeholder='Cairo'
                                    />
                                    {errors.city && <p className='text-xs text-red-500'>{errors.city.message}</p>}
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor='details'>Address Details</Label>
                                <Input
                                    {...register('details')}
                                    id='details'
                                    type='text'
                                    placeholder='street, building, floor, apartment'
                                />
                                {errors.details && <p className='text-xs text-red-500'>{errors.details.message}</p>}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-1" className="">
                        <AccordionTrigger>
                            <div className='flex gap-2 items-center'>
                                <CreditCardIcon className="text-primary" />
                                <span className='text-xl text-primary font-jetbrains font-semibold '>Payment Details</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>

                            <RadioGroup
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                                defaultValue="credit" className="max-w-full">
                                <FieldLabel htmlFor="credit">
                                    <Field orientation="horizontal">
                                        <RadioGroupItem value="credit" id="credit" />
                                        <FieldContent >
                                            <div className="flex gap-3 items-center justify-between">

                                                <FieldTitle>Credit/Debit Cards</FieldTitle>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                                </svg>
                                            </div>
                                        </FieldContent>
                                    </Field>
                                </FieldLabel>
                                <FieldLabel htmlFor="cash">
                                    <Field orientation="horizontal">
                                        <RadioGroupItem value="cash" id="cash" />
                                        <FieldContent>
                                            <div className="flex gap-3 items-center justify-between">
                                                <FieldTitle>Cash on Delivery</FieldTitle>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                                </svg>
                                            </div>
                                        </FieldContent>
                                    </Field>
                                </FieldLabel>
                            </RadioGroup>                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
                <Button disabled={isLoading || !totalPrice || paymentMethod === ''} type="submit">{!isLoading ? <div>Checkout</div> : <><Spinner size={20} /> <span>...Loading</span></>}</Button>

            </form>




        </>
    )
}
