export type Post = {
  date: string;
  title: string;
  media_type: "image" | "video" | "iframe";
  explanation: string;
  alt: string;
  hdurl: string;
};
