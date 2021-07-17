export interface PresignedPostShow {
  url: string;
  fields: {
    [key in string]: string;
  };
}
