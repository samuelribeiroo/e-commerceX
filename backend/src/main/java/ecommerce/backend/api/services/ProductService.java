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

import java.util.*;

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

    public List<ProductModel> getRandomDiverseProducts(String firstCategoryName, String secondCategoryName, int firstCategoryCount, int secondCategoryCount) {
        List<ProductModel> products = new ArrayList<>();


        List<ProductModel> firstCategoryProducts = Optional.ofNullable(productsRepository.findRandomProducts(
                firstCategoryName,
                firstCategoryCount
        )).orElseGet(Collections::emptyList);


        List<ProductModel> secondCategoryProducts = Optional.ofNullable(productsRepository.findRandomProducts(
                secondCategoryName,
                secondCategoryCount
        )).orElseGet(Collections::emptyList);

        products.addAll(firstCategoryProducts);
        products.addAll(secondCategoryProducts);

        Collections.shuffle(products);

        return products;
    }

}
