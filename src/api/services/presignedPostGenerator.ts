import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export class PresignedPostGenerator {
  private client: S3Client;

  constructor(private fileName: string, private fileType: string) {
    this.client = new S3Client({ region: process.env.REGION! });
  }

  public async generate() {
    return await createPresignedPost(this.client, {
      Bucket: process.env.BUCKET!,
      Key: `${this.fileName}.${this.fileType}`,
      Expires: 120,
      Fields: {
        Key: `${this.fileName}.${this.fileType}`,
        "Content-Type": `image/${this.fileType}`,
      },
      Conditions: [
        ["eq", "Key", `${this.fileName}.${this.fileType}`],
        ["starts-with", "Content-Type", "image/"],
      ],
    });
  }
}
