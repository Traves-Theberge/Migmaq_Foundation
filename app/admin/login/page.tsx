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
                    <div className="inline-flex w-12 h-12 rounded-full bg-accent items-center justify-center font-black text-xl mb-4">
                        M
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Admin Sign In</h1>
                    <p className="text-sm text-muted-foreground mt-1">Mi&apos;gmaq Foundation</p>
                </div>
                <LoginForm next={next ?? '/admin'} notAuthorized={error === 'not-authorized'} />
            </div>
        </div>
    );
}
