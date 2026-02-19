import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

export default function SharedSubmitButton({
  isAdvancedForm,
}: {
  isAdvancedForm: boolean;
}) {
  const { handleSubmit } = useFormContext();
  function onSubmit(data: any) {
    if (isAdvancedForm) {
      console.log("advanced form data: ", data);
    } else {
      console.log("basic form  data: ", data);
    }
  }
  return (
    <Button className="flex-1" type="submit" onClick={handleSubmit(onSubmit)}>
      Save
    </Button>
  );
}
