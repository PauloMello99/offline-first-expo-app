import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "blogs",
      columns: [
        { name: "title", type: "string" },
        { name: "content", type: "string" },
        { name: "author", type: "string" },
        { name: "author_email", type: "string" },
        { name: "published_at", type: "number" },
        { name: "excerpt", type: "string", isOptional: true },
        { name: "cover_image", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
