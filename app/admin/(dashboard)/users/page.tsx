import { createClient } from '@/lib/supabase/server';
import { requireStaffProfile } from '@/lib/supabase/auth';
import Avatar from '@/components/admin/Avatar';
import RoleSelect from '@/components/admin/RoleSelect';

export const dynamic = 'force-dynamic';

const ROLE_BADGE: Record<string, string> = {
    super_admin: 'bg-accent/15 text-accent-ink',
    admin: 'bg-primary/10 text-primary',
    editor: 'bg-muted text-muted-foreground',
};

export default async function UsersPage() {
    const profile = await requireStaffProfile();
    const supabase = await createClient();

    const { data } = await supabase
        .from('profiles')
        .select('id, email, role, avatar_url, created_at')
        .order('created_at', { ascending: true });

    const users = data ?? [];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-black uppercase tracking-tight">Users &amp; Roles</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {profile.role === 'super_admin'
                        ? 'Every staff account with dashboard access. Only you can change roles.'
                        : 'Every staff account with dashboard access. Ask a super_admin to change roles.'}
                </p>
            </div>

            <div className="border-[3px] border-foreground bg-card">
                <div className="divide-y-2 divide-muted">
                    {users.map((u) => (
                        <div key={u.id} className="flex items-center gap-3 px-4 py-3">
                            <Avatar userId={u.id} src={u.avatar_url} size={34} />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold truncate">
                                    {u.email}
                                    {u.id === profile.id && <span className="ml-1.5 text-[10.5px] font-normal text-muted-foreground">(you)</span>}
                                </div>
                                <div className="text-[11px] text-muted-foreground mt-0.5">
                                    Joined {new Date(u.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </div>
                            </div>
                            {profile.role === 'super_admin' && u.id !== profile.id ? (
                                <RoleSelect userId={u.id} role={u.role} />
                            ) : (
                                <span className={`text-[10.5px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1 ${ROLE_BADGE[u.role] ?? 'bg-muted text-muted-foreground'}`}>
                                    {u.role.replace('_', ' ')}
                                </span>
                            )}
                        </div>
                    ))}
                    {users.length === 0 && <p className="text-sm text-muted-foreground p-6 text-center">No staff accounts found.</p>}
                </div>
            </div>
        </div>
    );
}
