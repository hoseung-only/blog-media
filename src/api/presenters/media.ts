import { PresignedPost } from "@aws-sdk/s3-presigned-post";

import * as Entities from "../entities";

export function presentPresignedPost(presignedPost: PresignedPost): Entities.PresignedPostShow {
  return presignedPost;
}
