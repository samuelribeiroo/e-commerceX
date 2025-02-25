    package ecommerce.backend.api.models.products;

    import com.fasterxml.jackson.annotation.JsonBackReference;
    import jakarta.persistence.*;
    import jakarta.validation.constraints.NotBlank;

    import java.util.ArrayList;
    import java.util.List;
    import java.util.UUID;

    @Entity(name = "brands")
    public class ProductBrand {

        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID id;

        @Column(name = "brand", nullable = false, length = 100)
        @NotBlank
        private String name;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "category_id", nullable = false)
        @JsonBackReference
        private ProductCategory category;

        @OneToMany(mappedBy = "productBrand", cascade = CascadeType.ALL)
        private List<ProductModel> products = new ArrayList<>();

        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
            this.id = id;
        }

        public String getBrandTitle() {
            return name;
        }

        public void setBrandTitle(String name) {
            this.name = name;
        }

        public ProductCategory getCategory() {
            return category;
        }

        public void setCategory(ProductCategory category) {
            this.category = category;
        }

        public List<ProductModel> getProducts() {
            return products;
        }

        public void setProducts(List<ProductModel> products) {
            this.products = products;
        }
    }
