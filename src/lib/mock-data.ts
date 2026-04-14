import { Club, Event, DiscountRule } from '@/types';
import techfestImg from '@/assets/events/techfest.jpg';
import codesprintImg from '@/assets/events/codesprint.jpg';
import symposiumImg from '@/assets/events/symposium.jpg';
import industryImg from '@/assets/events/industry.jpg';
import culturalImg from '@/assets/events/cultural.jpg';
import webdevImg from '@/assets/events/webdev.jpg';
import hackathonImg from '@/assets/events/hackathon.jpg';
import cricketImg from '@/assets/events/cricket.jpg';

// Updated club data with real committee names
export const mockClubs: Club[] = [
  {
    id: '1',
    name: 'IEEE MHSSCE',
    description: 'Institute of Electrical and Electronics Engineers student chapter promoting technical excellence through workshops, hackathons, and industry connections.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=IEEE',
    coordinatorId: '2',
    memberCount: 156,
    eventsCount: 12,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'ACM MHSSCE',
    description: 'Association for Computing Machinery chapter fostering computing education and research through coding contests and tech talks.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=ACM',
    coordinatorId: '2',
    memberCount: 134,
    eventsCount: 10,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: "Programmer's Club",
    description: 'A community of passionate coders organizing coding challenges, open source contributions, and peer learning sessions.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Programmers',
    coordinatorId: '2',
    memberCount: 189,
    eventsCount: 15,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'CSI MHSSCE',
    description: 'Computer Society of India chapter bridging academia and industry through seminars, certifications, and networking events.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=CSI',
    coordinatorId: '2',
    memberCount: 145,
    eventsCount: 8,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    name: 'Cultural Society',
    description: 'Celebrating diversity through music, dance, drama, and cultural festivals throughout the academic year.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Culture',
    coordinatorId: '2',
    memberCount: 234,
    eventsCount: 18,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '6',
    name: 'Sports Committee',
    description: 'Organizing inter-college tournaments and promoting fitness and sportsmanship among students.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Sports',
    coordinatorId: '2',
    memberCount: 178,
    eventsCount: 24,
    createdAt: new Date('2024-01-01'),
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'TechFest 2024',
    description: 'Annual technology festival featuring coding competitions, robotics showcase, and tech talks by industry experts. Join us for 3 days of innovation and learning with hands-on workshops and networking opportunities.',
    clubId: '1',
    club: mockClubs[0],
    date: new Date('2024-03-15'),
    time: '09:00 AM',
    venue: 'Main Auditorium, MHSSCE Campus',
    price: 299,
    capacity: 500,
    registeredCount: 342,
    status: 'approved',
    category: 'Technology',
    poster: techfestImg,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    title: 'Code Sprint Championship',
    description: 'A high-intensity competitive programming contest where the best coders battle it out. Solve challenging algorithmic problems and win exciting prizes.',
    clubId: '3',
    club: mockClubs[2],
    date: new Date('2024-03-20'),
    time: '10:00 AM',
    venue: 'Computer Lab Complex',
    price: 149,
    capacity: 200,
    registeredCount: 156,
    status: 'approved',
    category: 'Technology',
    poster: codesprintImg,
    createdAt: new Date('2024-01-25'),
  },
  {
    id: '3',
    title: 'ACM Research Symposium',
    description: 'Present your research papers and projects to an expert panel. Learn about cutting-edge developments in computing and network with researchers.',
    clubId: '2',
    club: mockClubs[1],
    date: new Date('2024-04-05'),
    time: '11:00 AM',
    venue: 'Seminar Hall A',
    price: 199,
    capacity: 150,
    registeredCount: 89,
    status: 'approved',
    category: 'Technology',
    poster: symposiumImg,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    title: 'CSI Industry Connect',
    description: 'Meet industry professionals, attend career guidance sessions, and explore internship opportunities at top tech companies.',
    clubId: '4',
    club: mockClubs[3],
    date: new Date('2024-04-10'),
    time: '02:00 PM',
    venue: 'Conference Room, Admin Block',
    price: 99,
    capacity: 100,
    registeredCount: 78,
    status: 'approved',
    category: 'Business',
    poster: industryImg,
    createdAt: new Date('2024-02-05'),
  },
  {
    id: '5',
    title: 'Annual Cultural Night',
    description: 'A spectacular evening of music, dance, and drama performances showcasing the diverse talents of our students. Food stalls and fun activities included!',
    clubId: '5',
    club: mockClubs[4],
    date: new Date('2024-04-15'),
    time: '06:00 PM',
    venue: 'Open Air Theatre',
    price: 149,
    capacity: 1000,
    registeredCount: 756,
    status: 'approved',
    category: 'Cultural',
    poster: culturalImg,
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '6',
    title: 'Web Development Bootcamp',
    description: 'Intensive 2-day workshop covering React, Node.js, and modern web technologies. Build a complete project from scratch with industry mentors.',
    clubId: '1',
    club: mockClubs[0],
    date: new Date('2024-04-20'),
    time: '09:30 AM',
    venue: 'Lab 201, IT Building',
    price: 399,
    capacity: 50,
    registeredCount: 48,
    status: 'approved',
    category: 'Workshop',
    poster: webdevImg,
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '7',
    title: 'Hackathon 2024',
    description: '24-hour coding marathon to build innovative solutions for real-world problems. Form teams, ideate, and create working prototypes to win amazing prizes.',
    clubId: '3',
    club: mockClubs[2],
    date: new Date('2024-05-01'),
    time: '08:00 AM',
    venue: 'Innovation Hub, Ground Floor',
    price: 249,
    capacity: 200,
    registeredCount: 145,
    status: 'pending',
    category: 'Technology',
    poster: hackathonImg,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '8',
    title: 'Inter-College Cricket Tournament',
    description: 'Compete against teams from colleges across Mumbai in this exciting cricket tournament. Show your sporting spirit!',
    clubId: '6',
    club: mockClubs[5],
    date: new Date('2024-05-10'),
    time: '07:00 AM',
    venue: 'College Ground',
    price: 99,
    capacity: 16,
    registeredCount: 12,
    status: 'pending',
    category: 'Sports',
    poster: cricketImg,
    createdAt: new Date('2024-02-25'),
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
