import { ProjectsCatchAll } from "./view";
import { projectStaticParams } from "@/lib/static-paths";

export function generateStaticParams() {
  return projectStaticParams();
}

export default function Page() {
  return <ProjectsCatchAll />;
}
