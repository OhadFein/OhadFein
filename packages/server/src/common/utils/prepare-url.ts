export function PrepareS3URL(str: string): string {
  return str ? process.env.AWS_BUCKET_PATH + str : '';
}
