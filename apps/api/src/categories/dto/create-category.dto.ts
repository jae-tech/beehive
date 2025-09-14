import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, Length } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ description: "카테고리명", example: "전자제품" })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({
    description: "카테고리 색상 (HEX 코드)",
    example: "#3b82f6",
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string;
}
