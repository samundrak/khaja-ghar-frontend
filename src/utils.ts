export function isAdmin(role?: string) {
  return role === "admin";
}
export function isOwner(role?: string) {
  return role === "owner";
}

export function isUser(role?: string) {
  return role === "user";
}
