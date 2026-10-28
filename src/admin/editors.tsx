import React from "react";
import type { ApplicationScript, LegalPage, Loan, SiteContent, Slide } from "../content/types";
import {
  AddButton,
  Card,
  FormattingHelp,
  ImageField,
  ListItem,
  SelectField,
  StringListField,
  TextField,
} from "./fields";
import { moveItem, removeAt, replaceAt } from "./listUtils";
import { slugError, slugify } from "./validation";

interface EditorProps<K extends keyof SiteContent> {
  value: SiteContent[K];
  onChange: (value: SiteContent[K]) => void;
}

const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export const GeneralEditor: React.FC<EditorProps<"general">> = ({ value, onChange }) => (
  <Card title="WhatsApp" description="Used by the “Chat on WhatsApp” and “Apply Now” buttons across the site.">
    <TextField
      label="WhatsApp number"
      value={value.whatsappNumber}
      onChange={(whatsappNumber) => onChange({ ...value, whatsappNumber })}
      hint="Country code first, digits only. Example: 254707064524"
    />
    <TextField
      label="Default message"
      value={value.whatsappMessage}
      onChange={(whatsappMessage) => onChange({ ...value, whatsappMessage })}
      hint="Pre-filled text when a visitor opens WhatsApp from the homepage or menu."
    />
  </Card>
);

export const SlidesEditor: React.FC<EditorProps<"slides">> = ({ value, onChange }) => {
  const update = (i: number, slide: Slide) => onChange(replaceAt(value, i, slide));
  return (
    <Card title="Homepage slider" description="The large rotating banner at the top of the homepage.">
      <div className="space-y-3">
        {value.map((slide, i) => (
          <ListItem
            key={slide.id}
            title={slide.title}
            index={i}
            count={value.length}
            onMove={(d) => onChange(moveItem(value, i, d))}
            onRemove={() => onChange(removeAt(value, i))}
          >
            <TextField label="Title" value={slide.title} onChange={(title) => update(i, { ...slide, title })} />
            <TextField
              label="Text"
              multiline
              value={slide.subtitle}
              onChange={(subtitle) => update(i, { ...slide, subtitle })}
            />
            <ImageField label="Background image" value={slide.image} onChange={(image) => update(i, { ...slide, image })} />
          </ListItem>
        ))}
      </div>
      <AddButton
        label="Add slide"
        onClick={() => onChange([...value, { id: newId("slide"), title: "New slide", subtitle: "", image: "" }])}
      />
    </Card>
  );
};

export const HomeEditor: React.FC<EditorProps<"home">> = ({ value, onChange }) => (
  <>
    <Card title="Loan options section">
      <TextField
        label="Heading"
        value={value.loansHeading}
        onChange={(loansHeading) => onChange({ ...value, loansHeading })}
        hint="The loan cards themselves are edited under Loan products."
      />
    </Card>
    <Card title="Bottom banner" description="The section with the picture below the loan cards.">
      <TextField
        label="Title"
        multiline
        rows={2}
        value={value.heroTitle}
        onChange={(heroTitle) => onChange({ ...value, heroTitle })}
        hint="Press Enter to start a new line."
      />
      <TextField label="Text" multiline value={value.heroText} onChange={(heroText) => onChange({ ...value, heroText })} />
      <TextField
        label="Button label"
        value={value.heroButtonLabel}
        onChange={(heroButtonLabel) => onChange({ ...value, heroButtonLabel })}
      />
      <ImageField label="Image" value={value.heroImage} onChange={(heroImage) => onChange({ ...value, heroImage })} />
    </Card>
  </>
);

const scriptOptions: { value: ApplicationScript; label: string }[] = [
  { value: "logbook", label: "Logbook loan form" },
  { value: "asset_finance", label: "Asset finance form" },
  { value: "buy_off_loan", label: "Buy off loan form" },
  { value: "title_deed_loan", label: "Title deed loan form" },
];

interface LoansEditorProps extends EditorProps<"loans"> {
  savedIds: string[];
}

