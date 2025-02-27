package ecommerce.backend.api.repositories;

import ecommerce.backend.api.models.products.ProductBrand;
import ecommerce.backend.api.models.products.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductsRepository extends JpaRepository<ProductModel, UUID> {
    List<ProductModel> findByProductTitleContainingIgnoreCase(String searchTerm);
}
