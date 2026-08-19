import { BooksCatchAll } from "./view";
import { bookStaticParams } from "@/lib/static-paths";

export function generateStaticParams() {
  return bookStaticParams();
}

export default function Page() {
  return <BooksCatchAll />;
}
