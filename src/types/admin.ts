// types/admin.ts

// User roles
export type UserRole = 'buyer' | 'seller' | 'both' | 'moderator' | 'admin';

// Status types
export type KYCStatus = 'pending' | 'approved' | 'rejected' | 'needs_review';
export type TransactionStatus = 'pending' | 'approved' | 'completed' | 'cancelled' | 'disputed';
export type DisputeStatus = 'open' | 'investigating' | 'resolved' | 'escalated' | 'closed';
export type TicketStatus = 'open' | 'in_progress' | 'waiting_response' | 'resolved' | 'closed';
export type ListingStatus = 'pending' | 'active' | 'sold' | 'removed' | 'flagged';
export type EscrowStatus = 'held' | 'released' | 'refunded' | 'disputed';
export type EvidenceStatus = 'pending' | 'approved' | 'rejected' | 'needs_clarification';

// Priority levels
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

// KYC Application
export interface KYCApplication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  submittedAt: string;
  status: KYCStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  documents: {
    idFront: string;
    idBack: string;
    selfie: string;
    proofOfAddress?: string;
  };
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    idNumber: string;
    idType: 'passport' | 'drivers_license' | 'national_id';
  };
  verificationChecks: {
    documentQuality: boolean;
    faceMatch: boolean;
    addressVerified: boolean;
    noFraud: boolean;
  };
  rejectionReason?: string;
  notes?: string;
}

// Support Ticket
export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  category: 'account' | 'payment' | 'auction' | 'technical' | 'other';
  priority: Priority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'moderator' | 'admin';
  message: string;
  timestamp: string;
  attachments?: string[];
}

