import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })

  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const port = process.env.PORT ?? 3001
  await app.listen(port)
  console.log(`OxBread Backend rodando na porta ${port}`)
}

bootstrap()
