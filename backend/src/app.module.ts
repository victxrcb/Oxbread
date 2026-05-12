import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import { UploadModule } from './upload/upload.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OrdersModule,
    ProductsModule,
    AuthModule,
    UploadModule,
  ],
})
export class AppModule {}
