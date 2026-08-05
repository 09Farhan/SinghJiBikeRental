'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  preferredBike?: string;
  pickupLocation?: string;
  rentalDate?: string;
  source: string;
  status: 'NEW' | 'READ' | 'REPLIED';
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSource, setFilterSource] = useState('');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('q', search);
      if (filterStatus) params.append('status', filterStatus);
      if (filterSource) params.append('source', filterSource);

      const res = await fetch(`/api/admin/messages?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setMessages(json.data);
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [search, filterStatus, filterSource]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Failed to delete message', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Messages Inbox</h1>
          <p className="text-gray-400">Manage contact inquiries and popup leads.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0a0e1a] border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-[#0a0e1a] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
        >
          <option value="">All Statuses</option>
          <option value="NEW">New (Unread)</option>
          <option value="READ">Read</option>
          <option value="REPLIED">Replied</option>
        </select>
        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
          className="bg-[#0a0e1a] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
        >
          <option value="">All Sources</option>
          <option value="CONTACT_FORM">Contact Form</option>
          <option value="POPUP_LEAD">Popup Lead</option>
        </select>
      </div>

      {/* Inbox List */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white">No messages found</h3>
            <p className="text-gray-400 mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a0e1a]/50 border-b border-gray-800 text-sm text-gray-400">
                  <th className="p-4 font-medium whitespace-nowrap">Status</th>
                  <th className="p-4 font-medium">Contact Details</th>
                  <th className="p-4 font-medium">Message / Request</th>
                  <th className="p-4 font-medium whitespace-nowrap">Source & Date</th>
                  <th className="p-4 font-medium text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 align-top">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        msg.status === 'NEW' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                        msg.status === 'REPLIED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        'bg-gray-800 text-gray-300 border-gray-700'
                      }`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-medium text-white">{msg.name}</div>
                      <div className="text-sm text-gray-400 mt-1">
                        <a href={`mailto:${msg.email}`} className="hover:text-amber-400 transition-colors block">{msg.email}</a>
                        <a href={`tel:${msg.phone}`} className="hover:text-amber-400 transition-colors block mt-0.5">{msg.phone}</a>
                      </div>
                    </td>
                    <td className="p-4 align-top max-w-md">
                      {msg.message && (
                        <p className="text-sm text-gray-300 mb-2 whitespace-pre-wrap">{msg.message}</p>
                      )}
                      
                      {(msg.preferredBike || msg.pickupLocation || msg.rentalDate) && (
                        <div className="bg-[#0a0e1a] rounded-lg p-3 text-xs space-y-1.5 border border-gray-800">
                          {msg.preferredBike && <div className="flex"><span className="text-gray-500 w-24">Bike:</span> <span className="text-gray-300">{msg.preferredBike}</span></div>}
                          {msg.pickupLocation && <div className="flex"><span className="text-gray-500 w-24">Location:</span> <span className="text-gray-300">{msg.pickupLocation}</span></div>}
                          {msg.rentalDate && <div className="flex"><span className="text-gray-500 w-24">Date:</span> <span className="text-gray-300">{msg.rentalDate}</span></div>}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top whitespace-nowrap text-sm">
                      <div className="flex items-center gap-1.5 mb-1 text-gray-300">
                        {msg.source === 'POPUP_LEAD' ? (
                          <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">POPUP</span>
                        ) : (
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">CONTACT</span>
                        )}
                      </div>
                      <div className="text-gray-500">
                        {format(new Date(msg.createdAt), 'MMM d, yyyy')}
                        <div className="text-xs">{format(new Date(msg.createdAt), 'h:mm a')}</div>
                      </div>
                    </td>
                    <td className="p-4 align-top text-right">
                      <div className="flex flex-col items-end gap-2">
                        {msg.status === 'NEW' && (
                          <button onClick={() => updateStatus(msg.id, 'READ')} className="text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors">
                            Mark Read
                          </button>
                        )}
                        {msg.status !== 'REPLIED' && (
                          <button onClick={() => updateStatus(msg.id, 'REPLIED')} className="text-xs font-medium text-green-400 hover:text-green-300 transition-colors">
                            Mark Replied
                          </button>
                        )}
                        <button onClick={() => deleteMessage(msg.id)} className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors mt-2">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
