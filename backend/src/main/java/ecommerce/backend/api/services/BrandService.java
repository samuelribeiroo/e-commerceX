package ecommerce.backend.api.services;

import ecommerce.backend.api.dto.request.BrandRequestDTO;
import ecommerce.backend.api.dto.response.BrandResponseDTO;
import ecommerce.backend.api.models.products.ProductBrand;
import ecommerce.backend.api.models.products.ProductCategory;
import ecommerce.backend.api.repositories.BrandsRepository;
import ecommerce.backend.api.repositories.CategoriesRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BrandService {

private BrandsRepository brandsRepository;
private CategoriesRepository categoriesRepository;

    public BrandService(BrandsRepository brandsRepository, CategoriesRepository categoriesRepository) {
        this.brandsRepository = brandsRepository;
        this.categoriesRepository = categoriesRepository;
    }

    public ProductBrand createBrand(BrandRequestDTO brand) {
        ProductCategory category = categoriesRepository.findById(brand.getCategoryId()).orElseThrow();

        ProductBrand brands = new ProductBrand();
        brands.setBrandTitle(brand.getName());
        brands.setCategory(category);

        return brandsRepository.save(brands);
    }


    public List<BrandResponseDTO> getBrandsByCategoryId(UUID categoryId) {
        List<ProductBrand> brands = brandsRepository.findByCategoryId(categoryId);

        return brands.stream()
                .map(brand -> new BrandResponseDTO(brand.getId(), brand.getBrandTitle()))
                .toList();
    }
}
