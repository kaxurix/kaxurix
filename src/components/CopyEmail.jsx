import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmail({ email }) {
  const [state, setState] = useState("ready");
  const timer = useRef(null);
  const fallback = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (state === "manual") {
      fallback.current?.focus();
      fallback.current?.select();
    }
  }, [state]);

  const copy = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
      timer.current = setTimeout(() => setState("ready"), 3000);
    } catch {
      setState("manual");
      fallback.current?.focus();
      fallback.current?.select();
    }
  };

  return (
    <div className="copy-email">
      <button type="button" onClick={copy} aria-label="Copy email address">
        {state === "copied" ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        {state === "copied" ? "Copied!" : "Copy email"}
      </button>
      <span className="copy-email-status" role="status" aria-live="polite">
        {state === "copied"
          ? "Email address copied."
          : state === "manual"
            ? "Select the address below and copy it."
            : ""}
      </span>
      {state === "manual" && (
        <input
          ref={fallback}
          aria-label="Email address to copy"
          value={email}
          readOnly
          onFocus={(event) => event.target.select()}
        />
      )}
    </div>
  );
}
