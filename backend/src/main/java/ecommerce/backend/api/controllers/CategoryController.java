package ecommerce.backend.api.controllers;

import ecommerce.backend.api.dto.request.CategoryRequestDTO;
import ecommerce.backend.api.models.products.ProductCategory;
import ecommerce.backend.api.services.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ProductCategory> createCategory(@Valid @RequestBody CategoryRequestDTO categoryRequest) {
        ProductCategory savedCategory = categoryService.createCategory(categoryRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    @GetMapping
    public ResponseEntity<List<ProductCategory>> getAllCategories() {
        List<ProductCategory> categories = categoryService.listAllCategories();

        return ResponseEntity.ok().body(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProductCategory>> getCategoryById(@PathVariable  UUID id) {
       Optional<ProductCategory> category = categoryService.listCategoryById(id);

        return ResponseEntity.ok(category);
    }
}
