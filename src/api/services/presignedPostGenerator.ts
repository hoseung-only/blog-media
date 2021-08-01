import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export class PresignedPostGenerator {
  private client: S3Client;

  constructor(private key: string) {
    this.client = new S3Client({ region: process.env.REGION! });
  }

  public async generate() {
    return await createPresignedPost(this.client, {
      Bucket: process.env.BUCKET!,
      Key: this.key,
      Expires: 120,
      Fields: {
        key: this.key,
      },
      Conditions: [["eq", "$key", this.key]],
    });
  }
}
