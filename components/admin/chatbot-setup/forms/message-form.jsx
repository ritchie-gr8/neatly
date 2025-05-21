import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MessageForm = ({className, mode}) => {
  return (
    <div className={className}>
      <Label htmlFor="message" className="mb-1">
        Message
      </Label>
      <Textarea id="message" className="bg-util-white h-24" disabled={mode === "view"} />
    </div>
  )
}

export default MessageForm
