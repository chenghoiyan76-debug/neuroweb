import { ReflectionItemPage } from "./view";
import { reflectionStaticParams } from "@/lib/static-paths";

export function generateStaticParams() {
  return reflectionStaticParams();
}

export default function Page() {
  return <ReflectionItemPage />;
}
