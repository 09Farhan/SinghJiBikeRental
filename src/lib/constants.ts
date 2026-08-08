export const SITE_NAME = "Singh Ji's Bike Rental";
export const SITE_DESCRIPTION = 'Premium bike and scooter rentals in Siliguri, West Bengal. Quality rides for your everyday commute and weekend getaways.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || '+917365844003';
export const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE || '+917365844003';
export const EMAIL_ADDRESS = 'singhjirental@gmail.com';
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
  { name: 'Inventory', href: '/admin/inventory' },
  { name: 'Bookings', href: '/admin/bookings' },
  { name: 'Messages', href: '/admin/messages' },
  { name: 'Reviews', href: '/admin/reviews' },
];

export const FAQS = [
  {
    q: 'Where can I rent a bike in Siliguri?',
    a: 'You can easily rent a bike or scooter in Siliguri at Singh Ji\'s Bike Rental. We offer a wide range of premium motorcycles and scooters with doorstep delivery options across Siliguri, including NJP Railway Station and Bagdogra Airport.'
  },
  {
    q: 'Can I rent a bike near NJP Railway Station or Bagdogra Airport?',
    a: 'Yes! We provide convenient bike rental services near NJP (New Jalpaiguri Railway Station) and Bagdogra Airport. You can book online and we will ensure your two-wheeler is ready when you arrive in Siliguri.'
  },
  {
    q: 'Can I take a rented bike from Siliguri to Darjeeling or Sikkim?',
    a: 'Absolutely! Our bikes are well-maintained and perfect for exploring Darjeeling, Kurseong, Kalimpong, and Sikkim. We provide the necessary documents you need for inter-state travel.'
  },
  {
    q: 'What documents are required to rent a bike in Siliguri?',
    a: 'You need a valid government-issued photo ID (Aadhar, Passport, or Voter ID) and a valid driving license appropriate for the two-wheeler you are renting.'
  },
  {
    q: 'Do you provide helmets with rental bikes?',
    a: 'Yes, we provide one complimentary helmet with every rental to ensure your safety. Additional helmets and riding gear are available upon request.'
  },
  {
    q: 'How much does it cost to rent a bike in Siliguri?',
    a: 'Our affordable bike rentals in Siliguri start from just ₹600 per day for scooters and go up to premium motorcycles. The final price depends on the specific vehicle model and your rental duration.'
  }
];
