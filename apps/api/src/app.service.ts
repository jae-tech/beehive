import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    return {
      message: "Beehive API Server is running!",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    };
  }

  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: "connected",
      environment: process.env.NODE_ENV || "development",
    };
  }
}
