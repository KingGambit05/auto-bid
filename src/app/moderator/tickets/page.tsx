// app/(moderator)/tickets/page.tsx
"use client";

import React, { useState } from 'react';
import { MessageSquare, Search, Send, Clock, User } from 'lucide-react';
import { DataTable, StatusBadge, TabNavigation, Column, Tab } from '@/components/admin';
import { mockSupportTickets } from '@/lib/mockData/transactionData';
import { SupportTicket } from '@/types/admin';
import { formatDate, timeAgo } from '@/lib/utils';

export default function SupportTicketsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Filter tickets by status
  const filteredTickets = mockSupportTickets.filter((ticket) => {
    if (activeTab === 'all') return true;
    return ticket.status === activeTab;
  });

  // Tabs
  const tabs: Tab[] = [
    { id: 'all', label: 'All Tickets', count: mockSupportTickets.length },
    { id: 'open', label: 'Open', count: mockSupportTickets.filter((t) => t.status === 'open').length },
    { id: 'in_progress', label: 'In Progress', count: mockSupportTickets.filter((t) => t.status === 'in_progress').length },
    { id: 'waiting_response', label: 'Waiting', count: mockSupportTickets.filter((t) => t.status === 'waiting_response').length },
    { id: 'resolved', label: 'Resolved', count: mockSupportTickets.filter((t) => t.status === 'resolved').length },
  ];

  // Table columns
  const columns: Column<SupportTicket>[] = [
    {
      key: 'ticketNumber',
      title: 'Ticket',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-mono text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{row.category}</p>
        </div>
      ),
    },
    {
      key: 'subject',
      title: 'Subject',
      sortable: true,
      render: (value) => (
        <p className="text-sm text-gray-900 dark:text-white line-clamp-2">{value}</p>
      ),
    },
    {
      key: 'userName',
      title: 'User',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{row.userEmail}</p>
        </div>
      ),
    },
    {
      key: 'priority',
      title: 'Priority',
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === 'urgent'
              ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
              : value === 'high'
              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400'
              : value === 'medium'
              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'updatedAt',
      title: 'Last Updated',
      sortable: true,
      render: (value) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{formatDate(value)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(value)}</p>
        </div>
      ),
    },
  ];

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedTicket) return;
    // Simulate sending reply
    alert(`Reply sent to ticket ${selectedTicket.ticketNumber}`);
    setReplyMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Support Tickets</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage customer support inquiries and issues
        </p>
      </div>

      {/* Tabs */}
      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-2">
          <DataTable
            data={filteredTickets}
            columns={columns}
            keyExtractor={(item) => item.id}
            onRowClick={(ticket) => setSelectedTicket(ticket)}
            emptyMessage="No tickets found"
            pageSize={10}
            showPagination
          />
        </div>

        {/* Ticket Detail Panel */}
        <div className="lg:col-span-1">
          {selectedTicket ? (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 sticky top-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                    {selectedTicket.ticketNumber}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                    {selectedTicket.subject}
                  </h3>
                </div>
                <StatusBadge status={selectedTicket.status} />
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white">{selectedTicket.userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedTicket.userEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white">
                      Created {timeAgo(selectedTicket.createdAt)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(selectedTicket.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Thread */}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Conversation
                </h4>
                <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                  {selectedTicket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg ${
                        message.senderType === 'user'
                          ? 'bg-gray-100 dark:bg-gray-800'
                          : 'bg-green-50 dark:bg-blue-900/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {message.senderName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {timeAgo(message.timestamp)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{message.message}</p>
                    </div>
                  ))}
                </div>

                {/* Reply Input */}
                {selectedTicket.status !== 'resolved' && selectedTicket.status !== 'closed' && (
                  <div className="space-y-2">
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
                    />
                    <button
                      onClick={handleSendReply}
                      disabled={!replyMessage.trim()}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      Send Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Select a ticket to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
