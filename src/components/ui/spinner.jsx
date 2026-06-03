import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"
import { CircleDashedIcon } from "lucide-react"

function Spinner({
  className,
  ...props
}) {
  return (
    <CircleDashedIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin ", className)}
      {...props} />
  );
}

export { Spinner }
