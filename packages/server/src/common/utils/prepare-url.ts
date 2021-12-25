export function PrepareS3URL(str: string): string {
  return str ? process.env.BUCKET_PATH + str : '';
}
