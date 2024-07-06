import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const ImageSection = () => {
  const { control, watch } = useFormContext();
  const existingImageUrl = watch("imageURL");
  return (
    <div className=" space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an Image that will be displayed on your restaurant listing in the
          search results.Adding the new Image will overwrite the existing one
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 md:w-[50%]">
        {existingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImageUrl}
              className=" rounded-md h-full w-full object-cover"
            />
          </AspectRatio>
        )}

        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
