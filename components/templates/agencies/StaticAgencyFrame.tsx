"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type StaticAgencyFrameProps = {
  agencyNumber: number;
  page: string;
  title: string;
};

export default function StaticAgencyFrame({ agencyNumber, page, title }: StaticAgencyFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const cleanupRef = useRef<() => void>(() => {});
  const [frameHeight, setFrameHeight] = useState(9000);

  const unlockPreviewScroll = useCallback(() => {
    const doc = frameRef.current?.contentDocument;

    if (!doc || doc.getElementById("shata-agency-preview-scroll-fix")) {
      return;
    }

    const style = doc.createElement("style");
    style.id = "shata-agency-preview-scroll-fix";
    style.textContent = `
      html,
      body {
        height: auto !important;
        min-height: 100% !important;
        overflow: visible !important;
      }

      body {
        position: static !important;
      }

      #smooth-wrapper,
      #smooth-content {
        height: auto !important;
        min-height: 100vh !important;
        overflow: visible !important;
        transform: none !important;
      }
    `;
    doc.head.appendChild(style);
  }, []);

  const updateFrameHeight = useCallback(() => {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;

    if (!frame || !doc) {
      return;
    }

    const measuredElements = [
      doc.documentElement,
      doc.body,
      doc.getElementById("smooth-wrapper"),
      doc.getElementById("smooth-content"),
    ].filter(Boolean) as HTMLElement[];

    const childBottom = Array.from(doc.body?.children ?? []).reduce((bottom, child) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      return Math.max(bottom, Math.ceil(rect.bottom));
    }, 0);

    const measuredHeight = measuredElements.reduce((height, element) => {
      const rectHeight = Math.ceil(element.getBoundingClientRect().height);
      return Math.max(height, element.scrollHeight, element.offsetHeight, rectHeight);
    }, Math.max(window.innerHeight, childBottom));

    setFrameHeight((currentHeight) =>
      Math.abs(currentHeight - measuredHeight) > 4 ? measuredHeight : currentHeight,
    );
  }, []);

  const handleLoad = useCallback(() => {
    cleanupRef.current();
    unlockPreviewScroll();
    updateFrameHeight();

    const frameWindow = frameRef.current?.contentWindow;
    const frameDocument = frameRef.current?.contentDocument;

    if (!frameWindow || !frameDocument) {
      return;
    }

    const watchedElements = [
      frameDocument.documentElement,
      frameDocument.body,
      frameDocument.getElementById("smooth-wrapper"),
      frameDocument.getElementById("smooth-content"),
    ].filter(Boolean) as HTMLElement[];

    const observer = new ResizeObserver(updateFrameHeight);
    watchedElements.forEach((element) => observer.observe(element));

    frameWindow.addEventListener("resize", updateFrameHeight);
    const interval = window.setInterval(updateFrameHeight, 500);
    const timeout = window.setTimeout(updateFrameHeight, 2000);

    cleanupRef.current = () => {
      observer.disconnect();
      frameWindow.removeEventListener("resize", updateFrameHeight);
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [unlockPreviewScroll, updateFrameHeight]);

  useEffect(() => () => cleanupRef.current(), []);

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#050505" }}>
      <iframe
        ref={frameRef}
        src={`/templates/agency${agencyNumber}/pages/${page}`}
        title={title}
        scrolling="yes"
        onLoad={handleLoad}
        style={{
          display: "block",
          width: "100%",
          height: `${frameHeight}px`,
          minHeight: "100vh",
          border: 0,
          background: "#050505",
          overflow: "auto",
        }}
      />
    </div>
  );
}
