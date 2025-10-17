// src/components/pages/MyBids.tsx
'use client';

import React, { useState } from 'react';
import { mockUserBids } from '@/data/mockData';
import { UserBid } from '@/types/auction';
import Image from "next/image";

const MyBids: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Payment / escrow simulation state
  type PaymentState =
    | 'idle'
    | 'initiated'
    | 'processing'
    | 'escrowed'
    | 'transferring'
    | 'completed'
    | 'failed'
    | 'cancelled';

  type PaymentInfo = {
    status: PaymentState;
    txId?: string;
    logs: string[];
    error?: string;
  };

  const [paymentInfos, setPaymentInfos] = useState<Record<number, PaymentInfo>>({});
  const [activePaymentBidId, setActivePaymentBidId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Mock payment gateway (PayMongo) modal state
  const [isPaymentGatewayOpen, setIsPaymentGatewayOpen] = useState(false);
  const [paymentGatewayBidId, setPaymentGatewayBidId] = useState<number | null>(null);

  const setPaymentInfo = (bidId: number, patch: Partial<PaymentInfo>) => {
    setPaymentInfos(prev => {
      const existing = prev[bidId] || { status: 'idle', logs: [] } as PaymentInfo;
      return {
        ...prev,
        [bidId]: {
          ...existing,
          ...patch,
        },
      };
    });
  };

  const appendLog = (bidId: number, line: string) => {
    setPaymentInfos(prev => ({
      ...prev,
      [bidId]: {
        ...(prev[bidId] || { status: 'idle', logs: [] }),
        logs: [...((prev[bidId] && prev[bidId].logs) || []), `${new Date().toLocaleTimeString()}: ${line}`],
      },
    }));
  };

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const startEscrowFlow = async (bidId: number) => {
    setActivePaymentBidId(bidId);
    setIsModalOpen(true);
    setPaymentInfo(bidId, { status: 'initiated', txId: undefined, logs: [], error: undefined });
    appendLog(bidId, 'Initiating payment to third-party escrow provider...');

    try {
      // Step 1 - processing
      setPaymentInfo(bidId, { status: 'processing' });
      appendLog(bidId, 'Processing payment. Redirecting to escrow gateway...');
      await wait(1200);

      // simulate gateway failure small chance
      if (Math.random() < 0.12) {
        throw new Error('Payment gateway rejected the transaction (insufficient funds).');
      }

      // Step 2 - escrow holds funds
      setPaymentInfo(bidId, { status: 'escrowed' });
      appendLog(bidId, 'Escrow provider has received and is holding funds securely.');
      await wait(1400);

      // Step 3 - transfer in progress
      setPaymentInfo(bidId, { status: 'transferring' });
      appendLog(bidId, 'Initiating vehicle transfer from seller to buyer. Awaiting confirmation...');
      await wait(1800);

      // simulate transfer verification issue
      if (Math.random() < 0.08) {
        throw new Error('Title transfer verification failed. Escrow awaiting resolution.');
      }

      // Step 4 - complete
      const txId = `ESC-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
      setPaymentInfo(bidId, { status: 'completed', txId });
      appendLog(bidId, `Transfer confirmed. Escrow released funds to seller. Transaction ID: ${txId}`);
      await wait(600);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err || 'Unknown error during escrow process');
      setPaymentInfo(bidId, { status: 'failed', error: message });
      appendLog(bidId, `ERROR: ${message}`);
    }
  };

  const handleRetryPayment = (bidId: number) => {
    setPaymentInfos(prev => {
      const copy = { ...prev };
      delete copy[bidId];
      return copy;
    });
    startEscrowFlow(bidId);
  };

  // Mock PayMongo gateway flow: open modal, confirm payment, then start escrow
  const confirmMockPayment = async (bidId: number) => {
    if (bidId === null) return;
    // simulate payment authorization
    setIsPaymentGatewayOpen(false);
    const fakeToken = `PMG-${Math.random().toString(36).slice(2,9).toUpperCase()}`;
    // record initial payment info log
    setPaymentInfo(bidId, { status: 'initiated', logs: [`Payment authorized token: ${fakeToken}`] });
    appendLog(bidId, `Payment gateway returned token ${fakeToken}. Proceeding to escrow.`);
    // small delay then start escrow
    await wait(600);
    startEscrowFlow(bidId);
  };

  const cancelMockPayment = () => {
    setIsPaymentGatewayOpen(false);
    setPaymentGatewayBidId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActivePaymentBidId(null);
  };

  const getStatusColor = (status: UserBid['status']) => {
    switch (status) {
      case 'winning': return 'bg-green-100 text-green-800';
      case 'outbid': return 'bg-red-100 text-red-800';
      case 'won': return 'bg-blue-100 text-blue-800';
      case 'lost': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBids = statusFilter === 'all' 
    ? mockUserBids 
    : mockUserBids.filter(bid => bid.status === statusFilter);

  const handleViewAuction = (bidId: number) => {
    console.log('Viewing auction for bid:', bidId);
    // Navigate to auction detail
  };

  const handleBidAgain = (bidId: number) => {
    console.log('Bidding again on:', bidId);
    // Navigate to auction and open bid form
  };

  const handlePayNow = (bidId: number) => {
    const p = paymentInfos[bidId];
    // If there's an in-flight process, just open modal
    if (p && (p.status === 'processing' || p.status === 'transferring' || p.status === 'escrowed' || p.status === 'initiated')) {
      setActivePaymentBidId(bidId);
      setIsModalOpen(true);
      return;
    }
    // Instead of immediately starting escrow, open the mock payment gateway first
    setPaymentGatewayBidId(bidId);
    setIsPaymentGatewayOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Bids</h2>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="winning">Winning</option>
          <option value="outbid">Outbid</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {filteredBids.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-400 text-2xl">🔨</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bids found</h3>
          <p className="text-gray-500 mb-4">
            {statusFilter === 'all' 
              ? "You haven't placed any bids yet." 
              : `No bids with status: ${statusFilter}`
            }
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
            Browse Auctions
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  My Bid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Bid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Left
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBids.map(bid => (
                <tr key={bid.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Image
                        src={bid.image}
                        alt={bid.carTitle}
                        width={1000}
                        height={1000}
                        className="w-14 h-10 bg-gray-300 rounded-lg object-cover flex-shrink-0 mr-1"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bid.carTitle}</div>
                        <div className="text-sm text-gray-500">
                          Auction ends: {new Date(bid.auctionEnd).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${bid.myBid.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {bid.status === 'winning' && 'Your highest bid'}
                      {bid.status === 'outbid' && 'Outbid'}
                      {bid.status === 'won' && 'Winning bid'}
                      {bid.status === 'lost' && 'Final bid'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${bid.currentBid.toLocaleString()}
                    </div>
                    {bid.currentBid > bid.myBid && (
                      <div className="text-sm text-red-600">
                        +${(bid.currentBid - bid.myBid).toLocaleString()} higher
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bid.status)}`}>
                      {bid.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      bid.timeLeft === 'Ended' 
                        ? 'text-gray-500' 
                        : bid.timeLeft.includes('h') && !bid.timeLeft.includes('d')
                        ? 'text-red-600' 
                        : 'text-gray-900'
                    }`}>
                      {bid.timeLeft}
                    </div>
                    {bid.timeLeft !== 'Ended' && (
                      <div className="text-xs text-gray-500">
                        {bid.timeLeft.includes('h') && !bid.timeLeft.includes('d') ? 'Ending soon!' : 'Active'}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleViewAuction(bid.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    {bid.status === 'outbid' && bid.timeLeft !== 'Ended' && (
                      <button 
                        onClick={() => handleBidAgain(bid.id)}
                        className="text-blue-600 hover:text-blue-900 ml-3"
                      >
                        Bid Again
                      </button>
                    )}
                    {bid.status === 'won' && (
                      (() => {
                        const pinfo = paymentInfos[bid.id];
                        const isProcessing = pinfo && (pinfo.status === 'processing' || pinfo.status === 'transferring' || pinfo.status === 'escrowed' || pinfo.status === 'initiated');
                        return (
                          <button
                            onClick={() => handlePayNow(bid.id)}
                            disabled={isProcessing}
                            className={`ml-3 px-3 py-1 rounded-lg text-sm font-medium ${isProcessing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                          >
                            {pinfo ? (pinfo.status === 'failed' ? 'Retry' : (isProcessing ? 'Processing…' : 'Pay now')) : 'Pay now'}
                          </button>
                        );
                      })()
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Stats */}
      {filteredBids.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">
              {mockUserBids.filter(bid => bid.status === 'winning').length}
            </div>
            <div className="text-sm text-gray-600">Currently Winning</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-red-600">
              {mockUserBids.filter(bid => bid.status === 'outbid').length}
            </div>
            <div className="text-sm text-gray-600">Outbid</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {mockUserBids.filter(bid => bid.status === 'won').length}
            </div>
            <div className="text-sm text-gray-600">Won</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-600">
              {mockUserBids.length}
            </div>
            <div className="text-sm text-gray-600">Total Bids</div>
          </div>
        </div>
      )}

      {/* Payment / Escrow Modal */}
      {isModalOpen && activePaymentBidId !== null && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={closeModal} />
          <div className="relative w-full sm:max-w-xl mx-4 sm:mx-0 bg-white rounded-t-lg sm:rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Escrow Payment</h3>
                  <p className="text-sm text-gray-500 mt-1">Simulated 3‑way escrow flow for bid #{activePaymentBidId}</p>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 ml-4 text-sm">Close</button>
              </div>

              <div className="mt-4">
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">1</div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">Initiate Payment</div>
                      <div className="text-xs text-gray-500">User authorizes payment to third-party escrow provider.</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">2</div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">Escrow Holds Funds</div>
                      <div className="text-xs text-gray-500">Escrow confirms receipt and holds funds until transfer completes.</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">3</div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">Transfer & Verification</div>
                      <div className="text-xs text-gray-500">Seller transfers vehicle; escrow verifies title and condition.</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">4</div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">Release Funds</div>
                      <div className="text-xs text-gray-500">Upon confirmation, escrow releases funds to seller and completes transaction.</div>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium">Process status</h4>
                <div className="mt-2 border rounded-md bg-gray-50 p-3 text-xs">
                  <div className="mb-2">
                    <span className="font-medium">Status:</span>{' '}
                    <span className="ml-2 text-sm">{paymentInfos[activePaymentBidId]?.status?.toUpperCase() || 'IDLE'}</span>
                  </div>
                  {paymentInfos[activePaymentBidId]?.txId && (
                    <div className="mb-2">
                      <span className="font-medium">Escrow TX:</span>{' '}
                      <span className="ml-2 text-sm">{paymentInfos[activePaymentBidId]?.txId}</span>
                    </div>
                  )}
                  {paymentInfos[activePaymentBidId]?.error && (
                    <div className="mb-2 text-red-600"><strong>Error: </strong>{paymentInfos[activePaymentBidId]?.error}</div>
                  )}

                  <div className="max-h-40 overflow-auto text-xs text-gray-700 mt-2">
                    {(paymentInfos[activePaymentBidId]?.logs || []).map((l, i) => (
                      <div key={i} className="py-0.5">{l}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:justify-end gap-2">
                {paymentInfos[activePaymentBidId]?.status === 'failed' ? (
                  <>
                    <button onClick={() => { if (activePaymentBidId !== null) handleRetryPayment(activePaymentBidId); }} className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white rounded-lg">Retry Payment</button>
                    <button onClick={closeModal} className="w-full sm:w-auto px-4 py-2 border rounded-lg">Close</button>
                  </>
                ) : paymentInfos[activePaymentBidId]?.status === 'completed' ? (
                  <>
                    <a href="#" onClick={(e) => e.preventDefault()} className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg text-center">View Receipt</a>
                    <button onClick={closeModal} className="w-full sm:w-auto px-4 py-2 border rounded-lg">Done</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { if (activePaymentBidId !== null) handleRetryPayment(activePaymentBidId); }} className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">Restart</button>
                    <button onClick={closeModal} className="w-full sm:w-auto px-4 py-2 border rounded-lg">Close</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mock PayMongo Gateway Modal */}
      {isPaymentGatewayOpen && paymentGatewayBidId !== null && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={cancelMockPayment} />
          <div className="relative w-full sm:max-w-md mx-4 sm:mx-0 bg-white rounded-t-lg sm:rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Pay with PayMongo (Mock)</h3>
                  <p className="text-sm text-gray-500 mt-1">Simulated payment gateway for demo purposes.</p>
                </div>
                <button onClick={cancelMockPayment} className="text-gray-400 hover:text-gray-600 ml-4 text-sm">Close</button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-700">Amount: <strong>${mockUserBids.find(b => b.id === paymentGatewayBidId)?.myBid.toLocaleString()}</strong></p>
                <p className="text-xs text-gray-500 mt-2">This is a mocked PayMongo flow. Confirm to authorize payment and proceed to escrow.</p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-2">
                <button onClick={() => confirmMockPayment(paymentGatewayBidId)} className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg">Authorize Payment</button>
                <button onClick={cancelMockPayment} className="w-full sm:w-auto px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBids;