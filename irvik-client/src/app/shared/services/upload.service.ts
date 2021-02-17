import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../../environments/environment';
import { IFileS3 } from '../interfaces/fileS3.interface';
import { Subject, of, from, Observable } from 'rxjs';
import { FileList } from 'aws-sdk/clients/codecommit';
import { DeleteObjectRequest } from 'aws-sdk/clients/s3';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  fileS3 = new Subject<IFileS3>();
  constructor() {}

  uploadFiles(files: any): IFileS3[] {
    const arrImages: IFileS3[] = [];
    // const stream$ = from(files).pipe(
    //   tap((file: any) => {
    //     if (file) {
    //       const contentType = file.type;
    //       const bucket = new S3({
    //         accessKeyId: environment.accessKeyId,
    //         secretAccessKey: environment.secretAccessKey,
    //         region: 'eu-west-2',
    //       });
    //       const params = {
    //         Bucket: 'irvik-images',
    //         Key: file.name,
    //         Body: file,
    //         ACL: 'public-read',
    //         ContentType: contentType,
    //       };
    //       bucket.upload(params, (err: any, data: any): any => {
    //         if (err) {
    //           console.log('There was an error uploading your file: ', err);
    //         }
    //         console.log('Successfully uploaded file.', data);
    //       });
    //     }
    //   }),
    // );
  
    // stream$.subscribe((v) => {
    //   console.log(v);
    // });
    // return new Observable((observer) => {
    //   observer.next(arrImages);
    // });

    for (let index = 0; index < files!.length; index++) {
      ((file) => {
        if (file) {
          const contentType = file.type;
          const bucket = new S3({
            accessKeyId: environment.accessKeyId,
            secretAccessKey: environment.secretAccessKey,
            region: 'eu-west-2',
          });
          const params = {
            Bucket: 'irvik-images',
            Key: file.name,
            Body: file,
            ACL: 'public-read',
            ContentType: contentType,
          };
          bucket.upload(params, (err: any, data: any): void => {
            if (err) {
              console.log('There was an error uploading your file: ', err);
            }
            arrImages.push(data);
          });
        }
      })(files?.item(index));
    }
    return arrImages;
  }

  deleteFile(Key: string, Bucket: string): void {
    // bucket.deleteObject
    const bucket = new S3({
      accessKeyId: environment.accessKeyId,
      secretAccessKey: environment.secretAccessKey,
      region: 'eu-west-2',
    });
    const params: DeleteObjectRequest = {
      Bucket,
      Key,
    };
    bucket.deleteObject(params, (err, data) => {
      if (err) console.log(err);
    });
  }
}
