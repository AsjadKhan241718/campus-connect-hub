export type UserRole = 'student' | 'club_coordinator' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  logo?: string;
  coordinatorId: string;
  coordinator?: User;
  memberCount: number;
  eventsCount: number;
  createdAt: Date;
}

export type EventStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'completed';

export interface Event {
  id: string;
  title: string;
  description: string;
  clubId: string;
  club?: Club;
  date: Date;
  time: string;
  venue: string;
  price: number;
  capacity: number;
  registeredCount: number;
  status: EventStatus;
  poster?: string;
  category: string;
  createdAt: Date;
}

export interface Registration {
  id: string;
  eventId: string;
  event?: Event;
  studentId: string;
  student?: User;
  quantity: number;
  basePrice: number;
  discountApplied: number;
  finalTotal: number;
  createdAt: Date;
}

export type DiscountType = 'percentage' | 'flat';

export interface DiscountRule {
  id: string;
  minQuantity: number;
  discountType: DiscountType;
  value: number;
  active: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface CartItem {
  event: Event;
  quantity: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: Date;
}
