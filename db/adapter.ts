import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { schema } from "./schema";

export const adapter = new SQLiteAdapter({
  schema,
  dbName: "blogs-db",
  onSetUpError: error => {
    console.error("Error setting up WatermelonDB:", error);
    throw error;
  },
});

export default adapter;
