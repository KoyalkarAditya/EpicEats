import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "../api/MyRestaurantApi";
import OrderItemCard from "../components/OrderItemCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import ManageRestaurantForm from "../forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { restaurant, isLoading: isGetRestaurantLoading } =
    useGetMyRestaurant();
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const { orders, isLoading: isGetMyRestaurantOrdersLoading } =
    useGetMyRestaurantOrders();
  const isEditing = !!restaurant;
  if (isGetRestaurantLoading || isGetMyRestaurantOrdersLoading) {
    return <>Loading.....</>;
  }
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 pg-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order, index) => (
          <OrderItemCard key={index} order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          isLoading={isCreateLoading || isUpdateLoading}
          onSave={isEditing ? updateRestaurant : createRestaurant}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
