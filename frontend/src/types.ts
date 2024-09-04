export type User = {
  _id: string;
  email: string;
  name: string;
  city: string;
  country: string;
  addressLine1: string;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: string;
  estimatedDeliveryPrice: string;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};
type MenuItem = {
  _id: string;
  name: string;
  price: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
