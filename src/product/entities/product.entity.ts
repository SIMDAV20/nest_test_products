import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Category {
  name: string;
  slug: string;
}

class Brand {
  name: string;
  slug: string;
}

@Schema()
export class Product extends Document {
  _id: string;

  @Prop({
    unique: true,
    required: true,
    index: true,
  })
  name: string;

  @Prop({
    required: true,
    index: true,
  })
  category: Category;

  @Prop({
    required: true,
    index: true,
  })
  brand: Brand;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  slug: string;

  @Prop({
    required: true,
  })
  status: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
