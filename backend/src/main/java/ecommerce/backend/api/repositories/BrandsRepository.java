package ecommerce.backend.api.repositories;

import ecommerce.backend.api.dto.response.BrandResponseDTO;
import ecommerce.backend.api.models.products.ProductBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.*;

public interface BrandsRepository extends JpaRepository<ProductBrand, UUID> {
    List<ProductBrand> findByCategoryId(UUID categoryId);
}
