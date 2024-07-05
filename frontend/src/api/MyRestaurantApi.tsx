import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestaurantRequest = async (
    RestaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: RestaurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    return response.json();
  };
  const {
    mutateAsync: createRestaurant,
    isSuccess,
    isLoading,
    error,
  } = useMutation(createMyRestaurantRequest);
  if (isSuccess) {
    toast.success("Restaurant created!");
  }
  if (error) {
    toast.error("Unable to update restaurant");
  }
  return { createRestaurant, isLoading };
};
