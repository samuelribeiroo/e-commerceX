package ecommerce.backend.api.dto.response;


import java.util.UUID;

public class BrandResponseDTO {
    private UUID id;
    private String name;

    public BrandResponseDTO(UUID id, String name) {
        this.id = id;
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
