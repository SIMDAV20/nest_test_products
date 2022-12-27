/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot('mongodb://localhost:27017/test_backend'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
