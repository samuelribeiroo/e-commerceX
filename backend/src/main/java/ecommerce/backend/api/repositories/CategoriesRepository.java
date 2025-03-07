package ecommerce.backend.api.repositories;

import ecommerce.backend.api.models.products.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CategoriesRepository extends JpaRepository<ProductCategory, UUID> {
    @Query("SELECT c FROM categories c WHERE c.name IN :names")
    List<ProductCategory> findByCategoryNames(@Param("names") List<String> names);
}
