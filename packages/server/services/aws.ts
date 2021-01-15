import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import multer from 'multer';
import { Request } from "express";

const default_bucket_name = "danskill1";
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


export const awsAdminUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: default_bucket_name,
        key: function (req: Request, file, cb) {
            const path = req.body.path as string;
            cb(null, `${path} / ${file.originalname}`)
        }
    })
})

// TODO: filter by type, limit by size
export const awsUserUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: default_bucket_name,
        key: function (req: Request, file, cb) {
            cb(null, "users/" + req.user.email + "/" + new Date().toISOString().replace(/:/g, '-') + "_" + file.originalname)
        }
    })
})

export const awsListObjects = async (prefix: string) => (
    await s3.listObjectsV2({ Bucket: default_bucket_name, Prefix: prefix }).promise()
)

export const awsDelete = async (key: string) => (
    await s3.deleteObject({ Bucket: default_bucket_name, Key: key }).promise()
)