export const LoansEditor: React.FC<LoansEditorProps> = ({ value, onChange, savedIds }) => {
  const update = (i: number, loan: Loan) => onChange(replaceAt(value, i, loan));

  const addLoan = () =>
    onChange([
      ...value,
      {
        id: newId("loan"),
        slug: "",
        name: "",
        summary: "",
        image: "",
        pageTitle: "",
        intro: [""],
        sections: [{ heading: "WHAT TO HAVE WHEN YOU APPLY:", items: [""] }],
        applyButtonLabel: "Apply Now",
        formTitle: "",
        applicationScript: "logbook",
      },
    ]);

  return (
    <Card
      title="Loan products"
      description="Each loan gets a card on the homepage and its own page. Use the arrows to set the order on the homepage."
    >
      <div className="space-y-3">
        {value.map((loan, i) => {
          const isNew = !savedIds.includes(loan.id);
          const otherSlugs = value.filter((_, j) => j !== i).map((l) => l.slug);
          const error = slugError(loan.slug, otherSlugs);
          return (
            <ListItem
              key={loan.id}
              title={loan.name || "New loan"}
              index={i}
              count={value.length}
              defaultOpen={isNew}
              onMove={(d) => onChange(moveItem(value, i, d))}
              onRemove={() => onChange(removeAt(value, i))}
            >
              <TextField
                label="Loan name"
                value={loan.name}
                // New loans get their page address from the name; existing ones keep theirs so links don't break.
                onChange={(name) => update(i, { ...loan, name, ...(isNew ? { slug: slugify(name) } : {}) })}
              />
              <div>
                <TextField
                  label="Page address"
                  value={loan.slug}
                  onChange={(slug) => update(i, { ...loan, slug: slug.toLowerCase().replace(/[^a-z0-9-]+/g, "-") })}
                  hint={`firefly.co.ke/${loan.slug || "…"}${isNew ? "" : " — changing this breaks links people have saved or shared."}`}
                />
                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
              </div>
              <TextField
                label="Card summary"
                multiline
                value={loan.summary}
                onChange={(summary) => update(i, { ...loan, summary })}
                hint="Shown on the homepage card (first 80 characters)."
              />
              <ImageField label="Card image" value={loan.image} onChange={(image) => update(i, { ...loan, image })} />

              <hr className="border-gray-200" />
              <TextField
                label="Page title"
                value={loan.pageTitle}
                onChange={(pageTitle) => update(i, { ...loan, pageTitle })}
                hint="Heading at the top of the loan page. Leave empty to use the loan name."
              />
              <StringListField
                label="Introduction paragraphs"
                multiline
                items={loan.intro}
                onChange={(intro) => update(i, { ...loan, intro })}
                addLabel="Add paragraph"
              />

              <div className="space-y-3">
                <span className="block text-sm font-medium text-gray-700">Lists on the page</span>
                {loan.sections.map((section, s) => (
                  <ListItem
                    key={s}
                    title={section.heading}
                    index={s}
                    count={loan.sections.length}
                    defaultOpen
                    onMove={(d) => update(i, { ...loan, sections: moveItem(loan.sections, s, d) })}
                    onRemove={() => update(i, { ...loan, sections: removeAt(loan.sections, s) })}
                  >
                    <TextField
                      label="Heading"
                      value={section.heading}
                      onChange={(heading) =>
                        update(i, { ...loan, sections: replaceAt(loan.sections, s, { ...section, heading }) })
                      }
                    />
                    <StringListField
                      label="Bullet points"
                      items={section.items}
                      onChange={(items) =>
                        update(i, { ...loan, sections: replaceAt(loan.sections, s, { ...section, items }) })
                      }
                      addLabel="Add bullet point"
                    />
                  </ListItem>
                ))}
                <AddButton
                  label="Add list"
                  onClick={() => update(i, { ...loan, sections: [...loan.sections, { heading: "", items: [""] }] })}
                />
              </div>

              <hr className="border-gray-200" />
              <TextField
                label="Apply button label"
                value={loan.applyButtonLabel}
                onChange={(applyButtonLabel) => update(i, { ...loan, applyButtonLabel })}
              />
              <TextField
                label="Application form title"
                value={loan.formTitle}
                onChange={(formTitle) => update(i, { ...loan, formTitle })}
                placeholder={`${loan.name || "Loan"} Application`}
              />
              <SelectField
                label="Application form sends to"
                value={loan.applicationScript}
                options={scriptOptions}
                onChange={(applicationScript) =>
                  update(i, { ...loan, applicationScript: applicationScript as ApplicationScript })
                }
                hint="Which email handler receives applications from this page."
              />
            </ListItem>
          );
        })}
      </div>
      <AddButton label="Add loan product" onClick={addLoan} />
    </Card>
  );
};

