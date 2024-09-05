import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from ".././components/ui/dropdown-menu";
import { Button } from "./ui/button";

type Props = {
  onChange: (sortOption: string) => void;
  sortOption: string;
};
const SORT_OPTIONS = [
  {
    name: "estimatedDeliveryTime",
    label: "Estimated Delivery Time",
  },
  {
    name: "deliveryPrice",
    label: "Delivery Price",
  },
  {
    name: "bestMatch",
    label: "Best Match",
  },
];

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
  const selectedSortOptionLabel =
    SORT_OPTIONS.find((option) => option.name == sortOption)?.label ||
    SORT_OPTIONS[0].label;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer ml-5 ">
          <Button variant={"secondary"}>
            Sorted By {selectedSortOptionLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onChange(option.name)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SortOptionDropdown;
