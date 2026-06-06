// src/lib/utils.ts

export function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

export function maskEmail(e: string) {
  const [localPart, domain] = e.split("@");
  if (!localPart || !domain) return e; // Handle invalid email format
  return localPart[0] + "***@" + domain;
}