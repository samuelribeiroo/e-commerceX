import { LucideProps } from "lucide-react";
import {
  ForwardRefExoticComponent,
  PropsWithChildren,
  ReactNode,
  RefAttributes,
  TouchEventHandler,
} from "react";
import { CART_ACTIONS } from "../contexts/cartReducer";

export type Category = {
  id: number;
  name: string;
};

export type NavigationGeneralProps = {
  categories: Category[];
};

export type MobileMenuProps = NavigationGeneralProps & {
  openMenu: (value: boolean) => void;
  isOpen: boolean;
};

export interface NavigationContentProps {
  icons: IconProps[];
}

export type IconProps = {
  id: number;
  link: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  added?: number;
};

export interface Brand {
  id: string;
  name: string;
  products: Product[];
}

export interface Product {
  id: string;
  productTitle: string;
  productPrice: number;
  productDescription: string;
  productBrand?: { name: string };
  images: Array<{ imageURL: string }>;
  brandId: string;
  quantity?: number;
}

export type ProductImage = Product & {
  src: string;
  alt: string;
};

export interface ProductImagePropsWithOrder {
  id: string;
  alt?: string;
  imageURL: string;
  image_order: number;
}

export type ContentCardProps = PropsWithChildren<{
  title: string;
  description: string;
  price: number;
}>;

export type CarouselContentProps = PropsWithChildren<{
  start: TouchEventHandler<HTMLDivElement> | undefined;
  move: TouchEventHandler<HTMLDivElement> | undefined;
  end: TouchEventHandler<HTMLDivElement> | undefined;
}>;

export type ControlSlideProps = {
  prev: VoidFunction;
  next: VoidFunction;
};

export type CarouselImageProps = PropsWithChildren<{
  id: number;
  index: number;
  slide: number;
  image: string;
  title: string;
}>;

export type ProductFilterProps = {
  priceFrom: string;
  priceTo: string;
  onPriceFromChange: (value: string) => void;
  onPriceToChange: (value: string) => void;
};

export type PriceFilterProps = {
  priceFrom: string;
  priceTo: string;
  onPriceFromChange: (value: string) => void;
  onPriceToChange: (value: string) => void;
};

export interface UsePriceFilterProps {
  initialProducts: Product[];
}

export type ProductCategoriesProps = {
  id: number;
  title: string;
  discount?: number;
  src: string;
  link: string;
};

export type BlogPostsProps = {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  alt: string;
};

export type Post = BlogPostsProps & {};

export type CacheableItem = {
  timestamp: number;
  data: any;
};

export enum ORDER_BY {
  HIGHEST = "Maior Preço",
  LOWEST = "Menor Preço",
  NAME = "Nome",
}

export type SellingPropsType = PropsWithChildren<{
  text?: string;
}>;

export type SortTypeProps = {
  activeSort: string;
  onSortChange: (sort: string) => void;
};

export type ProductPageProps = PropsWithChildren<{
  title: string;
}>;

export type ProductCategoryViewProps = {
  initialBrands: Brand[];
  initialProducts: Product[];
};

export type CartItem = Product & {
  title?: string;
  id: string;
  quantity: number | string;
};

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: string) => void;
  cartCount: number;
};

export type CartProviderProps = {
  children?: ReactNode;
};

export interface CartState {
  products: CartItem[];
  isCartOpen?: boolean;
}

export type CartAction =
  | { type: CART_ACTIONS.ADD; payload: Product }
  | { type: CART_ACTIONS.REMOVE; payload: string | number }
  | { type: CART_ACTIONS.INCREASE; payload: string | number }
  | { type: CART_ACTIONS.DECREASE; payload: string | number }
  | { type: CART_ACTIONS.CACHE; payload: CartItem[] }
  | { type: CART_ACTIONS.SHOW_CART; payload: null };

export interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}
