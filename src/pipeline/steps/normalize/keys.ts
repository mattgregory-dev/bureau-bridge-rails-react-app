export type CreditAccountKeyParts = {
  accountName?: string | null;
  accountLast4?: string | null;
  dateOpened?: string | null;
  section?: string | null;
};

export function buildCreditAccountKey({
  accountName,
  accountLast4,
  dateOpened,
  section,
}: CreditAccountKeyParts): string {
  const name = (accountName || "unknown")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, "-");

  const last4Part = accountLast4 || "no-last4";
  const openPart = dateOpened ? dateOpened.slice(0, 10) : "no-open";
  const sectionPart = section || "unknown-section";

  return `${sectionPart}:${name}:${last4Part}:${openPart}`;
}

export type CollectionKeyParts = {
  agencyClient?: string | null;
  accountLast4?: string | null;
  reportedDate?: string | null;
  section?: string | null;
};

export function buildCollectionKey({
  agencyClient,
  accountLast4,
  reportedDate,
  section,
}: CollectionKeyParts): string {
  const name = (agencyClient || "unknown")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, "-");

  const last4Part = accountLast4 || "no-last4";
  const openPart = reportedDate ? reportedDate.slice(0, 10) : "no-open";
  const sectionPart = section || "unknown-section";

  return `${sectionPart}:${name}:${last4Part}:${openPart}`;
}

export type InquiryKeyParts = {
  contactInformation?: string | null;
  type?: string | null;
  reportedDate?: string | null;
  section?: string | null;
};

export function buildInquiryKey({
  contactInformation,
  type,
  reportedDate,
  section,
}: InquiryKeyParts): string {
  const name = (contactInformation || "unknown")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, "-");

  const inquiryType = (type || "unknown")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, "-");

  const datePart = reportedDate ? reportedDate.slice(0, 10) : "no-open";

  const sectionPart = section || "unknown-section";

  return `${sectionPart}:${name}:${inquiryType}:${datePart}`;
}

export type PublicRecordKeyParts = {
  id?: string | null;
  dispositionStatus?: string | null;
  filedDate?: string | null;
  section?: string | null;
};

export function buildPublicRecordKey({
  id,
  dispositionStatus,
  filedDate,
  section,
}: PublicRecordKeyParts): string {
  const name = (id || "unknown")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, "-");

  const code = (dispositionStatus || "unknown")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, "-");

  const datePart = filedDate ? filedDate.slice(0, 10) : "no-date";

  const sectionPart = section || "unknown-section";

  return `${sectionPart}:${name}:${code}:${datePart}`;
}