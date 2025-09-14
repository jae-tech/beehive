import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { InventoryService } from "./inventory.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";

@ApiTags("inventory")
@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post("products")
  @ApiOperation({ summary: "상품 등록", description: "새로운 상품을 재고에 등록합니다" })
  @ApiResponse({ status: 201, description: "상품이 성공적으로 등록되었습니다" })
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.inventoryService.createProduct(createProductDto);
  }

  @Get("products")
  @ApiOperation({ summary: "상품 목록 조회", description: "모든 상품 목록을 조회합니다" })
  @ApiResponse({ status: 200, description: "상품 목록 조회 성공" })
  @ApiQuery({ name: "category", required: false, description: "카테고리별 필터링" })
  @ApiQuery({ name: "lowStock", required: false, description: "재고 부족 상품만 조회" })
  findAllProducts(@Query("category") category?: string, @Query("lowStock") lowStock?: boolean) {
    return this.inventoryService.findAllProducts(category, lowStock);
  }

  @Get("products/:id")
  @ApiOperation({ summary: "상품 상세 조회", description: "특정 상품의 상세 정보를 조회합니다" })
  @ApiResponse({ status: 200, description: "상품 정보 조회 성공" })
  findOneProduct(@Param("id") id: string) {
    return this.inventoryService.findOneProduct(id);
  }

  @Patch("products/:id")
  @ApiOperation({ summary: "상품 정보 수정", description: "상품 정보를 수정합니다" })
  @ApiResponse({ status: 200, description: "상품 정보 수정 성공" })
  updateProduct(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.inventoryService.updateProduct(id, updateProductDto);
  }

  @Patch("products/:id/stock")
  @ApiOperation({ summary: "재고 수량 업데이트", description: "상품의 재고 수량을 업데이트합니다" })
  @ApiResponse({ status: 200, description: "재고 수량 업데이트 성공" })
  updateStock(@Param("id") id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.inventoryService.updateStock(id, updateStockDto);
  }

  @Delete("products/:id")
  @ApiOperation({ summary: "상품 삭제", description: "상품을 삭제합니다" })
  @ApiResponse({ status: 200, description: "상품 삭제 성공" })
  removeProduct(@Param("id") id: string) {
    return this.inventoryService.removeProduct(id);
  }

  @Get("dashboard")
  @ApiOperation({ summary: "재고 대시보드", description: "재고 현황 요약 정보를 조회합니다" })
  @ApiResponse({ status: 200, description: "대시보드 데이터 조회 성공" })
  getDashboard() {
    return this.inventoryService.getDashboard();
  }
}
