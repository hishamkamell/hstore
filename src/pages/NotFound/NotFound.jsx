import { Button } from "@/components/ui/button"
import notfound from "@/assets/error.svg"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div>
            <section className="bg-background section-padding-y" aria-labelledby="error-title">
                <div
                    className="container-padding-x relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
                    <div
                        className="mx-auto flex max-w-xl flex-1 flex-col items-center gap-6 text-center lg:gap-8">
                        <div className="section-title-gap-xl flex flex-col items-center text-center">
                            <h1 id="error-title" className="text-6xl font-bold">
                                Page not found
                            </h1>
                            <p className="text-muted-foreground text-sm text-pretty">
                                Sorry, we couldn't find the page you're looking for. Please check
                                the URL or navigate back home.
                            </p>
                        </div>
                        <img src={notfound} alt="" className="w-lg " />
                        <Link to="/">
                            <Button variant="default" >Go to homepage</Button>

                        </Link>

                    </div>
                </div>
            </section>
        </div>
    )
}
