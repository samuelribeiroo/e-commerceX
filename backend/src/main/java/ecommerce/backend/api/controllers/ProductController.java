package ecommerce.backend.api.controllers;

import ecommerce.backend.api.dto.request.ProductRequestDTO;
import ecommerce.backend.api.models.products.ProductModel;
import ecommerce.backend.api.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<ProductModel> createProduct(@Valid @RequestBody ProductRequestDTO products) {
        ProductModel savedProduct = productService.createProduct(products);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    @GetMapping
    public ResponseEntity<List<ProductModel>> getAllProducts() {
        List<ProductModel> products = productService.listAllProducts();

        return ResponseEntity.ok().body(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProductModel>> getCategoryById(@PathVariable UUID id) {
        Optional<ProductModel> category = productService.listProductById(id);

        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteProduct(@PathVariable UUID id) {
        productService.deleteProductById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(MessageFormat.format("Deletado Produto: {0}", id));
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductModel>> searchProductByName(
            @RequestParam(name = "search", required = false) String searchTerm) {
        List<ProductModel> searchedProduct = productService.searchProducts(searchTerm);
        return ResponseEntity.ok(searchedProduct);
    }
}
