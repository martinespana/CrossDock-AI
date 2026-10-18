import { DemoPage } from '@/components/demo-page';
import { localizedMetadata } from '@/lib/i18n';

export const metadata = localizedMetadata('en', 'demo');
export default function Demo() { return <DemoPage locale="en" />; }
