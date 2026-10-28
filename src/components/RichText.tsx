import React from "react";

// Renders the simple formatting the admin panel supports in long text fields:
//   blank line   -> new paragraph
//   - item       -> bullet list
//   ### Heading  -> sub-heading
//   **bold**     -> bold
// Output is built from React elements, so admin-entered text can never inject HTML.

const renderInline = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

const RichText: React.FC<{ text: string }> = ({ text }) => {
  const blocks: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(<p key={blocks.length}>{renderInline(paragraph.join(" "))}</p>);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={blocks.length} className="list-disc pl-6 space-y-2">
          {list.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      flushList();
    } else if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      list.push(line.replace(/^[-*]\s+/, ""));
    } else if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h4 key={blocks.length} className="font-semibold pt-2">
          {renderInline(line.slice(4))}
        </h4>
      );
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();

  return <>{blocks}</>;
};

export default RichText;
