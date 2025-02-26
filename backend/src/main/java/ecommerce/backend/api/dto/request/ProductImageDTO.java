package ecommerce.backend.api.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotBlank;

public class ProductImageDTO {

    @NotNull(message = "A lista de imagens é obrigatória")
    @NotBlank(message = "A URL da imagem é obrigatória")
    private String imageURL;

    @NotNull(message = "A ordem da imagem é obrigatória")
    @Min(value = 1, message = "A ordem deve ser maior ou igual a 1")
    private Integer imageOrder;

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Integer getImageOrder() {
        return imageOrder;
    }

    public void setImageOrder(Integer imageOrder) {
        this.imageOrder = imageOrder;
    }
}
