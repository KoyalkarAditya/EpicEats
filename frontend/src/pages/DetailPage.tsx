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
  if (isLoading || !restaurant) {
    return "Loading....";
  }

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
            <CheckoutButton />
          </CardFooter>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
