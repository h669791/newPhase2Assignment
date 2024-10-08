export interface User {
  username: string;
  email: string;
  roles: string[];  // Super Admin, Group Admin, etc.
  groups: string[];
}
