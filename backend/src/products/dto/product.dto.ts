import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min } from 'class-validator'

export class CreateProductDto {
  @IsString() @IsNotEmpty() name: string
  @IsString() @IsNotEmpty() description: string
  @IsIn(['burgers', 'drinks', 'sides']) category: string
  @IsNumber() @Min(0) price: number
  @IsString() @IsNotEmpty() image: string
  @IsOptional() @IsBoolean() popular?: boolean
}

export class UpdateProductDto {
  @IsOptional() @IsString() @IsNotEmpty() name?: string
  @IsOptional() @IsString() @IsNotEmpty() description?: string
  @IsOptional() @IsIn(['burgers', 'drinks', 'sides']) category?: string
  @IsOptional() @IsNumber() @Min(0) price?: number
  @IsOptional() @IsString() @IsNotEmpty() image?: string
  @IsOptional() @IsBoolean() popular?: boolean
}
