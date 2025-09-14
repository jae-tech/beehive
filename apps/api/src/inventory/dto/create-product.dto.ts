import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, Min } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ description: "상품명", example: "iPhone 15 Pro" })
  @IsString()
  name: string;

  @ApiProperty({ description: "상품 설명", example: "최신 아이폰 모델", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "가격", example: 1200000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: "SKU (재고 관리 코드)", example: "IP15P-256-BLK" })
  @IsString()
  sku: string;

  @ApiProperty({ description: "초기 재고 수량", example: 50, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiProperty({ description: "카테고리", example: "전자제품", required: false })
  @IsOptional()
  @IsString()
  category?: string;
}
