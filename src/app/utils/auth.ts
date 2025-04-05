import { UserRole } from "@/constants/user-role";

export const isAdminUser = (role: string) => role === UserRole.ADMIN;
