import { useParams } from "react-router-dom";
import { useGetRestaurant } from "../api/RestaurantApi";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "../components/RestaurantInfo";
import MenuItem from "../components/MenuItem";
import { useState } from "react";
import { Card, CardFooter } from "../components/ui/card";
import OrderSummary from "../components/OrderSummary";
import { MenuItem as MenuItemType } from "../types";
import CheckoutButton from "../components/CheckoutButton";
import { UserFormData } from "../forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "../api/OrderApi";
import { toast } from "sonner";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevState) => {
      const existingCartItem = prevState.find(
        (item) => item._id == menuItem._id
      );
      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevState.map((cartItem) =>
          cartItem._id == menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevState,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: Number(menuItem.price),
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const removeFromCart = (itemTORemove: CartItem) => {
    const updatedCartItems = cartItems.filter(
      (item) => item._id != itemTORemove._id
    );
    sessionStorage.setItem(
      `cartItems-${restaurantId}`,
      JSON.stringify(updatedCartItems)
    );
    setCartItems(updatedCartItems);
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };
    const data = await createCheckoutSession(checkoutData);

    toast.message("data:" + JSON.stringify(data));
    console.log("data is" + JSON.stringify(data));
    window.location.href = data.stripeUrl;
  };

  if (isLoading || !restaurant) {
    return "Loading....";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageURL}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-3 md:px-32 gap-5">
        <div className="flex flex-col gap-4 col-span-2">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          </Card>
          <CardFooter>
            <CheckoutButton
              disabled={cartItems.length == 0}
              onCheckout={onCheckout}
              isLoading={isCheckoutLoading}
            />
          </CardFooter>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
