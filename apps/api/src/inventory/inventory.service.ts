import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAllProducts(category?: string, lowStock?: boolean) {
    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (lowStock) {
      where.stock = { lte: 10 }; // 재고 10개 이하를 부족으로 간주
    }

    return this.prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  async findOneProduct(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`상품 ID ${id}를 찾을 수 없습니다`);
    }

    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    await this.findOneProduct(id); // 존재 여부 확인

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async updateStock(id: string, updateStockDto: UpdateStockDto) {
    await this.findOneProduct(id); // 존재 여부 확인

    const { quantity, type, reason } = updateStockDto;

    return this.prisma.product.update({
      where: { id },
      data: {
        stock: {
          [type === "IN" ? "increment" : "decrement"]: Math.abs(quantity),
        },
      },
    });
  }

  async removeProduct(id: string) {
    await this.findOneProduct(id); // 존재 여부 확인

    return this.prisma.product.delete({
      where: { id },
    });
  }

  async getDashboard() {
    const [totalProducts, lowStockProducts, totalValue, recentProducts] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.product.count({
        where: { stock: { lte: 10 } },
      }),
      this.prisma.product.aggregate({
        _sum: {
          stock: true,
        },
      }),
      this.prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          stock: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      totalProducts,
      lowStockProducts,
      totalStock: totalValue._sum.stock || 0,
      recentProducts,
    };
  }
}
