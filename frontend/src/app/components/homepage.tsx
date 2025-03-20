import LatestPosts from "./blog-posts";
import OfferComponent from "./offer";
import AsideCategories from "./ui/aside-categories";
import { MainContainer as Container } from "./ui/main-container";
import PromoBanner from "./ui/main-deals-ui";
import ProductCategoryCards from "./ui/product-category-highlights";
import TodayDeals from "./ui/today-deals-ui";
import TopSellingProducts from "./ui/top-selling";


export default function HomePage() {
  return (
    <>
      <Container>
        <AsideCategories />
        <ProductCategoryCards />
        <TodayDeals />
        <PromoBanner />
        <TopSellingProducts title={"Mais Vendidos"} />
        <LatestPosts />
        <OfferComponent />
      </Container>
    </>
  );
}
