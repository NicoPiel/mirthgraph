import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortsModule } from './ports/ports.module';
import { GraphsModule } from './graphs/graphs.module';

@Module({
  imports: [PortsModule, GraphsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
