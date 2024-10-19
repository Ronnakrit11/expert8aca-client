export const BANK_NAME: Bank = "scb";
export const BANK_NO = "182-8-51730-5";
export const BANK_ACCOUNT_NAME = "บริษัท เอ็กซ์เพิร์ท เอท โซลูชั่น จำกัด";
export const BANK_NO_REPLACE = BANK_NO.replaceAll("-", "");

export type Bank =
  | "scb"
  | "kbank"
  | "bbl"
  | "ktb"
  | "tmb"
  | "bay"
  | "cimb"
  | "gsb"
  | "tbank"
  | "uob"
  | "kk"
  | "ibank"
  | "tbank"
  | "tisco"
  | "thanachart"
  | "smbc"
  | "tcrb";
