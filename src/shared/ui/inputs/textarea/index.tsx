import React, { forwardRef, TextareaHTMLAttributes } from "react";
import classNames from "classnames";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={classNames("scrollbar", className)}
        style={{
          resize: "none",
          ...props.style,
        }}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";
export default TextArea;
