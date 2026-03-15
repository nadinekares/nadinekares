import Link from "next/link";
import { Footer } from "@/components/sections/footer";

function parseMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: { type: string; content: string; level?: number }[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("# ")) {
      elements.push({ type: "h1", content: line.slice(2).trim() });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push({ type: "h2", content: line.slice(3).trim() });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      elements.push({ type: "h3", content: line.slice(4).trim() });
      i++;
      continue;
    }

    // List items
    if (line.startsWith("- ")) {
      elements.push({ type: "li", content: line.slice(2).trim() });
      i++;
      continue;
    }

    // Paragraph: collect consecutive non-empty, non-special lines
    let para = line;
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("- ")
    ) {
      para += " " + lines[i];
      i++;
    }
    elements.push({ type: "p", content: para.trim() });
  }

  return elements;
}

function renderInlineMarkdown(text: string) {
  // Split on **bold** and render
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function LegalPage({
  content,
  backLabel = "Back",
}: {
  content: string;
  backLabel?: string;
}) {
  const elements = parseMarkdown(content);

  // Group list items together
  const grouped: typeof elements = [];
  for (const el of elements) {
    if (el.type === "li") {
      const prev = grouped[grouped.length - 1];
      if (prev && prev.type === "ul") {
        prev.content += "\n" + el.content;
      } else {
        grouped.push({ type: "ul", content: el.content });
      }
    } else {
      grouped.push(el);
    }
  }

  return (
    <>
      <main className="min-h-screen bg-background pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          {/* Back link */}
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-sm font-label uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {backLabel}
          </Link>

          {/* Content */}
          <div className="space-y-6">
            {grouped.map((el, i) => {
              switch (el.type) {
                case "h1":
                  return (
                    <h1
                      key={i}
                      className="mb-4 font-heading text-4xl font-semibold leading-[0.95] tracking-tight md:text-5xl"
                    >
                      {el.content}
                    </h1>
                  );
                case "h2":
                  return (
                    <h2
                      key={i}
                      className="mt-10 mb-3 font-heading text-xl font-semibold leading-tight tracking-tight md:text-2xl"
                    >
                      {el.content}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3
                      key={i}
                      className="mt-6 mb-2 font-heading text-lg font-medium leading-tight tracking-tight"
                    >
                      {el.content}
                    </h3>
                  );
                case "ul":
                  return (
                    <ul
                      key={i}
                      className="space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground"
                    >
                      {el.content.split("\n").map((item, j) => (
                        <li key={j} className="list-disc">
                          {renderInlineMarkdown(item)}
                        </li>
                      ))}
                    </ul>
                  );
                case "p":
                default:
                  return (
                    <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">
                      {renderInlineMarkdown(el.content)}
                    </p>
                  );
              }
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
