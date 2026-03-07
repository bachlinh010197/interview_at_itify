import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UserOrmEntity } from './infrastructure/persistence/user.orm-entity.js';
import { UserRepositoryAdapter } from './infrastructure/persistence/user-repository.adapter.js';
import { USER_REPOSITORY_PORT } from './domain/user-repository.port.js';
import { RegisterUseCase } from './application/use-cases/register.use-case.js';
import { LoginUseCase } from './application/use-cases/login.use-case.js';
import { AuthController } from './auth.controller.js';
import { JwtStrategy } from './jwt.strategy.js';
import { RolesGuard } from './roles.guard.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'default-secret-change-in-production'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Adapters bound to Ports
    { provide: USER_REPOSITORY_PORT, useClass: UserRepositoryAdapter },

    // Use Cases
    RegisterUseCase,
    LoginUseCase,

    // Strategy
    JwtStrategy,

    // Guards
    RolesGuard,
  ],
  exports: [JwtStrategy, JwtModule, PassportModule, RolesGuard],
})
export class AuthModule {}
