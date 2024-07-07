import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "../api/MyRestaurantApi";
import ManageRestaurantForm from "../forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { restaurant, isLoading: isGetRestaurantLoading } =
    useGetMyRestaurant();
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const isEditing = !!restaurant;
  if (isGetRestaurantLoading) {
    return <>Loading.....</>;
  }
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      isLoading={isCreateLoading || isUpdateLoading}
      onSave={isEditing ? updateRestaurant : createRestaurant}
    />
  );
};

export default ManageRestaurantPage;
