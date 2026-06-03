import {
    TruckElectric,
    ShieldCheck,
    HeadsetIcon,
} from "lucide-react";

const features = [
    {
        title: "Free Shipping",
        description:
            "Enjoy fast and reliable delivery with no extra shipping costs on qualifying purchases.",
        icon: TruckElectric,
    },
    {
        title: "Secure Payment",
        description:
            "Shop with confidence using our protected payment system and encrypted transactions.",
        icon: ShieldCheck,
    },
    {
        title: "24/7 Customer Support",
        description:
            "Our dedicated team is available to help with any questions before or after your purchase.",
        icon: HeadsetIcon,
    },
];

export default function Features() {
    return (
        <div>
            <div className="mx-auto flex max-w-7xl flex-col px-6 py-25 gap-5">
                <div>
                    <h2
                        className="text-pretty text-center font-semibold text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
                        Why Shop With Us?
                    </h2>
                    <p
                        className="mt-3 text-center text-muted-foreground text-xl -tracking-[0.01em] sm:text-lg">
                        Everything you need for a secure, convenient, and enjoyable shopping experience.
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            className="rounded-xl border border-border/80 bg-card p-6 shadow-xs/3 hover:bg-primary/5 transition-all duration-300"
                            key={index}>
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/7 text-primary dark:bg-primary/10">
                                    <feature.icon className="h-5 w-5" />
                                </div>
                                <h3 className="font-medium text-lg tracking-[-0.005em] ">
                                    {feature.title}
                                </h3>
                            </div>
                            <p className="mt-4 text-foreground/80 ">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
