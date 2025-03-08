package ecommerce.backend.api.services;

import ecommerce.backend.api.dto.request.ProductRequestDTO;
import ecommerce.backend.api.interfaces.IProductService;
import ecommerce.backend.api.models.products.ProductBrand;
import ecommerce.backend.api.models.products.ProductCategory;
import ecommerce.backend.api.models.products.ProductImage;
import ecommerce.backend.api.models.products.ProductModel;
import ecommerce.backend.api.repositories.BrandsRepository;
import ecommerce.backend.api.repositories.CategoriesRepository;
import ecommerce.backend.api.repositories.ProductsRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService implements IProductService {
    private ProductsRepository productsRepository;
    private BrandsRepository brandsRepository;
    private CategoriesRepository categoriesRepository;

    public ProductService(ProductsRepository productsRepository, BrandsRepository brandsRepository,  CategoriesRepository categoriesRepository) {
        this.productsRepository = productsRepository;
        this.brandsRepository = brandsRepository;
        this.categoriesRepository = categoriesRepository;
    }

    @Transactional
    public ProductModel createProduct(ProductRequestDTO productRequest) {
        ProductBrand brand = brandsRepository.findById(productRequest.getBrandId())
                .orElseThrow(() -> new IllegalArgumentException("Marca não encontrada"));

        ProductModel product = new ProductModel();
        product.setProductTitle(productRequest.getProductTitle());
        product.setProductPrice(productRequest.getProductPrice());
        product.setProductDescription(productRequest.getProductDescription());
        product.setProductBrand(brand);

        List<ProductImage> images = productRequest.getImageUrls().stream()
                .map(imageDTO -> {
                    ProductImage image = new ProductImage();
                    image.setImageURL(imageDTO.getImageURL());
                    image.setImageOrder(imageDTO.getImageOrder());
                    image.setProduct(product);

                    return image;
                }).toList();

        product.setImages(images);


        return productsRepository.save(product);

    }

    public List<ProductModel> listAllProducts() {
        return productsRepository.findAll();
    }

    public Optional<ProductModel> listProductById(UUID id) {
        return productsRepository.findById(id);
    }

    public void deleteProductById(UUID id) {
      productsRepository.deleteById(id);
    }

    public List<ProductModel> searchProducts(String searchTerm) {
        if (searchTerm.isEmpty()) {
            return productsRepository.findAll();
        }
        return productsRepository.findByProductTitleContainingIgnoreCase(searchTerm);
    }

    public List<ProductModel> getRandomDiverseProducts(List<String> categoryNames, int limit) {
        List<ProductCategory> categories = categoriesRepository.findByCategoryNames(categoryNames);

        List<ProductModel> products = new ArrayList<>();
        int cycles = 0;
        int maxCycles = 10;

        while (hasReachedProductLimit(products, limit) && hasNotReachedMaxCycles(cycles, maxCycles)) {
            for (ProductCategory category : categories) {
                Optional<ProductModel> randomProducts = fetchRandomProductFromCategory(category);

               randomProducts.ifPresent(products::add);

                if (hasReachedProductLimit(products, limit)) break;

            }
            cycles++;
        }
        return products;
    }

    public boolean hasReachedProductLimit(List<ProductModel> product, int limit) {
        return product.size() < limit;
    }

    public boolean hasNotReachedMaxCycles(int cycles, int maxCycles) {
        return cycles < maxCycles;
    }

    public Optional<ProductModel> fetchRandomProductFromCategory(ProductCategory category) {
        List<ProductModel> randomProducts = productsRepository.findRandomProducts(
                category.getId(),
                2
        );

        return randomProducts.isEmpty() ? Optional.empty() : Optional.ofNullable(randomProducts.get(0));

    }
}
