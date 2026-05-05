"use client";

export default function GlobalStyles() {
  return (
    <style jsx global>{`
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .chat-pulse::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 9999px;
        background: rgba(59, 130, 246, 0.4);
        animation: pulseRing 2s infinite;
        z-index: -1;
      }

      @keyframes pulseRing {
        0% { transform: scale(1); opacity: 0.6; }
        70% { transform: scale(1.6); opacity: 0; }
        100% { opacity: 0; }
      }

      .dot {
        width: 6px;
        height: 6px;
        background: white;
        border-radius: 9999px;
        animation: bounce 1.2s infinite;
      }
      .dot:nth-child(2) { animation-delay: 0.2s; }
      .dot:nth-child(3) { animation-delay: 0.4s; }

      @keyframes bounce {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
      }

      @keyframes wave {
        0%, 100% { transform: scaleY(0.4); opacity: 0.6; }
        50% { transform: scaleY(1.2); opacity: 1; }
      }
      .animate-wave { animation: wave 1s infinite ease-in-out; }
      .delay-75 { animation-delay: 0.1s; }
      .delay-150 { animation-delay: 0.2s; }
      .delay-200 { animation-delay: 0.3s; }

      @keyframes blink {
        0% { opacity: 0; }
        50% { opacity: 0.4; }
        100% { opacity: 0; }
      }

      @keyframes fadeUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      @keyframes scaleIn {
        0% { opacity: 0; transform: translateY(-10px) scale(0.95); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

      .animate-scaleIn { animation: scaleIn 0.2s ease forwards; }

      @keyframes mobileFade {
        0% { opacity: 0; transform: translateY(-10px) scale(0.96); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes mobileItem {
        0% { opacity: 0; transform: translateY(8px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      @keyframes mobileSpring {
        0% { opacity: 0; transform: translateY(-12px) scale(0.96); }
        60% { opacity: 1; transform: translateY(4px) scale(1.01); }
        100% { transform: translateY(0) scale(1); }
      }

      @keyframes chat-pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); }
        50% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
      }
    `}</style>
  );
}
