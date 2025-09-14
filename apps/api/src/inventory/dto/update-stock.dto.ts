import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum, IsOptional } from "class-validator";

export enum StockUpdateType {
  IN = "IN",
  OUT = "OUT",
}

export class UpdateStockDto {
  @ApiProperty({ description: "변경 수량", example: 10 })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: "입출고 타입",
    enum: StockUpdateType,
    example: StockUpdateType.IN,
  })
  @IsEnum(StockUpdateType)
  type: StockUpdateType;

  @ApiProperty({
    description: "변경 사유",
    example: "신규 입고",
    required: false,
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
