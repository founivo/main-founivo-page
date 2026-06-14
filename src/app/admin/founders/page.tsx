'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { PageWrapper } from '@/components/shared/PageWrapper';
import Button from '@/components/ui/Button';
import { CheckCircle, XCircle, Loader2, ExternalLink } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

interface FounderApplication {
  id: string;
  role: string;
  company: string;
  category: string;
  bio: string;
  linkedin: string;
  twitter: string;
  website: string;
  status: string;
  profiles: {
    full_name: string;
    email: string;
  };
}

// TODO: Replace with your actual admin email
const ADMIN_EMAIL = 'nihalraza369@gmail.com'; 

export default function AdminFoundersPage() {
  const { user, loading: userLoading } = useUser();
  const supabase = createClient();
  const router = useRouter();
  
  const [applications, setApplications] = useState<FounderApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actioningId, setActioningId] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('founder_profiles')
        .select(`
          *,
          profiles:id (
            full_name,
            email
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications((data as unknown as FounderApplication[]) || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (!userLoading) {
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push('/');
      } else {
        const timer = setTimeout(() => {
          fetchApplications();
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [user, userLoading, router, fetchApplications]);

  async function handleAction(id: string, status: 'approved' | 'rejected') {
    try {
      setActioningId(id);
      const { error } = await supabase
        .from('founder_profiles')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (err: unknown) {
      alert('Error updating status: ' + (err instanceof Error ? err.message : 'An unknown error occurred'));
    } finally {
      setActioningId(null);
    }
  }

  if (userLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#0F6E56]" />
      </div>
    );
  }

  if (user?.email !== ADMIN_EMAIL) return null;

  return (
    <PageWrapper>
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-[#04342C] mb-2">Founder Applications</h1>
        <p className="text-[#3a6b57]">Review and approve founders to join the directory.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl mb-8">
          {error}
        </div>
      )}

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500">No pending applications found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-[#04342C]">{app.profiles?.full_name}</h2>
                    <span className="px-3 py-1 bg-[#E1F5EE] text-[#0F6E56] text-xs font-bold rounded-full uppercase tracking-wider">
                      {app.category}
                    </span>
                  </div>
                  <p className="text-[#0F6E56] font-medium mb-4">{app.role} @ {app.company}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <p className="text-sm text-gray-600 leading-relaxed italic">&quot;{app.bio}&quot;</p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {app.linkedin && (
                      <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-[#0F6E56] hover:underline">
                        LinkedIn <ExternalLink size={14} />
                      </a>
                    )}
                    {app.twitter && (
                      <a href={app.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-[#0F6E56] hover:underline">
                        Twitter <ExternalLink size={14} />
                      </a>
                    )}
                    {app.website && (
                      <a href={app.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-[#0F6E56] hover:underline">
                        Website <ExternalLink size={14} />
                      </a>
                    )}
                    <span className="text-sm text-gray-400">Email: {app.profiles?.email}</span>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-3 justify-center">
                  <Button 
                    onClick={() => handleAction(app.id, 'approved')}
                    disabled={!!actioningId}
                    className="bg-[#0F6E56] text-white py-3 px-6 rounded-xl flex items-center gap-2"
                  >
                    {actioningId === app.id ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                    Approve
                  </Button>
                  <Button 
                    onClick={() => handleAction(app.id, 'rejected')}
                    disabled={!!actioningId}
                    className="bg-white border border-red-200 text-red-600 hover:bg-red-50 py-3 px-6 rounded-xl flex items-center gap-2"
                  >
                    <XCircle size={18} />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}