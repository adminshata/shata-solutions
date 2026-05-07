"use client";
import Link from 'next/link';
import SideMenu from "./SideMenu";

const BP = "/templates/supermarket-4/preview";
const DASH = `${BP}/dashboard`;

interface Props { collapsed: boolean; }

function SideLeft({ collapsed }: Props) {
  return (
    <div className={`sidebar_left ${collapsed ? 'collapsed' : ''}`}>
      <Link href={DASH} className="logo" style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', textDecoration: 'none' }}>
        <span style={{ fontWeight: 700, fontSize: '20px', color: 'var(--color-primary)' }}>OrangeMart</span>
      </Link>
      <SideMenu />
    </div>
  );
}
export default SideLeft;
