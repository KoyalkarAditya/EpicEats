import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "../api/MyRestaurantApi";
import ManageRestaurantForm from "../forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { restaurant, isLoading: getRestaurantLoading } = useGetMyRestaurant();
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  if (getRestaurantLoading) {
    return <>Loading.....</>;
  }
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      isLoading={isLoading}
      onSave={createRestaurant}
    />
  );
};

export default ManageRestaurantPage;
