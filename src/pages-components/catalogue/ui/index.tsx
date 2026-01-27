import classes from "./catalogue-page.module.scss";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import CategoriesSwiper from "~/src/features/categories/ui/swiper/ui";
import ProductsFilters from "~/src/features/filters/ui";
import CatalogueSection from "~/src/entities/catalogue-section/ui";

export default function CataloguePage() {
  return (
    <PageWrapper>
      <CategoriesSwiper
        title={`Каталог этикеток`}
        type="catalogue"
        className={classes.categories}
      />
      <div className={`flex-row gap-5 flex-start`}>
        <ProductsFilters className={classes.filters} />
        <CatalogueSection />
      </div>
    </PageWrapper>
  );
}