export const AboutEditor: React.FC<EditorProps<"about">> = ({ value, onChange }) => (
  <>
    <Card title="Introduction">
      <TextField
        label="Title"
        value={value.title}
        onChange={(title) => onChange({ ...value, title })}
        hint="The last word is shown in yellow."
      />
      <TextField label="Intro text" multiline value={value.intro} onChange={(intro) => onChange({ ...value, intro })} />
      <TextField label="Our Mission" multiline value={value.mission} onChange={(mission) => onChange({ ...value, mission })} />
      <TextField label="Our Vision" multiline value={value.vision} onChange={(vision) => onChange({ ...value, vision })} />
    </Card>
    <Card title="Core values">
      <TextField
        label="Heading"
        value={value.valuesHeading}
        onChange={(valuesHeading) => onChange({ ...value, valuesHeading })}
      />
      <div className="space-y-3">
        {value.values.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            index={i}
            count={value.values.length}
            onMove={(d) => onChange({ ...value, values: moveItem(value.values, i, d) })}
            onRemove={() => onChange({ ...value, values: removeAt(value.values, i) })}
          >
            <TextField
              label="Title"
              value={item.title}
              onChange={(title) => onChange({ ...value, values: replaceAt(value.values, i, { ...item, title }) })}
            />
            <TextField
              label="Text"
              multiline
              value={item.text}
              onChange={(text) => onChange({ ...value, values: replaceAt(value.values, i, { ...item, text }) })}
            />
          </ListItem>
        ))}
      </div>
      <AddButton
        label="Add value"
        onClick={() => onChange({ ...value, values: [...value.values, { title: "", text: "" }] })}
      />
    </Card>
  </>
);

export const ContactEditor: React.FC<EditorProps<"contact">> = ({ value, onChange }) => (
  <Card title="Contact page">
    <TextField label="Title" value={value.title} onChange={(title) => onChange({ ...value, title })} />
    <TextField label="Text" multiline value={value.text} onChange={(text) => onChange({ ...value, text })} />
    <TextField label="Button label" value={value.buttonLabel} onChange={(buttonLabel) => onChange({ ...value, buttonLabel })} />
    <TextField
      label="WhatsApp message"
      value={value.whatsappMessage}
      onChange={(whatsappMessage) => onChange({ ...value, whatsappMessage })}
      hint="Pre-filled text when a visitor taps the button. The number is set under Contact & WhatsApp."
    />
  </Card>
);

export const FooterEditor: React.FC<EditorProps<"footer">> = ({ value, onChange }) => {
  const field = (key: keyof typeof value, label: string, multiline = false, hint?: string) => (
    <TextField
      label={label}
      multiline={multiline}
      value={value[key]}
      onChange={(v) => onChange({ ...value, [key]: v })}
      hint={hint}
    />
  );
  return (
    <Card title="Footer" description="Shown at the bottom of every page.">
      {field("companyName", "Company name")}
      {field("companyText", "Company description", true)}
      {field("supportHours", "Support hours", true, "Press Enter to start a new line.")}
      {field("noticeTitle", "Notice title")}
      {field("noticeText", "Notice text", true)}
      {field("regulatory", "Regulatory compliance", true)}
      {field("creditReporting", "Credit reporting", true)}
      {field("copyright", "Copyright line", false, "The current year is added in front automatically.")}
    </Card>
  );
};

export const LegalEditor: React.FC<{ value: LegalPage; onChange: (value: LegalPage) => void }> = ({ value, onChange }) => (
  <>
    <Card title="Page">
      <TextField label="Title" value={value.title} onChange={(title) => onChange({ ...value, title })} />
      <TextField label="Introduction" multiline rows={4} value={value.intro} onChange={(intro) => onChange({ ...value, intro })} />
      <FormattingHelp />
    </Card>
    <Card title="Sections">
      <div className="space-y-3">
        {value.sections.map((section, i) => (
          <ListItem
            key={i}
            title={section.title}
            index={i}
            count={value.sections.length}
            onMove={(d) => onChange({ ...value, sections: moveItem(value.sections, i, d) })}
            onRemove={() => onChange({ ...value, sections: removeAt(value.sections, i) })}
          >
            <TextField
              label="Section title"
              value={section.title}
              onChange={(title) => onChange({ ...value, sections: replaceAt(value.sections, i, { ...section, title }) })}
            />
            <TextField
              label="Content"
              multiline
              rows={10}
              value={section.body}
              onChange={(body) => onChange({ ...value, sections: replaceAt(value.sections, i, { ...section, body }) })}
            />
            <FormattingHelp />
          </ListItem>
        ))}
      </div>
      <AddButton
        label="Add section"
        onClick={() => onChange({ ...value, sections: [...value.sections, { title: "", body: "" }] })}
      />
    </Card>
  </>
);
