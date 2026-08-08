// Single import home for the rent-control question's data and content.
// (users.ts / testimony.ts still live one level up and are re-exported here;
// they move into this folder once the legacy monolith is removed.)

export { SOURCES } from "./sources";
export * from "./content";
export { orgTestifiers, testimonyFor } from "./selectors";
export {
  POSITION_USERS,
  type PositionUser,
} from "../rent-control-users";
export {
  TESTIMONY,
  type TestimonyItem,
  type TestimonyStance,
} from "../rent-control-testimony";
