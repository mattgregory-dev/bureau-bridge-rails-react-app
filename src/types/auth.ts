export type PlatformRole = "platform_owner" | "tenant_admin" | "tenant_staff" | "partner" | "consumer";

export type Me = {
  id: string;
  email: string;
  role: PlatformRole;
  tenantId?: string | null;
};
