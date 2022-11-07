import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useDebounce, useEffectAfterMount } from "@box/shared/hooks";
import { Loader } from "@box/shared";
import s from "./style.module.scss";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
  suspense: true,
});

interface ITextEditor {
  readonly?: boolean;
  initialValue?: string;
  placeholder?: string;
  onChange: (val: string) => void;
  debounced?: boolean;
  value?: string;
}

export const TextEditor: React.FC<ITextEditor> = ({
  readonly = false,
  initialValue = "",
  onChange,
  placeholder = "",
  debounced = true,
  value: outer_value = "",
}) => {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, 1000);
  const onInput = (text: string) => {
    if (debounced) {
      setValue(text);
      return;
    }
    onChange(text);
  };
  useEffectAfterMount(() => {
    if (debouncedValue.trim().length !== 0) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);
  return (
    <div className={s.body}>
      <Suspense fallback={<Loader type={"dot"} />}>
        <RichTextEditor
          placeholder={placeholder}
          controls={[
            ["bold", "italic", "underline", "link", "code", "codeBlock"],
            ["h1", "h2", "h3", "h4", "clean"],
            ["blockquote"],
            ["sup", "sub"],
            ["alignLeft", "alignCenter", "alignRight"],
          ]}
          styles={{
            root: {
              ...(readonly
                ? {
                    border: "none",
                  }
                : {}),
            },
          }}
          value={!debounced ? outer_value : value}
          readOnly={readonly}
          onChange={onInput}
        />
      </Suspense>
    </div>
  );
};
