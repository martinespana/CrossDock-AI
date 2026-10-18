import type { SVGProps } from 'react';
type Props = SVGProps<SVGSVGElement>;

export function Arrow({ className = '', ...props }: Props) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} {...props}><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function Mark({ className = '', ...props }: Props) {
  return <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className} {...props}><path d="M7 7h9v9H7zm17 0h9v9h-9zM7 24h9v9H7zm17 0h9v9h-9z" fill="currentColor" /><path d="m12 12 16 16M28 12 12 28" stroke="currentColor" strokeWidth="4" /></svg>;
}
export function Icon({ name, ...props }: Props & { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></>,
    message: <><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l1.5-4A8.5 8.5 0 1 1 21 11.5Z" /><path d="M8 10h8m-8 4h5" /></>,
    location: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    system: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4M3 9h18m-14-2h.1m3 0h.1" /></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    file: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6M8 13h8m-8 4h5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    alert: <><path d="m12 3 10 18H2Z" /><path d="M12 9v5m0 3h.01" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    link: <><path d="m10 13 4-4m-6 6-2 2a4 4 0 0 1-5-6l4-4a4 4 0 0 1 6 0m2 2 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0" transform="translate(1 0)" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] ?? paths.grid}</svg>;
}
