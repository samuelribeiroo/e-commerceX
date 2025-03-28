import { Heart, ShoppingCart, User2 } from "lucide-react";
import { BlogPostsProps, IconProps, ProductCategoriesProps } from "../@types";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const icons: IconProps[] = [
  {
    id: 0,
    link: "/",
    icon: User2,
  },

  {
    id: 1,
    link: "/",
    icon: Heart,
  },

  {
    id: 2,
    link: "/",
    icon: ShoppingCart,
  },
];

const images: Record<string, string | number>[] = [
  {
    id: 0,
    src: "https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2Fbanner.webp?alt=media&token=65b7df86-23c4-411e-8316-f3b69440765d",
    alt: "Banner Offer Image",
  },

  {
    id: 1,
    src: "https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2Flogo.svg?alt=media&token=a1773acf-0100-4ee4-8456-08f39a8e301f",
    alt: "Logo",
  },
];

const productCategories: ProductCategoriesProps[] = [
  {
    id: 1,
    title: "Relógios Digitais",
    discount: 0,
    src: "https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2Fblog%2FNOOTEBOK%252Fstore-card-13-watch-nav-202409-removebg-preview.webp?alt=media&token=32235761-b800-48c5-b849-276ac5df1d69",
    link: "/categories/03d651d1-d45c-46af-a3c4-ca6a2ae05303",
  },
  {
    id: 2,
    title: "Controles",
    discount: 0,
    src: "https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2Fblog%2Fprodutos%252FDualSense-3.webp?alt=media&token=3a067c24-ac9c-4f38-899a-bb3d360241a5",

    link: "",
  },
  {
    id: 3,
    title: "Headphones",
    discount: 0,
    src: "https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2Fblog%2FNOOTEBOK%252FGUEST_2182ce54-420b-439e-ac58-c388467e90ea.webp?alt=media&token=e0d7e4bc-5027-40e2-a3c5-4ab2f1917bf1",
    link: "/categories/cc91fc38-7996-4798-a807-615a7915107c",
  },
];

const slides = [
  {
    id: 1,
    title: "IPHONE 16",
    description:
      "O iPhone 16 foi projetado para a Apple Intelligence, o sistema de inteligência pessoal que ajuda você a escrever, se expressar e fazer de tudo facilmente. ",
    image:
      "https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2Fpromo_iphone16_avail__cl72dn7xdfv6_large.jpg?alt=media&token=d2a91ac1-ab44-44d4-bb70-45be6a66fae0",
  },
  {
    id: 2,
    title: "",
    description: "",
    image:
      "https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2Fiphone-card-50-whyswitch-202209_GEO_BR%20(1).jpg?alt=media&token=cb4497c8-8f84-4efe-bcb2-be5040c218f4",
  },
  {
    id: 3,
    href: "",
    title: "",
    description: "",
    image:
      "https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2F934988e9b7fe9f597ce035caf19167c5.jpg?alt=media&token=cedb79d0-6275-4774-9331-e41039b304db",
  },
  {
    id: 4,
    title: "",
    description: "",
    image:
      "https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2Fairpods-max-select-202409-midnight.png?alt=media&token=f1f96ba0-f2f0-4fd4-b918-bcc0110850a0",
  },
];

const blogPosts: BlogPostsProps[] = [
  {
    id: 1,
    title: "Praesent vestibulum nisi at mollis mollis",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet quam finibus, gravida mi in, fermentum est. Nulla lacinia, orci ac dictum euismod, ligula leo suscipit...",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2Fblog%2Fprodutos%252FblogPost3.webp?alt=media&token=910e9738-2f62-4dad-ac09-27997d9bfddb",
    alt: "Code editor showing programming syntax",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet, consectetur",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet quam finibus, gravida mi in, fermentum est. Nulla lacinia, orci ac dictum euismod, ligula leo suscipit...",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2Fblog%2Fprodutos%252FblogPost1.webp?alt=media&token=51ea39ac-caf1-4119-b0d8-ef1ca1b6a9af",
    alt: "People discussing with laptop",
  },

  {
    id: 2,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet quam finibus, gravida mi in, fermentum est. Nulla lacinia, orci ac dictum euismod, ligula leo suscipit...",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fprodutos%252FblogPost2.webp?alt=media&token=e5af0650-986c-4185-965a-59fb0e78ce94",
    alt: "Laptop with colorful lighting",
  },
];

const services: Record<string, string | number>[] = [
  { title: "Política de Privacidade", id: 0 },
  { title: "Política de Reembolso", id: 1 },
  { title: "Envio e Devolução", id: 2 },
  { title: "Termos e Condições", id: 3 },
  { title: "Pesquisa Avançada", id: 4 },
  { title: "Localizações da Loja", id: 5 },
];

const contact: Record<string, string | number>[] = [
  { text: "Tem alguma dúvida? Ligue para nós 24/7", id: 0 },
  { text: "+55 11 9 9999-9999", id: 1 },
  { text: "Rua: Endereço Fictício, 900. Brasil", id: 2 },
  { text: "desenvolvidoapenas@paraportfolio.com.br", id: 3 },
];

const CACHE_TIME = {
  ONE_WEEK: 7 * 24 * 60 * 60 * 1000,
  THREE_DAYS: 3 * 24 * 60 * 60 * 1000,
  EIGHT_HOURS: 8 * 60 * 60 * 1000,
} as const;

const sortOptions = ["Maior Preço", "Menor Preço", "Nome"];

export {
  icons,
  apiURL,
  images,
  productCategories,
  slides,
  blogPosts,
  services,
  contact,
  CACHE_TIME,
  sortOptions,
};
