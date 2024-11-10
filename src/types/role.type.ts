export const roles = ['user', 'admin'] as const;
export type UserRole = (typeof roles)[number];
