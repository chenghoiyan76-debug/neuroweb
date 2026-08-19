import { NotesCatchAll } from "./view";
import { noteStaticParams } from "@/lib/static-paths";

export function generateStaticParams() {
  return noteStaticParams();
}

export default function Page() {
  return <NotesCatchAll />;
}
