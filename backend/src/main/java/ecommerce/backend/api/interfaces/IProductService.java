package ecommerce.backend.api.interfaces;

import ecommerce.backend.api.dto.request.ProductRequestDTO;
import ecommerce.backend.api.models.products.ProductModel;

import java.util.*;

public interface IProductService {
    ProductModel createProduct(ProductRequestDTO productRequest);

    List<ProductModel> listAllProducts();

    Optional<ProductModel> listProductById(UUID id);

    void deleteProductById(UUID id);

    List<ProductModel> searchProducts(String searchTerm);

    List<ProductModel> getRandomDiverseProducts(List<String> categoryNames, int limit);

}
