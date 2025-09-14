import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("health")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "Health Check", description: "API 서버 상태 확인" })
  @ApiResponse({
    status: 200,
    description: "서버 정상 작동 중",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Beehive API Server is running!" },
        timestamp: { type: "string", example: "2025-01-01T00:00:00.000Z" },
        version: { type: "string", example: "1.0.0" },
      },
    },
  })
  getHello() {
    return this.appService.getHello();
  }

  @Get("health")
  @ApiOperation({ summary: "Health Status", description: "서버 상태 및 데이터베이스 연결 확인" })
  @ApiResponse({ status: 200, description: "서버 및 DB 정상" })
  getHealth() {
    return this.appService.getHealth();
  }
}
