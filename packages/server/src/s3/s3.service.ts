import { S3 } from 'aws-sdk';
import { Injectable, Logger } from '@nestjs/common';

const default_bucket_name = 'danskill1'; // TODO:

@Injectable()
export class S3Service {
  async upload(
    file: Express.Multer.File,
    prefix: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const filename =
      'users/' +
      prefix +
      '/' +
      new Date().toISOString().replace(/:/g, '-') +
      '_' +
      file.originalname;

    return await this.uploadS3(file.buffer, default_bucket_name, filename);
  }

  private async uploadS3(
    file: Buffer,
    bucket: string,
    name: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const s3 = this.getAggregatedS3();
    const params: S3.Types.PutObjectRequest = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  private getAggregatedS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async remove(key: string) {
    const s3 = this.getAggregatedS3();

    await s3.deleteObject({ Bucket: default_bucket_name, Key: key }).promise();
  }
}
