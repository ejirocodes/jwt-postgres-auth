import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HashService } from './hashing/hash.service';
import { HashModule } from './hashing/hash.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), PrismaModule, HashModule],
  controllers: [AppController],
  providers: [AppService, HashService],
})
export class AppModule {}
