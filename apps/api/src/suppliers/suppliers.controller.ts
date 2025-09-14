import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SuppliersService } from "./suppliers.service";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";

@ApiTags("suppliers")
@Controller("suppliers")
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: "거래처 등록", description: "새로운 거래처를 등록합니다" })
  @ApiResponse({ status: 201, description: "거래처가 성공적으로 등록되었습니다" })
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: "거래처 목록 조회", description: "모든 거래처 목록을 조회합니다" })
  @ApiResponse({ status: 200, description: "거래처 목록 조회 성공" })
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "거래처 상세 조회",
    description: "특정 거래처의 상세 정보를 조회합니다",
  })
  @ApiResponse({ status: 200, description: "거래처 정보 조회 성공" })
  findOne(@Param("id") id: string) {
    return this.suppliersService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "거래처 정보 수정", description: "거래처 정보를 수정합니다" })
  @ApiResponse({ status: 200, description: "거래처 정보 수정 성공" })
  update(@Param("id") id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "거래처 삭제", description: "거래처를 삭제합니다" })
  @ApiResponse({ status: 200, description: "거래처 삭제 성공" })
  remove(@Param("id") id: string) {
    return this.suppliersService.remove(id);
  }
}
