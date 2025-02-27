import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type Category = {
  id: number;
  name: string;
}

export type NavigationGeneralProps = {
  categories: Category[]
}

export type MobileMenuProps = NavigationGeneralProps  & {
  openMenu: (value: boolean) => void;
  isOpen: boolean;
};

export type IconProps = {
  id: number;
  link: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  added?: number;
};

export interface NavigationContentProps {
  icons: IconProps[];
}