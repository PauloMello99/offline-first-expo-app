import { Database } from "@nozbe/watermelondb";

import { adapter } from "./adapter";
import { Blog } from "./models";

const database = new Database({
  adapter,
  modelClasses: [Blog],
});

export default database;
export { adapter };
