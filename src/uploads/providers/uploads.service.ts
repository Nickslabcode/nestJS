import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadToAwsService } from './upload-to-aws.service';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-file.interface';
import { fileTypes } from '../enums/file-types.enum';

@Injectable()
export class UploadsService {
  constructor(
    /**
     * Injecting uploadToAwsService
     */
    private readonly uploadToAwsService: UploadToAwsService,

    /**
     * Injecting configService
     */
    private readonly configService: ConfigService,

    /**
     * Injecting uploadsRepository
     */
    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>,
  ) {}

  public async uploadFile(file: Express.Multer.File) {
    // Throw error for unsupported MIME types
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('MIME type not supported');
    }

    try {
      // Upload the file to AWS S3 to get the url
      const name = await this.uploadToAwsService.fileUpload(file);

      // Generate a new entry in db
      const uploadFile: UploadFile = {
        name,
        path: `https://${this.configService.get('appConfig.awsCloudfrontUrl')}/${name}`,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      const upload = this.uploadsRepository.create(uploadFile);

      return this.uploadsRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
