package ecommerce.backend.api.services;

import ecommerce.backend.api.dto.request.CategoryRequestDTO;
import ecommerce.backend.api.interfaces.ICategoryService;
import ecommerce.backend.api.models.products.ProductCategory;
import ecommerce.backend.api.repositories.CategoriesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService implements ICategoryService {

    private final CategoriesRepository categoriesRepository;

    public CategoryService(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }


    public ProductCategory createCategory(CategoryRequestDTO category) {
        ProductCategory productCategory = new ProductCategory();

        productCategory.setName(category.getName());

        return categoriesRepository.save(productCategory);
    }

    public List<ProductCategory> listAllCategories() {
        return categoriesRepository.findAll();
    }

    public Optional<ProductCategory> listCategoryById(UUID id) {
        return categoriesRepository.findById(id);
    }

}
