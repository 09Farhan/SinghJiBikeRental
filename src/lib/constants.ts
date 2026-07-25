export const SITE_NAME = "Singh Ji's Bike Rental";
export const SITE_DESCRIPTION = 'Premium bike and scooter rentals in Siliguri, West Bengal. Quality rides for your everyday commute and weekend getaways.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || '+917365844003';
export const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE || '+917365844003';
export const EMAIL_ADDRESS = 'info@singhjibikes.com';
export const BUSINESS_ADDRESS = "SinghJi's Cafe, opp. SIT Petrol Pump, Siliguri, West Bengal 734001";
export const BUSINESS_HOURS = 'Mon-Sun: 7:00 AM - 9:00 PM';
export const GOOGLE_MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114068.74088926442!2d88.35515255479008!3d26.727101831818274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e44114f5441dcd%3A0xdeb5c4701fa08d87!2sSiliguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

export const MIN_RENTAL_DAYS = 1;
export const MAX_RENTAL_DAYS = 30;
export const CANCELLATION_POLICY = 'Free cancellation up to 24 hours before the rental start time. 50% refund for cancellations within 24 hours.';

export const BRANDS = ['BMW', 'Royal Enfield', 'KTM', 'TVS', 'Honda', 'Suzuki', 'Yamaha'];
export const BIKE_CATEGORIES = ['BIKE', 'SCOOTER'];

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Our Fleet', href: '/bikes' },
  { name: 'Contact', href: '/contact' },
];

export const ADMIN_NAV_LINKS = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Inventory', href: '/admin/bikes' },
  { name: 'Bookings', href: '/admin/bookings' },
  { name: 'Messages', href: '/admin/messages' },
  { name: 'Reviews', href: '/admin/reviews' },
];

export const FAQS = [
  {
    q: 'What documents do I need to rent a bike?',
    a: 'You need a valid government-issued photo ID (Aadhar, Passport, or Driving License) and a valid driving license appropriate for the vehicle type. For scooters under 50cc, a regular license works. For motorcycles, you need a motorcycle-specific license.'
  },
  {
    q: 'Is there a security deposit?',
    a: 'Yes, a refundable security deposit of ₹2,000-₹5,000 is required depending on the bike model. This is fully refundable upon return of the bike in its original condition.'
  },
  {
    q: 'Do you provide helmets and riding gear?',
    a: 'Yes! We provide one complimentary helmet with every rental. Additional helmets and riding gear (jackets, gloves, knee guards) are available at nominal charges.'
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Free cancellation up to 24 hours before the rental start time. Cancellations within 24 hours may attract a 25% cancellation fee. No-shows are non-refundable.'
  },
  {
    q: 'Can I take the bike to another city or state?',
    a: 'Yes, inter-city and inter-state travel is allowed with prior intimation. Additional charges may apply based on distance and state permits required.'
  },
  {
    q: 'What happens if the bike breaks down?',
    a: 'We provide 24/7 roadside assistance. In case of a breakdown, call our helpline and we\'ll arrange a replacement bike or repairs at the nearest service center at no extra cost.'
  }
];
