# Demo Accounts

This document provides information about the demo accounts available in the AutoBID application for testing different user roles.

## Available Demo Accounts

### 1. Regular User Account
**Role:** Buyer & Seller (both)

- **Email:** john.doe@example.com
- **Password:** demo123
- **Access:** Regular user features (bidding, selling, wallet, etc.)
- **Dashboard:** `/main`

**Features:**
- View and participate in auctions
- Place bids on listings
- Create and manage own listings
- Manage wallet and payments
- View personal analytics
- Access user settings

---

### 2. Moderator Account
**Role:** Moderator

- **Email:** moderator@autobid.com
- **Password:** mod123
- **Access:** Moderation and support features
- **Dashboard:** `/moderator/dashboard`

**Features:**
- **KYC & Verification**
  - Review KYC submissions
  - Approve/reject verification requests

- **Support & Moderation**
  - Handle support tickets
  - Review and moderate content
  - Manage user reports

- **Transaction Management**
  - Review transactions
  - Verify shipping evidence
  - Verify delivery evidence
  - Handle escalations

**Permissions:**
- Cannot access admin-only features
- Cannot manage system settings
- Cannot view full analytics or audit logs
- Cannot manage user trust scores directly

---

### 3. Admin Account
**Role:** Administrator

- **Email:** admin@autobid.com
- **Password:** admin123
- **Access:** Full system access
- **Dashboard:** `/admin/dashboard`

**Features:**
- **All Moderator Features** (inherits all moderator permissions)

- **User Management**
  - Manage all users
  - View and adjust trust scores
  - Review fraud alerts
  - Ban/suspend users

- **Advanced KYC & Verification**
  - KYC analytics and reports
  - Bulk verification actions
  - KYC system settings

- **Listings & Auctions**
  - Manage all listings (not just own)
  - Active auction monitoring
  - Force-end problematic auctions

- **Financial Management**
  - Escrow management
  - Payment logs and reconciliation
  - Refund processing
  - Financial reports

- **Disputes**
  - Full dispute management
  - Senior dispute panel access
  - Dispute resolution tools

- **Analytics & Reports**
  - Platform-wide analytics
  - Custom report builder
  - Audit logs
  - Performance metrics

- **System Administration**
  - System health monitoring
  - Emergency controls
  - Feature flags management
  - Platform settings
  - Alert configuration

---

## Role-Based Access Control (RBAC)

### Permission Hierarchy

```
Admin (Full Access)
  └─ Moderator (Limited Access)
      └─ Regular User (User Features Only)
```

### Key Differences

| Feature | User | Moderator | Admin |
|---------|------|-----------|-------|
| View Auctions | ✓ | ✓ | ✓ |
| Create Bids | ✓ | ✓ | ✓ |
| Create Listings | ✓ | ✓ | ✓ |
| Manage Own Content | ✓ | ✓ | ✓ |
| Review KYC | ✗ | ✓ | ✓ |
| Handle Tickets | ✗ | ✓ | ✓ |
| Review Transactions | ✗ | ✓ | ✓ |
| Verify Evidence | ✗ | ✓ | ✓ |
| Manage All Users | ✗ | ✗ | ✓ |
| Trust Score Management | ✗ | ✗ | ✓ |
| Fraud Detection | ✗ | ✗ | ✓ |
| Escrow Management | ✗ | ✗ | ✓ |
| Financial Reports | ✗ | ✗ | ✓ |
| Audit Logs | ✗ | ✗ | ✓ |
| System Settings | ✗ | ✗ | ✓ |
| Feature Flags | ✗ | ✗ | ✓ |

---

## Quick Login

On the login page, you'll find convenient "Quick Login" buttons that automatically fill in credentials and log you in as the selected role:

- **Green Button** - Sign in as User
- **Blue Button** - Sign in as Moderator
- **Red Button** - Sign in as Admin

---

## Testing Role Segregation

### Test Scenarios

#### 1. Access Control Test
- Log in as a regular user
- Try to access `/admin/dashboard` (should redirect to `/main`)
- Try to access `/moderator/dashboard` (should redirect to `/main`)

#### 2. Moderator Permissions Test
- Log in as moderator
- Access `/moderator/dashboard` (should work)
- Try to access admin-only features like `/admin/system-health` (should redirect)
- Verify you can see moderator menu items but not admin-only items

#### 3. Admin Access Test
- Log in as admin
- Access `/admin/dashboard` (should work)
- Verify all menu items are visible
- Verify you can access all features

#### 4. Navigation Test
- Log in with each role
- Check that dashboard links navigate correctly
- Verify sidebar shows appropriate menu items
- Confirm logout works properly

---

## Development Notes

### Authentication System
- Mock authentication using localStorage
- Password validation is simplified for demo purposes
- Real implementation should use secure backend authentication

### Role Storage
- User role is stored in the auth context
- Role persists across page refreshes via localStorage
- Logout clears all authentication data

### Protected Routes
- All admin routes check for admin role
- Moderator routes accept both moderator and admin roles
- Regular user routes are accessible to all authenticated users

---

## Security Considerations

**⚠️ Important: For Production**

1. Implement proper backend authentication
2. Use secure password hashing (bcrypt, argon2)
3. Implement JWT or session-based auth
4. Add rate limiting for login attempts
5. Implement 2FA for admin/moderator accounts
6. Add audit logging for all admin actions
7. Implement RBAC at the API level
8. Use HTTPS for all communications
9. Implement CSRF protection
10. Regular security audits

---

## Support

For issues or questions about the demo accounts:
- Check the browser console for errors
- Clear localStorage if authentication seems stuck
- Ensure you're using the correct credentials
- Verify the dev server is running

---

**Last Updated:** October 2024
