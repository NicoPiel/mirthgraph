import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortsModule } from './ports/ports.module';
import { GraphsModule } from './graphs/graphs.module';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    PortsModule,
    GraphsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      // Store-specific configuration:
      host: process.env['REDIS_HOST'],
      port: process.env['REDIS_PORT'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
