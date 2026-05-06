"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const BP = "/templates/supermarket-2/preview";
const DA = "/templates/supermarket2/dashboard-assets";

interface HeaderProps { onToggleSidebar: () => void; }

export default function DashboardHeader({ onToggleSidebar }: HeaderProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) setActivePopup(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const togglePopup = (name: string) => setActivePopup(activePopup === name ? null : name);

  return (
    <header className="header-one">
      <div className="headerleft">
        <div className="collups-show-icon" onClick={onToggleSidebar}>
          <img src={`${DA}/icons/10.svg`} alt="toggle" width={20} height={20} />
          <i className="fa-light fa-arrow-right" />
        </div>
      </div>
      <div className="header-right">
        <div className="action-interactive-area__header" ref={popupRef}>
          <div className={`single_action__haeader search-action ${activePopup === 'search' ? 'active' : ''}`} onClick={() => togglePopup('search')}>
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none"><path d="M18.1247 17.2413L13.4046 12.5213C14.5388 11.1596 15.1044 9.41313 14.9837 7.6451C14.863 5.87707 14.0653 4.22363 12.7566 3.02875C11.4479 1.83388 9.72885 1.18955 7.95716 1.22981C6.18548 1.27007 4.49752 1.99182 3.24442 3.24491C1.99133 4.498 1.26958 6.18597 1.22932 7.95765C1.18906 9.72934 1.83339 11.4483 3.02827 12.7571C4.22315 14.0658 5.87658 14.8635 7.64461 14.9842C9.41264 15.1049 11.1591 14.5393 12.5208 13.4051L17.2408 18.1251L18.1247 17.2413ZM2.49966 8.12515C2.49966 7.01263 2.82956 5.92509 3.44764 5.00006C4.06573 4.07504 4.94423 3.35407 5.97206 2.92833C6.9999 2.50258 8.1309 2.39119 9.22204 2.60823C10.3132 2.82527 11.3155 3.361 12.1021 4.14767C12.8888 4.93434 13.4245 5.93662 13.6416 7.02776C13.8586 8.11891 13.7472 9.24991 13.3215 10.2777C12.8957 11.3056 12.1748 12.1841 11.2497 12.8022C10.3247 13.4202 9.23718 13.7501 8.12466 13.7501C6.63332 13.7485 5.20354 13.1553 4.14901 12.1008C3.09448 11.0463 2.50131 9.61648 2.49966 8.12515Z" fill="#525252" /></svg>
            <div className="search-opoup slide-down__click" style={{ display: activePopup === 'search' ? 'block' : 'none' }} onClick={e => e.stopPropagation()}>
              <input type="text" placeholder="Search" onClick={e => e.stopPropagation()} />
              <i className="fa-solid fa-magnifying-glass" />
            </div>
          </div>
          <div className="single_action__haeader" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href={BP} style={{ fontSize: 12, color: 'var(--color-primary)', textDecoration: 'none', border: '1px solid var(--color-primary)', padding: '4px 12px', borderRadius: 4 }}>← Back to Site</Link>
          </div>
          <div className="single_action__haeader profile-img">
            <img src={`${DA}/avatar/user.svg`} alt="profile" width={36} height={36} style={{ borderRadius: '50%', cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    </header>
  );
}
