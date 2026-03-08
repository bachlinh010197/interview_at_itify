import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { Keyv } from 'keyv';
import { KeyvAdapter } from 'cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { AuthModule } from './auth/auth.module.js';
import { UserOrmEntity } from './auth/infrastructure/persistence/user.orm-entity.js';
import { VehicleModule } from './vehicle/vehicle.module.js';
import { VehicleOrmEntity } from './vehicle/infrastructure/persistence/vehicle.orm-entity.js';
import { DriverModule } from './driver/driver.module.js';
import { DriverOrmEntity } from './driver/infrastructure/persistence/driver.orm-entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [UserOrmEntity, VehicleOrmEntity, DriverOrmEntity],
        synchronize: true,
      }),
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
        });
        return {
          stores: [new Keyv({ store: new KeyvAdapter(store as any) })],
        };
      },
    }),

    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 20 }],
    }),

    AuthModule,
    VehicleModule,
    DriverModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
