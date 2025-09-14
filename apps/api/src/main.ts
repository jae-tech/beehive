import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  app.enableCors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://beehive.jae-tech.com"]
        : ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Beehive API")
    .setDescription("재고 및 거래처 관리 시스템 API")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("auth", "인증")
    .addTag("users", "사용자 관리")
    .addTag("categories", "카테고리 관리")
    .addTag("inventory", "재고 관리")
    .addTag("suppliers", "거래처 관리")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port, "0.0.0.0");
  console.log(`🚀 Beehive API running on http://localhost:${port}`);
}

bootstrap();
