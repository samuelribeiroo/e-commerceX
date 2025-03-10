package ecommerce.backend.api.repositories;

import ecommerce.backend.api.models.products.ProductBrand;
import ecommerce.backend.api.models.products.ProductCategory;
import ecommerce.backend.api.models.products.ProductModel;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductsRepository extends JpaRepository<ProductModel, UUID> {
    List<ProductModel> findByProductTitleContainingIgnoreCase(String searchTerm);

  @Query(value = """
     SELECT p.* FROM products p
     INNER JOIN brands b ON p.brand_id = b.id
     INNER JOIN categories c ON b.category_id = c.id
     WHERE c.category = :categoryName
     ORDER BY RANDOM()
     LIMIT :limit
    
     """, nativeQuery = true)
    List<ProductModel> findRandomProducts(@Param("categoryName") String categoryName, @Param("limit") int limit);


}
