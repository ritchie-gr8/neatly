import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";

const HandoffButton = ({ onClick, label = "Contact Admin", className = "" }) => {
  return (
    <Button
      className={`btn-outline mt-2 text-primary ${className}`}
      onClick={onClick}
    >
      <MessageCircleMore className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
};

export default HandoffButton;
