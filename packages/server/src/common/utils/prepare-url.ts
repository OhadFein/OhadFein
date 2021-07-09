export function PrepareUrl(str: string) {
  return str ? process.env.AWS_BUCKET_PATH + str : '';
}
