export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 text-center py-6 mt-10">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        © {new Date().getFullYear()} Shata Solutions. All rights reserved.
      </p>
    </footer>
  );
}