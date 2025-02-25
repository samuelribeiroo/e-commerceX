package ecommerce.backend.api.interfaces;

import ecommerce.backend.api.dto.request.CategoryRequestDTO;
import ecommerce.backend.api.models.products.ProductCategory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ICategoryService {
    ProductCategory createCategory(CategoryRequestDTO category);

    List<ProductCategory> listAllCategories();

    Optional<ProductCategory> listCategoryById(UUID id);

}
