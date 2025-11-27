import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { CategoriesModule } from './categories/categories.module';
import { AccessRequestsModule } from './access_requests/access_requests.module';
import { CostTrackingModule } from './cost_tracking/cost_tracking.module';
import { ToolsModule } from './tools/tools.module';
import { UsageLogsModule } from './usage_logs/usage_logs.module';
import { UserToolAccessModule } from './user_tool_access/user_tool_access.module';

@Module({
  imports: [
    UsersModule,
    AccessRequestsModule,
    CostTrackingModule,
    ToolsModule,
    UsageLogsModule,
    UserToolAccessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
