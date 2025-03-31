import LatestPosts from "./blog-posts";
import OfferComponent from "./offer";
import AsideCategories from "../components/ui/aside-categories";
import { MainContainer as Container } from "../components/ui/main-container";
import PromoBanner from "../components/ui/main-deals-ui";
import ProductCategoryCards from "../components/ui/product-category-highlights";
import TodayDeals from "../components/ui/today-deals-ui";
import TopSellingProducts from "../components/ui/top-selling";


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
