import { Role } from '@enums/Role';

interface User {
  id: string;
  name: string;
  username: string;
  role: Role;
  team: {
    id: string;
    name: string;
  };
}

export default User;
