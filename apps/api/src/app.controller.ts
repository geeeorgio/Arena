import { Controller, Get } from '@nestjs/common';

// Root controller — handles infrastructure-level endpoints
@Controller()
export class AppController {
  // Health check endpoint — used by Docker/load balancers to verify service is alive
  @Get('health')
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
