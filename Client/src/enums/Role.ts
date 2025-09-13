export enum Role {
  TeamLeader,
  Instructor,
  Recruit,
}

export const RoleNames: Record<Role, string> = {
  [Role.TeamLeader]: 'ראש צוות',
  [Role.Instructor]: 'חופף',
  [Role.Recruit]: 'נחפף',
};
