import fs from "fs";
import path from "path";
import { LegalPage } from "@/components/legal-page";

export const metadata = {
  title: "Privacy Policy — Nadine Kares",
  description: "Privacy Policy for nadinekares.com",
};

export default function PrivacyPage() {
  const content = fs.readFileSync(path.join(process.cwd(), "content", "privacy.md"), "utf-8");

  return <LegalPage content={content} backLabel="Back" />;
}
