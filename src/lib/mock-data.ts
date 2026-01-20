import { User, Club, Event, DiscountRule, Notification } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    email: 'ahmed@student.ssec.edu',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@ssec.edu',
    role: 'club_coordinator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Dr. Rakesh Mehta',
    email: 'admin@ssec.edu',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rakesh',
    createdAt: new Date('2024-01-01'),
  },
];

export const mockClubs: Club[] = [
  {
    id: '1',
    name: 'Tech Innovators Club',
    description: 'Exploring cutting-edge technology and innovation through workshops, hackathons, and tech talks.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Tech',
    coordinatorId: '2',
    memberCount: 156,
    eventsCount: 12,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Cultural Society',
    description: 'Celebrating diversity through music, dance, drama, and cultural festivals.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Culture',
    coordinatorId: '2',
    memberCount: 234,
    eventsCount: 18,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Sports Committee',
    description: 'Organizing inter-college tournaments and promoting fitness among students.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Sports',
    coordinatorId: '2',
    memberCount: 189,
    eventsCount: 24,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'Entrepreneurship Cell',
    description: 'Nurturing the entrepreneurial spirit through mentorship, networking, and startup competitions.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Startup',
    coordinatorId: '2',
    memberCount: 98,
    eventsCount: 8,
    createdAt: new Date('2024-01-01'),
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'TechFest 2024',
    description: 'Annual technology festival featuring coding competitions, robotics showcase, and tech talks by industry experts. Join us for 3 days of innovation and learning.',
    clubId: '1',
    club: mockClubs[0],
    date: new Date('2024-03-15'),
    time: '09:00 AM',
    venue: 'Main Auditorium',
    price: 299,
    capacity: 500,
    registeredCount: 342,
    status: 'approved',
    category: 'Technology',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    title: 'Annual Cultural Night',
    description: 'A spectacular evening of music, dance, and drama performances showcasing the diverse talents of our students.',
    clubId: '2',
    club: mockClubs[1],
    date: new Date('2024-03-20'),
    time: '06:00 PM',
    venue: 'Open Air Theatre',
    price: 149,
    capacity: 1000,
    registeredCount: 756,
    status: 'approved',
    category: 'Cultural',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: '3',
    title: 'Hackathon 2024',
    description: '24-hour coding marathon with exciting prizes. Build innovative solutions and compete with the best.',
    clubId: '1',
    club: mockClubs[0],
    date: new Date('2024-04-05'),
    time: '10:00 AM',
    venue: 'Computer Lab Complex',
    price: 199,
    capacity: 200,
    registeredCount: 145,
    status: 'pending',
    category: 'Technology',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    title: 'Inter-College Cricket Tournament',
    description: 'Compete against teams from colleges across Mumbai in this exciting cricket tournament.',
    clubId: '3',
    club: mockClubs[2],
    date: new Date('2024-04-10'),
    time: '08:00 AM',
    venue: 'College Ground',
    price: 99,
    capacity: 16,
    registeredCount: 12,
    status: 'approved',
    category: 'Sports',
    createdAt: new Date('2024-02-05'),
  },
  {
    id: '5',
    title: 'Startup Pitch Competition',
    description: 'Present your startup ideas to a panel of investors and industry experts. Win funding and mentorship.',
    clubId: '4',
    club: mockClubs[3],
    date: new Date('2024-04-15'),
    time: '02:00 PM',
    venue: 'Seminar Hall',
    price: 249,
    capacity: 50,
    registeredCount: 38,
    status: 'pending',
    category: 'Business',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '6',
    title: 'Photography Workshop',
    description: 'Learn professional photography techniques from award-winning photographers.',
    clubId: '2',
    club: mockClubs[1],
    date: new Date('2024-04-20'),
    time: '11:00 AM',
    venue: 'Art Studio',
    price: 399,
    capacity: 30,
    registeredCount: 28,
    status: 'approved',
    category: 'Workshop',
    createdAt: new Date('2024-02-15'),
  },
];

export const mockDiscountRules: DiscountRule[] = [
  {
    id: '1',
    minQuantity: 3,
    discountType: 'percentage',
    value: 10,
    active: true,
    createdBy: '3',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    minQuantity: 5,
    discountType: 'percentage',
    value: 15,
    active: true,
    createdBy: '3',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    minQuantity: 10,
    discountType: 'percentage',
    value: 25,
    active: true,
    createdBy: '3',
    createdAt: new Date('2024-01-01'),
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Registration Confirmed',
    message: 'Your registration for TechFest 2024 has been confirmed.',
    read: false,
    type: 'success',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '2',
    userId: '1',
    title: 'New Event Available',
    message: 'Hackathon 2024 is now open for registration!',
    read: false,
    type: 'info',
    createdAt: new Date('2024-02-19'),
  },
  {
    id: '3',
    userId: '1',
    title: 'Event Reminder',
    message: 'TechFest 2024 starts in 3 days. Don\'t forget to attend!',
    read: true,
    type: 'info',
    createdAt: new Date('2024-02-18'),
  },
];

export const calculateDiscount = (totalQuantity: number, subtotal: number): { discount: number; rule: DiscountRule | null } => {
  const applicableRule = mockDiscountRules
    .filter(rule => rule.active && totalQuantity >= rule.minQuantity)
    .sort((a, b) => b.minQuantity - a.minQuantity)[0];

  if (!applicableRule) {
    return { discount: 0, rule: null };
  }

  const discount = applicableRule.discountType === 'percentage'
    ? (subtotal * applicableRule.value) / 100
    : applicableRule.value;

  return { discount, rule: applicableRule };
};
