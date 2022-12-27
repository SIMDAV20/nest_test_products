import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productModel.create(createProductDto);
      return product;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<any> {
    const { limit = 5, page = 1 } = paginationDto;
    const offset = (page - 1) * limit;

    const total = await this.productModel.countDocuments();
    const result = await this.productModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ _id: -1 })
      .select('-__v');

    return {
      total,
      page,
      limit,
      data: result,
    };
  }

  async findOne(id: string) {
    const result = await this.productModel.findById(id).select('-__v');

    if (!result) {
      throw new BadRequestException(`No se encontró el producto con id ${id}`);
    }

    return result;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException(`No se encontró el producto con id ${id}`);
    }
    try {
      await product.updateOne(updateProductDto, { new: true });
      return { ...product.toJSON(), ...updateProductDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException(`No se encontró el producto con id ${id}`);
    }
    await product.deleteOne();
    return { message: `Producto con id ${id} eliminado` };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Dato ya registrado en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    throw new BadRequestException(error);
  }
}
