export function PrepareUrl(str: string) {
  return process.env.AWS_BUCKET_PATH + str;
}
