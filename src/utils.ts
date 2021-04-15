export function isAdmin(role?: string) {
  return role === "admin";
}
export function isOwner(role?: string) {
  return role === "owner";
}

export function isUser(role?: string) {
  return role === "user";
}
export function getUploadURL(path?: string) {
  return `${process.env.REACT_APP_HOST_ADDRESS}${path}`;
}
