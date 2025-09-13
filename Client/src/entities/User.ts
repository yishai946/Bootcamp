import { Role } from '@enums/Role';

interface User {
  id: string;
  name: string;
  username: string;
  role: Role;
  teamId: string;
}

export default User;
