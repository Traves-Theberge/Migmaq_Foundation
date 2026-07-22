import Link from 'next/link';
import { requireStaffProfile } from '@/lib/supabase/auth';
import DictionaryWordForm from '@/components/admin/DictionaryWordForm';

const BLANK = {
    word: '',
    type: null,
    definitions: [],
    translations: [],
    pronunciation_guide: null,
    entry_url: null,
    fr_definitions: null,
    fr_translations: null,
    alternate_forms: null,
    document_references: null,
    fr_reviewed: false,
    usages: [],
};

export default async function NewDictionaryWordPage() {
    await requireStaffProfile();

    return (
        <div>
            <Link href="/admin/dictionary" className="text-[11.5px] font-bold uppercase tracking-wide text-primary hover:underline">
                ← Dictionary
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-2 mb-6">New word</h1>
            <DictionaryWordForm word={BLANK} />
        </div>
    );
}
