import { DemoPage } from '@/components/demo-page';
import { localizedMetadata } from '@/lib/i18n';

export const metadata = localizedMetadata('es', 'demo');
export default function Demo() { return <DemoPage locale="es" />; }
