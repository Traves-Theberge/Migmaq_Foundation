import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
    alternates: { canonical: SITE_URL },
};

export default function HomePage() {
    return <HomeClient />;
}
