import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from './../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { HashModule } from '../hashing/hash.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PassportModule,
    HashModule,
    JwtModule.register({
      secret: 'a-weird-unsecret-secret£$%&/()=?',
      signOptions: {
        expiresIn: '30d',
      },
    }),
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     secret: config.get('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: '30d',
    //     },
    //   }),
    // }),
  ],
})
export class AuthModule {}