// Transaction Review
export interface TransactionReview {
  id: string;
  auctionId: string;
  auctionTitle: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  agreedTerms: {
    price: number;
    pickupDate: string;
    pickupLocation: string;
    paymentMethod: string;
    shippingMethod: 'pickup' | 'delivery';
    additionalNotes?: string;
  };
  status: TransactionStatus;
  createdAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

// Escrow Transaction
export interface EscrowTransaction {
  id: string;
  transactionId: string;
  auctionId: string;
  auctionTitle: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  escrowStatus: EscrowStatus;
  heldSince: string;
  releaseScheduled?: string;
  releaseReason?: string;
  notes?: string;
}

// Content Moderation Item
export interface ModerationItem {
  id: string;
  type: 'listing' | 'message' | 'review' | 'profile';
  contentId: string;
  reportedBy: string;
  reportedAt: string;
  reason: 'spam' | 'inappropriate' | 'fraud' | 'harassment' | 'other';
  description: string;
  status: 'pending' | 'reviewing' | 'approved' | 'removed' | 'dismissed';
  priority: Priority;
  reviewedBy?: string;
  reviewedAt?: string;
  action?: 'none' | 'warning' | 'remove_content' | 'suspend_user' | 'ban_user';
}

// Shipping Evidence
export interface ShippingEvidence {
  id: string;
  transactionId: string;
  auctionTitle: string;
  submittedBy: 'seller' | 'buyer';
  submittedAt: string;
  status: EvidenceStatus;
  documents: {
    vinPhoto?: string;
    videoWalkthrough?: string;
    odometer?: string;
    exteriorPhotos: string[];
    interiorPhotos: string[];
    damagePhotos?: string[];
  };
  vehicleCondition: {
    vin: string;
    mileage: number;
    conditionNotes: string;
    damageDescription?: string;
  };
  gpsData?: {
    latitude: number;
    longitude: number;
    timestamp: string;
  };
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

// Delivery Evidence
export interface DeliveryEvidence {
  id: string;
  transactionId: string;
  auctionTitle: string;
  sellerEvidence: {
    submittedAt: string;
    photos: string[];
    signature?: string;
    notes: string;
    location?: string;
  };
  buyerEvidence: {
    submittedAt: string;
    photos: string[];
    signature?: string;
    notes: string;
    conditionReport: string;
    issuesReported: boolean;
    issues?: string[];
  };
  status: EvidenceStatus;
  comparisonNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

// Dispute Case
export interface DisputeCase {
  id: string;
  caseNumber: string;
  transactionId: string;
  auctionId: string;
  auctionTitle: string;
  initiatedBy: string;
  initiatorName: string;
  respondent: string;
  respondentName: string;
  category: 'payment' | 'vehicle_condition' | 'delivery' | 'fraud' | 'other';
  priority: Priority;
  status: DisputeStatus;
  createdAt: string;
  updatedAt: string;
  description: string;
  evidence: {
    documents: string[];
    photos: string[];
    videos: string[];
    messages: string[];
  };
  timeline: DisputeEvent[];
  assignedTo?: string;
  resolution?: {
    decision: string;
    refundAmount?: number;
    action: string;
    resolvedBy: string;
    resolvedAt: string;
  };
}

export interface DisputeEvent {
  id: string;
  type: 'created' | 'updated' | 'message' | 'evidence_added' | 'assigned' | 'resolved' | 'escalated';
  description: string;
  timestamp: string;
  actor: string;
  actorName: string;
}

// User (simplified for display)
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: 'active' | 'suspended' | 'banned' | 'locked' | 'inactive' | 'flagged';
  trustScore: number;
  joinedDate: string;
  lastActive: string;
  kycStatus: KYCStatus;
  phone?: string;
  address?: string;
  totalBids?: number;
  wonAuctions?: number;
  totalSpent?: number;
  totalListings?: number;
  soldAuctions?: number;
  totalEarned?: number;
  accountBalance?: number;
  warnings: number;
  suspensions: number;
  suspensionReason?: string;
  suspensionEndsAt?: string;
  lockReason?: string;
  flagReason?: string;
}

// User Management (detailed)
export interface UserManagement {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: 'active' | 'suspended' | 'banned' | 'locked';
  trustScore: number;
  memberSince: string;
  lastActive: string;
  verificationStatus: {
    email: boolean;
    phone: boolean;
    identity: boolean;
  };
  stats: {
    totalTransactions: number;
    successfulTransactions: number;
    disputes: number;
    warnings: number;
  };
  flags: {
    isSuspicious: boolean;
    hasActiveDispute: boolean;
    hasWarnings: boolean;
  };
}

// Fraud Alert
export interface FraudAlert {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: 'multiple_accounts' | 'suspicious_pattern' | 'document_fraud' | 'payment_fraud' | 'identity_mismatch';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'monitoring';
  detectedAt: string;
  resolvedAt?: string;
  description: string;
  indicators: string[];
  ipAddresses?: string[];
  devices?: {
    type: 'desktop' | 'mobile' | 'tablet';
    os: string;
    browser: string;
  }[];
  relatedUsers?: string[];
  assignedTo?: string;
  resolution?: string;
  notes?: string;
}

// System Metrics
export interface SystemMetrics {
  users: {
    total: number;
    active: number;
    new: number;
    verified: number;
  };
  auctions: {
    total: number;
    active: number;
    completed: number;
    pending: number;
  };
  transactions: {
    total: number;
    totalValue: number;
    pending: number;
    completed: number;
  };
  moderation: {
    pendingKYC: number;
    pendingReports: number;
    activeDisputes: number;
    openTickets: number;
  };
}

// Analytics Data
export interface AnalyticsData {
  period: 'today' | 'week' | 'month' | 'year';
  revenue: {
    total: number;
    trend: number; // percentage change
    data: { date: string; amount: number }[];
  };
  users: {
    total: number;
    new: number;
    trend: number;
    data: { date: string; count: number }[];
  };
  auctions: {
    total: number;
    active: number;
    trend: number;
    data: { date: string; count: number }[];
  };
  conversion: {
    rate: number;
    trend: number;
  };
}

// Audit Log
export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  resource: string;
  resourceType: 'user' | 'auction' | 'transaction' | 'kyc_application' | 'dispute' | 'listing' | 'escrow' | 'feature_flag' | 'system' | 'support_ticket';
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
}

// Alert Configuration
export interface AlertConfig {
  id: string;
  name: string;
  type: 'threshold' | 'anomaly' | 'pattern';
  enabled: boolean;
  conditions: {
    metric: string;
    operator: '>' | '<' | '=' | '!=';
    value: number;
    timeWindow?: string;
  }[];
  actions: {
    notify: string[]; // user IDs to notify
    email: boolean;
    sms: boolean;
    webhook?: string;
  };
  createdBy: string;
  createdAt: string;
  lastTriggered?: string;
}

// Feature Flag
export interface FeatureFlag {
  id: string;
  name: string;
  key: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number; // 0-100
  targetUsers?: string[];
  targetRoles?: UserRole[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Stats
export interface ModeratorDashboardStats {
  pendingTasks: {
    kyc: number;
    tickets: number;
    reports: number;
    evidence: number;
  };
  todayStats: {
    reviewedKYC: number;
    resolvedTickets: number;
    moderatedContent: number;
  };
  recentActivity: {
    type: string;
    description: string;
    timestamp: string;
  }[];
}

export interface AdminDashboardStats extends ModeratorDashboardStats {
  systemHealth: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    activeUsers: number;
  };
  financials: {
    revenue: number;
    escrowHeld: number;
    pendingPayouts: number;
  };
  alerts: {
    critical: number;
    warnings: number;
    info: number;
  };
}

// Payment Log
export interface PaymentLog {
  id: string;
  transactionId: string;
  auctionId: string;
  auctionTitle: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  type: 'payment' | 'refund' | 'payout' | 'fee';
  method: 'card' | 'bank_transfer' | 'wallet' | 'escrow';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  timestamp: string;
  gateway?: string;
  gatewayTransactionId?: string;
  fees: number;
  netAmount: number;
}

// Listing Management
export interface ListingManagement {
  id: string;
  title: string;
  sellerId: string;
  sellerName: string;
  category: string;
  status: ListingStatus;
  createdAt: string;
  endDate: string;
  currentBid: number;
  totalBids: number;
  flags: number;
  violationReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}
