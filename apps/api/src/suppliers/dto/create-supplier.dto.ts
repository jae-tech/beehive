import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsOptional } from "class-validator";

export class CreateSupplierDto {
  @ApiProperty({ description: "거래처명", example: "삼성전자" })
  @IsString()
  name: string;

  @ApiProperty({ description: "담당자명", example: "김담당", required: false })
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @ApiProperty({ description: "이메일", example: "contact@samsung.com", required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: "전화번호", example: "02-1234-5678", required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: "주소", example: "서울시 강남구 테헤란로 123", required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: "비고", example: "주요 전자제품 공급업체", required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
