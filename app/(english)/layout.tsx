import type { Viewport } from 'next';
import { DocumentShell } from '@/components/document-shell';
import { localizedMetadata } from '@/lib/i18n';
export const metadata = localizedMetadata('en');
export const viewport: Viewport = { themeColor: '#F9F9F9', width: 'device-width', initialScale: 1 };
export default function Layout({children}: {children:React.ReactNode}) { return <DocumentShell locale="en">{children}</DocumentShell>; }
