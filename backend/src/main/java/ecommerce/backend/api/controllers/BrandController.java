package ecommerce.backend.api.controllers;

import ecommerce.backend.api.dto.request.BrandRequestDTO;
import ecommerce.backend.api.dto.response.BrandResponseDTO;
import ecommerce.backend.api.models.products.ProductBrand;
import ecommerce.backend.api.services.BrandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/brand")
public class BrandController {

    @Autowired
    private BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @PostMapping
    public ResponseEntity<ProductBrand> createBrand(@Valid @RequestBody BrandRequestDTO  brand) {
        ProductBrand savedBrand = brandService.createBrand(brand);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedBrand);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<List<BrandResponseDTO>> getBrandsByCategoryId(@PathVariable UUID categoryId) {
        List<BrandResponseDTO> brands = brandService.getBrandsByCategoryId(categoryId);

        return ResponseEntity.status(HttpStatus.OK).body(brands);
    }
}
