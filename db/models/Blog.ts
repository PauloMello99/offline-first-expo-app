import { Model } from "@nozbe/watermelondb";
import { field, date, readonly } from "@nozbe/watermelondb/decorators";

export default class Blog extends Model {
  static table = "blogs";

  @field("title") title!: string;
  @field("content") content!: string;
  @field("author") author!: string;
  @field("author_email") authorEmail!: string;
  @field("published_at") publishedAt!: number;
  @field("excerpt") excerpt?: string;
  @field("cover_image") coverImage?: string;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
