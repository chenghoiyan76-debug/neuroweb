import type { SenResource } from "@/lib/sen-types";
import type { LocaleText } from "@/lib/types";

export const L = (zh: string, en: string): LocaleText => ({ zh, en });

export function resource(item: SenResource): SenResource {
  return item;
}
