import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  public async uploadFile(file: Express.Multer.File) {
    // Upload the file to AWS S3 to get the url
    // Generate a new entry in db
  }
}
