"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type FlowerShop1FrameProps = {
  page: string;
  title: string;
  compact?: boolean;
};

export default function FlowerShop1Frame({ page, title, compact = false }: FlowerShop1FrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const cleanupRef = useRef<() => void>(() => {});
  const [frameHeight, setFrameHeight] = useState(compact ? 760 : 9000);

  const updateFrameHeight = useCallback(() => {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!frame || !doc?.body) return;

    doc.documentElement.style.overflowY = "auto";
    doc.body.style.overflowY = "auto";

    const childBottom = Array.from(doc.body.children).reduce((bottom, child) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      return Math.max(bottom, Math.ceil(rect.bottom));
    }, 0);

    const measuredHeight = Math.max(
      doc.documentElement.scrollHeight,
      doc.documentElement.offsetHeight,
      doc.body.scrollHeight,
      doc.body.offsetHeight,
      childBottom,
      compact ? 760 : window.innerHeight,
    );

    setFrameHeight((current) => (Math.abs(current - measuredHeight) > 4 ? measuredHeight : current));
  }, [compact]);

  const handleLoad = useCallback(() => {
    cleanupRef.current();
    updateFrameHeight();

    const frameWindow = frameRef.current?.contentWindow;
    const frameDocument = frameRef.current?.contentDocument;
    if (!frameWindow || !frameDocument) return;

    const observer = new ResizeObserver(updateFrameHeight);
    observer.observe(frameDocument.documentElement);
    if (frameDocument.body) observer.observe(frameDocument.body);

    frameWindow.addEventListener("resize", updateFrameHeight);
    const interval = window.setInterval(updateFrameHeight, 600);
    const timeout = window.setTimeout(updateFrameHeight, 2200);

    cleanupRef.current = () => {
      observer.disconnect();
      frameWindow.removeEventListener("resize", updateFrameHeight);
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [updateFrameHeight]);

  useEffect(() => () => cleanupRef.current(), []);

  return (
    <div style={{ width: "100%", minHeight: compact ? 760 : "100vh", background: "#fff" }}>
      <iframe
        ref={frameRef}
        src={`/templates/flowerShop1/${page}`}
        title={title}
        scrolling="yes"
        onLoad={handleLoad}
        style={{
          display: "block",
          width: "100%",
          height: compact ? `${Math.min(frameHeight, 2200)}px` : `${frameHeight}px`,
          minHeight: compact ? 760 : "100vh",
          border: 0,
          background: "#fff",
          overflow: "auto",
        }}
      />
    </div>
  );
}
