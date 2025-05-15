import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const OptionForm = ({ className }) => {
  return (
    <div className={className}>
      <Label htmlFor="option" className="mb-1">
        Option
      </Label>
      <Textarea id="option" className="bg-util-white h-24" />
    </div>
  );
};

export default OptionForm;
