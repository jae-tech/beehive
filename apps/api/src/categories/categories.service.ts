import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto, userId: string) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.category.findMany({
      where: { userId },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string, userId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            sku: true,
            stock: true,
            price: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`카테고리 ID ${id}를 찾을 수 없습니다`);
    }

    if (category.userId !== userId) {
      throw new ForbiddenException("이 카테고리에 접근할 권한이 없습니다");
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, userId: string) {
    await this.findOne(id, userId); // 존재 여부 및 권한 확인

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // 존재 여부 및 권한 확인

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
