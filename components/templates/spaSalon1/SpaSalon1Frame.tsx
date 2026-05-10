"use client";
// components/templates/spaSalon1/SpaSalon1Frame.tsx
import { useEffect, useRef, useState } from "react";

interface SpaSalon1FrameProps {
  page: string; // e.g. "demo-1.html", "about.html"
  title?: string;
}

export default function SpaSalon1Frame({ page, title }: SpaSalon1FrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [frameHeight, setFrameHeight] = useState(9000);

  useEffect(() => {
    const updateHeight = () => {
      try {
        const doc =
          frameRef.current?.contentDocument ||
          frameRef.current?.contentWindow?.document;
        if (doc && doc.body) {
          const h = Math.max(
            doc.body.scrollHeight,
            doc.documentElement.scrollHeight,
            900
          );
          if (h > 100) setFrameHeight(h + 40);
        }
      } catch {
        // cross-origin or not ready
      }
    };

    const interval = setInterval(updateHeight, 500);
    const timeout = setTimeout(updateHeight, 2000);

    let observer: ResizeObserver | null = null;
    const attachObserver = () => {
      try {
        const doc =
          frameRef.current?.contentDocument ||
          frameRef.current?.contentWindow?.document;
        if (doc && doc.body) {
          observer = new ResizeObserver(updateHeight);
          observer.observe(doc.body);
        }
      } catch {
        // ignore
      }
    };

    const frame = frameRef.current;
    if (frame) {
      frame.addEventListener("load", () => {
        updateHeight();
        setTimeout(updateHeight, 500);
        setTimeout(updateHeight, 1500);
        attachObserver();
      });
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      observer?.disconnect();
    };
  }, [page]);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <iframe
        ref={frameRef}
        src={`/templates/spaSalon1/${page}`}
        title={title ?? page}
        width="100%"
        height={frameHeight}
        style={{ border: "none", display: "block" }}
        scrolling="no"
      />
    </div>
  );
}
