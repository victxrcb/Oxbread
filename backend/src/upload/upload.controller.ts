import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { AdminGuard } from '../auth/admin.guard'

@Controller('upload')
export class UploadController {
  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '../../../uploads'),
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
          cb(null, `${unique}${extname(file.originalname)}`)
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          cb(new BadRequestException('Apenas imagens são permitidas'), false)
        } else {
          cb(null, true)
        }
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/${file.filename}` }
  }
}
