import Link from 'next/link';
import Image from 'next/image';
import LoginForm from './LoginForm';

export const metadata = {
    title: 'Admin Sign In',
};

interface PageProps {
    searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
    const { next, error } = await searchParams;

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex w-12 h-12 items-center justify-center mb-4">
                        <Image
                            src="/assets/Images/fn_logo.png"
                            alt="Mi'gmaq Foundation"
                            width={48}
                            height={48}
                            priority
                            className="w-12 h-12 object-contain"
                        />
                    </Link>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Admin Sign In</h1>
                    <p className="text-sm text-muted-foreground mt-1">Mi&apos;gmaq Foundation</p>
                </div>
                <LoginForm next={next ?? '/admin'} notAuthorized={error === 'not-authorized'} />
                <p className="mt-8 text-center text-sm">
                    <Link href="/" className="text-muted-foreground hover:text-foreground underline underline-offset-4">
                        &larr; Back to the main site
                    </Link>
                </p>
            </div>
        </div>
    );
}
