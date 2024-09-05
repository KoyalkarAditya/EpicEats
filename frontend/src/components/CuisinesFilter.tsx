import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cuisineList } from "../config/RestaurentOptions";
import { Label } from "./ui/label";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpendedClick: () => void;
};

const CuisinesFilter = ({
  onChange,
  selectedCuisines,
  onExpendedClick,
  isExpanded,
}: Props) => {
  const handleResetCuisines = () => onChange([]);
  const handleCuisinesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;
    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);
    onChange(newCuisinesList);
  };

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter by Cuisines</div>
        <div
          onClick={() => handleResetCuisines}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-green-500 "
        >
          Reset Filters
        </div>
      </div>
      <div className="spacey-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine, index) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex">
                <input
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  id={`${cuisine}${index}`}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`${cuisine}${index}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          variant={"link"}
          className="mt-4 flex-1"
          onClick={onExpendedClick}
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisinesFilter;
