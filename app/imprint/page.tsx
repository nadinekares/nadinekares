import fs from "fs";
import path from "path";
import { LegalPage } from "@/components/legal-page";

export const metadata = {
  title: "Imprint — Nadine Kares",
  description: "Imprint (Impressum) for nadinekares.com",
};

export default function ImprintPage() {
  const content = fs.readFileSync(path.join(process.cwd(), "content", "imprint.md"), "utf-8");

  return <LegalPage content={content} backLabel="Back" />;
}
