import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortsModule } from './ports/ports.module';
import { GraphsModule } from './graphs/graphs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PortsModule,
    GraphsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
