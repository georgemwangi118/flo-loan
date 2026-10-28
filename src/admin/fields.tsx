import React, { useId, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, ImageUp, Plus, Trash2 } from "lucide-react";
import { api } from "./api";
import { moveItem, removeAt, replaceAt } from "./listUtils";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200";

export const Card: React.FC<{ title?: string; description?: string; children: React.ReactNode }> = ({
  title,
  description,
  children,
}) => (
  <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
    {title && (
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
    )}
    {children}
  </section>
);

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}

export const TextField: React.FC<TextFieldProps> = ({ label, value, onChange, hint, multiline, rows = 3, placeholder }) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  hint?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({ label, value, options, onChange, hint }) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
};

export const ImageField: React.FC<{ label: string; value: string; onChange: (url: string) => void }> = ({
  label,
  value,
  onChange,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Image is too large. The limit is 5 MB.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const { url } = await api.uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="h-28 w-44 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">No image</div>
          )}
        </div>
        <div className="space-y-2">
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-60"
          >
            <ImageUp size={16} />
            {uploading ? "Uploading…" : "Upload new image"}
          </button>
          <p className="text-xs text-gray-500">JPG, PNG, WebP or GIF, up to 5 MB.</p>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={handleFile} />
    </div>
  );
};

const iconButton =
  "rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent";

export const ItemControls: React.FC<{
  index: number;
  count: number;
  onMove: (delta: number) => void;
  onRemove: () => void;
  removeLabel?: string;
}> = ({ index, count, onMove, onRemove, removeLabel = "Remove" }) => (
  <div className="flex shrink-0 items-center gap-0.5">
    <button type="button" className={iconButton} disabled={index === 0} onClick={() => onMove(-1)} title="Move up">
      <ArrowUp size={16} />
    </button>
    <button type="button" className={iconButton} disabled={index === count - 1} onClick={() => onMove(1)} title="Move down">
      <ArrowDown size={16} />
    </button>
    <button
      type="button"
      className={`${iconButton} hover:bg-red-50! hover:text-red-600!`}
      onClick={onRemove}
      title={removeLabel}
    >
      <Trash2 size={16} />
    </button>
  </div>
);

export const AddButton: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:border-yellow-500 hover:bg-yellow-50"
  >
    <Plus size={16} />
    {label}
  </button>
);

// A collapsible box for one item in a list (a slide, a loan, a policy section…).
export const ListItem: React.FC<{
  title: string;
  index: number;
  count: number;
  onMove: (delta: number) => void;
  onRemove: () => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ title, index, count, onMove, onRemove, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/60">
      <div className="flex items-center gap-2 px-3 py-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left text-sm font-medium text-gray-900"
        >
          {open ? <ChevronDown size={16} className="shrink-0" /> : <ChevronRight size={16} className="shrink-0" />}
          <span className="truncate">{title || "Untitled"}</span>
        </button>
        <ItemControls
          index={index}
          count={count}
          onMove={onMove}
          onRemove={() => {
            if (confirm(`Remove "${title || "this item"}"?`)) onRemove();
          }}
        />
      </div>
      {open && <div className="space-y-4 border-t border-gray-200 bg-white p-4 rounded-b-xl">{children}</div>}
    </div>
  );
};

// Editable list of short texts, e.g. bullet points or paragraphs.
export const StringListField: React.FC<{
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel?: string;
  multiline?: boolean;
  hint?: string;
}> = ({ label, items, onChange, addLabel = "Add item", multiline, hint }) => (
  <div>
    <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
    {hint && <p className="mb-2 text-xs text-gray-500">{hint}</p>}
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          {multiline ? (
            <textarea
              rows={2}
              value={item}
              onChange={(e) => onChange(replaceAt(items, i, e.target.value))}
              className={inputClass}
            />
          ) : (
            <input value={item} onChange={(e) => onChange(replaceAt(items, i, e.target.value))} className={inputClass} />
          )}
          <ItemControls
            index={i}
            count={items.length}
            onMove={(d) => onChange(moveItem(items, i, d))}
            onRemove={() => onChange(removeAt(items, i))}
          />
        </div>
      ))}
      <AddButton label={addLabel} onClick={() => onChange([...items, ""])} />
    </div>
  </div>
);

export const FormattingHelp: React.FC = () => (
  <p className="text-xs text-gray-500">
    Formatting: leave a blank line between paragraphs · start a line with <code>- </code> for a bullet ·{" "}
    <code>### </code> for a sub-heading · wrap text in <code>**double stars**</code> for bold.
  </p>
);
