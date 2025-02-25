package ecommerce.backend.api.interfaces;

import ecommerce.backend.api.dto.request.BrandRequestDTO;
import ecommerce.backend.api.dto.response.BrandResponseDTO;
import ecommerce.backend.api.models.products.ProductBrand;

import java.util.List;
import java.util.UUID;

public interface IBrandService {
    ProductBrand createBrand(BrandRequestDTO brand);

    List<BrandResponseDTO> getBrandsByCategoryId(UUID categoryId);
}
