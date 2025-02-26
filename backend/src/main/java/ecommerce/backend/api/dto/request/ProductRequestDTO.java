package ecommerce.backend.api.dto.request;

import ecommerce.backend.api.models.products.ProductBrand;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;



import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public class ProductRequestDTO {
    @NotBlank
    @Size(max = 100, message = "O título deve ter até 100 caracteres")
    private String productTitle;

    @NotNull(message = "O preço é obrigatório")
    @DecimalMin(message = "O preço deve ser maior que zero", value = "0.0", inclusive = false)
    private BigDecimal productPrice;

    @NotBlank
    @Size(max = 500, message = "A descrição deve ter até 500 caracteres")
    private String productDescription;

    @NotNull(message = "É obrigatório conter o ID da marca relacionada")
    private UUID brandId;

    @Size(message = "Devem ser enviadas exatamente 3 URLs de imagem", min = 3, max = 3)
    private List<ProductImageDTO> imageUrls;

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public UUID getBrandId() {
        return brandId;
    }

    public void setBrandId(UUID brandId) {
        this.brandId = brandId;
    }

    public List<ProductImageDTO> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<ProductImageDTO> imageUrls) {
        this.imageUrls = imageUrls;
    }
}
