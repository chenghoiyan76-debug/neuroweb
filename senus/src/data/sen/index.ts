import { attentionResources } from "@/data/sen/attention";
import { communicationResources } from "@/data/sen/communication";
import { dailyLivingResources } from "@/data/sen/daily";
import { emotionResources } from "@/data/sen/emotion";
import { mathsResources } from "@/data/sen/maths";
import { readingResources } from "@/data/sen/reading";
import { sensoryMotorResources } from "@/data/sen/sensory";
import { socialResources } from "@/data/sen/social";
import { supportToolResources } from "@/data/sen/tools";
import { writingResources } from "@/data/sen/writing";
import type { SenResource } from "@/lib/sen-types";

export const senResources: SenResource[] = [
  ...attentionResources,
  ...readingResources,
  ...writingResources,
  ...mathsResources,
  ...communicationResources,
  ...socialResources,
  ...emotionResources,
  ...dailyLivingResources,
  ...sensoryMotorResources,
  ...supportToolResources,
];

export function assertResourceCount(expected = 100) {
  if (senResources.length !== expected) {
    throw new Error(`Expected ${expected} SEN resources, found ${senResources.length}`);
  }
}
