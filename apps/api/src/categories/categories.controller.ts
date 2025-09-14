import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("categories")
@Controller("categories")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: "카테고리 생성", description: "새로운 상품 카테고리를 생성합니다" })
  @ApiResponse({ status: 201, description: "카테고리가 성공적으로 생성되었습니다" })
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    return this.categoriesService.create(createCategoryDto, req.user.userId);
  }

  @Get()
  @ApiOperation({
    summary: "카테고리 목록 조회",
    description: "사용자의 모든 카테고리를 조회합니다",
  })
  @ApiResponse({ status: 200, description: "카테고리 목록 조회 성공" })
  findAll(@Request() req) {
    return this.categoriesService.findAll(req.user.userId);
  }

  @Get(":id")
  @ApiOperation({
    summary: "카테고리 상세 조회",
    description: "특정 카테고리의 상세 정보를 조회합니다",
  })
  @ApiResponse({ status: 200, description: "카테고리 정보 조회 성공" })
  findOne(@Param("id") id: string, @Request() req) {
    return this.categoriesService.findOne(id, req.user.userId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "카테고리 수정", description: "카테고리 정보를 수정합니다" })
  @ApiResponse({ status: 200, description: "카테고리 수정 성공" })
  update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Request() req) {
    return this.categoriesService.update(id, updateCategoryDto, req.user.userId);
  }

  @Delete(":id")
  @ApiOperation({ summary: "카테고리 삭제", description: "카테고리를 삭제합니다" })
  @ApiResponse({ status: 200, description: "카테고리 삭제 성공" })
  remove(@Param("id") id: string, @Request() req) {
    return this.categoriesService.remove(id, req.user.userId);
  }
}
