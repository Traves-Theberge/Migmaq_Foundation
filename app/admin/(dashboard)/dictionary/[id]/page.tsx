import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import DictionaryWordForm from '@/components/admin/DictionaryWordForm';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditDictionaryWordPage({ params }: PageProps) {
    await requireStaffProfile();
    const { id } = await params;

    const supabase = await createClient();
    const { data: word } = await supabase
        .from('dictionary_words')
        .select('id, word, type, definitions, translations, pronunciation_guide, entry_url, fr_definitions, fr_translations, fr_reviewed')
        .eq('id', id)
        .single();

    if (!word) notFound();

    return (
        <div>
            <Link href="/admin/dictionary" className="text-[11.5px] font-bold uppercase tracking-wide text-primary hover:underline">
                ← Dictionary
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-2 mb-6">{word.word}</h1>
            <DictionaryWordForm word={word} />
        </div>
    );
}
