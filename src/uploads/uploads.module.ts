import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './providers/uploads.service';
import { UploadToAwsService } from './providers/upload-to-aws.service';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, UploadToAwsService]
})
export class UploadsModule {}
