import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlanesModule } from './planes/planes.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { PagosModule } from './pagos/pagos.module';
import { NutricionistasModule } from './nutricionistas/nutricionistas.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { DietasModule } from './dietas/dietas.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        return {
          type: 'postgres',
          url: databaseUrl,
          autoLoadEntities: true,
          synchronize: true,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI');
        return {
          uri: mongoUri,
        };
      },
      inject: [ConfigService],
    }),
    PlanesModule,
    PacientesModule,
    PagosModule,
    NutricionistasModule,
    SeguimientoModule,
    DietasModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}