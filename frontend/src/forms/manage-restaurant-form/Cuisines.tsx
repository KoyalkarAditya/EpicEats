import { useFormContext } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { cuisineList } from "../../config/RestaurentOptions";
import CuisineCheckBox from "./CuisineCheckBox";

const Cuisines = () => {
  const { control } = useFormContext();
  return (
    <div className=" space-y-2">
      <div>
        <h2 className=" text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        name="cuisines"
        control={control}
        render={({ field }) => (
          <FormItem>
            <div className=" grid md:grid-cols-5 gap-1">
              {cuisineList.map((cuisine, index) => (
                <CuisineCheckBox key={index} cuisine={cuisine} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Cuisines;
