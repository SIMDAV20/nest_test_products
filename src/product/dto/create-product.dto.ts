import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';

class Category {
  @IsString({ message: 'El nombre de la categoría es una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre de la categoría es requerido' })
  name: string;

  @IsString({ message: 'El slug de la categoría es una cadena de texto' })
  @IsNotEmpty({ message: 'El slug de la categoría es requerido' })
  slug: string;
}

class Brand {
  @IsString({ message: 'El nombre de la marca es una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre de la marca es requerido' })
  name: string;

  @IsString({ message: 'El slug de la marca es una cadena de texto' })
  @IsNotEmpty({ message: 'El slug de la marca es requerido' })
  slug: string;
}

export class CreateProductDto {
  @IsString({ message: 'El nombre del producto es una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del producto es requerido' })
  readonly name: string;

  @ValidateNested({ each: true })
  @Type(() => Category)
  @IsNotEmpty({ message: 'La categoría es requerida' })
  readonly category: Category;

  @ValidateNested({ each: true })
  @Type(() => Brand)
  @IsNotEmpty({ message: 'La marca es requerida' })
  readonly brand: Brand;

  @IsString({ message: 'El slug es una cadena de texto' })
  @IsNotEmpty({ message: 'El slug es requerido' })
  readonly slug: string;

  @IsString({ message: 'El estado es una cadena de texto' })
  @IsNotEmpty({ message: 'El estado es requerido' })
  readonly status: string;
}
