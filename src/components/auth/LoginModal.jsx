import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { LoginForm } from "../Forms/login-form"

export default function LoginModal({ btn }) {
    return (

        <Dialog>

            <DialogTrigger render={btn}>
            </DialogTrigger>
            <DialogContent >
                <LoginForm></LoginForm>
            </DialogContent>
        </Dialog>

    )
}
