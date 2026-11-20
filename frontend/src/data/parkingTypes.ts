import {
  Accessibility, BatteryCharging, Building2, Bus, BusFront, CalendarCheck, Camera, Clock,
  Droplets, Footprints, KeyRound, Luggage, MapPin, PlaneLanding, ShieldCheck, Sparkles,
  Timer, UserCheck, Wallet, Warehouse, Wrench, Zap,
} from 'lucide-react';
import type { ComparisonPoints, ParkingType } from '@/types/content';

/** All parking-type content. Illustrative copy and prices until the backend supplies them. */
export const parkingTypes: ParkingType[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'park-and-ride',
    title: 'Park & Ride',
    icon: Bus,
    fromPrice: 3.99,
    priceFactor: 1,
    menuDescription: 'Secure off-site parking with a shuttle bus to the terminal.',
    cardDescription: 'Park at a secure off-site car park and hop on a frequent shuttle bus to the terminal.',
    cardFeatures: ['Lowest prices', 'Shuttles every 10–20 min', '24/7 CCTV & patrols'],
    hero: {
      pill: '★ The UK’s best-value airport parking',
      title: { before: 'Park & Ride,', highlight: 'cheapest', after: 'way to fly.' },
      lead: 'Leave your car at a secure, Park Mark® approved car park minutes from the airport and ride a free shuttle bus to the terminal. Save up to 70% versus on-the-day prices.',
      ticks: ['Free shuttle included', 'Keep your keys', 'Free cancellation'],
      illustration: { confirmLabel: 'MAN T2 · Park & Ride', priceLabel: '8 days from', price: 31.92, saving: '-70%' },
    },
    stats: [
      { value: '£3.99', label: 'From per day', icon: Wallet },
      { value: '10–20 min', label: 'Shuttle frequency', icon: BusFront },
      { value: '24/7', label: 'CCTV & on-site patrols', icon: Camera },
      { value: '5–15 min', label: 'Transfer to terminal', icon: Timer },
    ],
    overview: {
      title: 'Big savings, a short shuttle ride away.',
      paragraphs: [
        'Park & Ride car parks sit just outside the airport boundary, which keeps prices low. You drive in, park in your reserved space (or hand over at a parking desk), and step onto a shuttle bus that runs straight to the terminal.',
        'On your return, the shuttle collects you from a signed pick-up point at arrivals and drops you back beside your car. You keep your keys the whole time at self-park sites.',
      ],
      included: [
        'Guaranteed space for your dates',
        'Free return shuttle for everyone in your booking',
        'Help loading luggage onto the bus',
        '24/7 CCTV, fencing and patrols',
        'Instant e-mail confirmation with directions',
        'Free cancellation up to 24 hours before',
      ],
    },
    bestFor: ['Holidays of a week or more', 'Families and groups watching the budget', 'Drivers happy to allow a little extra time', 'Anyone who prefers to keep their keys'],
    goodToKnow: [
      'Allow 15–30 minutes extra for the shuttle on the way out.',
      'Large or oversized vehicles may need to be declared at booking.',
      'Shuttle times can be less frequent overnight — check your car park’s timetable.',
    ],
    benefits: [
      { title: 'Lowest prices', description: 'Typically the cheapest option at every airport — often less than half the official car park price.', icon: Wallet },
      { title: 'Frequent shuttles', description: 'Buses every 10–20 minutes at peak times, with a short ride straight to the terminal.', icon: BusFront },
      { title: 'Secure car parks', description: 'Fenced, lit and monitored by CCTV around the clock. Most sites hold the Park Mark® award.', icon: ShieldCheck },
      { title: 'Keep your keys', description: 'At self-park sites you lock up and keep your keys — nobody else drives your car.', icon: KeyRound },
      { title: 'Help with luggage', description: 'Drivers help load bags and pushchairs on and off the bus.', icon: Luggage },
      { title: 'Accessible options', description: 'Many sites offer accessible shuttles and Blue Badge bays — filter for them on the results page.', icon: Accessibility },
    ],
    steps: [
      { title: 'Drive to the car park', description: 'Follow the directions in your confirmation e-mail. Most sites are 5–10 minutes from the terminal.' },
      { title: 'Park & check in', description: 'Show your booking reference at the barrier or desk, then park in your space.' },
      { title: 'Ride the shuttle', description: 'Hop on the free shuttle — staff help with luggage — and get dropped at departures.' },
      { title: 'Ride back on return', description: 'Head to the signed pick-up point at arrivals and the shuttle takes you back to your car.' },
    ],
    compare: {
      distance: '5–15 min shuttle',
      transfer: 'Free shuttle bus',
      keys: 'Usually keep them',
      bestFor: 'Lowest price, longer trips',
      accessibility: 'Accessible shuttles at many sites',
    },
    faqs: [
      { question: 'How often do the shuttle buses run?', answer: 'Most Park & Ride shuttles run every 10–20 minutes at busy times and every 20–30 minutes overnight. The exact timetable for your car park is in your confirmation e-mail.' },
      { question: 'How early should I arrive?', answer: 'Allow an extra 15–30 minutes on top of your airport check-in time to park, board the shuttle and get to the terminal.' },
      { question: 'Is the shuttle included in the price?', answer: 'Yes. The return shuttle is free for everyone in your booking. Check the passenger limit on the car park’s page if you are travelling as a large group.' },
      { question: 'Do I need to leave my keys?', answer: 'At self-park sites you keep your keys. Some busier sites are “park and hand over”, where staff park the car for you — this is clearly shown before you book.' },
      { question: 'What if my return flight is delayed?', answer: 'Shuttles run to meet arrivals, so just call the number in your confirmation when you land and head to the pick-up point. Extra time on the car park is charged at the site’s day rate, if any.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'meet-and-greet',
    title: 'Meet & Greet',
    icon: KeyRound,
    featured: true,
    fromPrice: 7.49,
    priceFactor: 1.55,
    menuDescription: 'Hand your keys over at the terminal and walk straight to check-in.',
    cardDescription: 'Drive straight to the terminal, hand over your keys and walk to check-in. Your car is waiting when you land.',
    cardFeatures: ['No shuttle, no hassle', 'Fully insured drivers', 'Flight tracking on return'],
    hero: {
      pill: '★ Most popular with UK travellers',
      title: { before: 'Meet & Greet,', highlight: 'straight', after: 'to check-in.' },
      lead: 'Drive to the terminal, hand your keys to a fully insured, uniformed driver and walk into departures. When you land, your car is waiting for you — no shuttle buses, no hassle.',
      ticks: ['No shuttle buses', 'Insured, vetted drivers', 'Flight tracked on return'],
      illustration: { confirmLabel: 'LHR T5 · Meet & Greet', priceLabel: '8 days from', price: 39.99, saving: '-62%' },
    },
    stats: [
      { value: '0 min', label: 'Transfer to terminal', icon: Footprints },
      { value: '£7.49', label: 'From per day', icon: Wallet },
      { value: '100%', label: 'Insured, vetted drivers', icon: UserCheck },
      { value: 'Live', label: 'Flight tracking on return', icon: PlaneLanding },
    ],
    overview: {
      title: 'The quickest, easiest way to park at the airport.',
      paragraphs: [
        'With Meet & Greet, you drive to a dedicated drop-off zone at the terminal. A uniformed driver meets you, checks the car with you, and takes it to a secure compound while you walk straight into departures.',
        'We track your return flight, so when you land and clear arrivals your car is brought back to the same spot — even if you are delayed.',
      ],
      included: [
        'Meeting at the terminal drop-off zone',
        'Vehicle condition check with photos',
        'Storage in a secure, monitored compound',
        'Return flight tracking with no extra charge for delays',
        'Car returned to the terminal when you land',
        'Free cancellation up to 24 hours before',
      ],
    },
    bestFor: ['Families with young children or lots of luggage', 'Business travellers short on time', 'Early-morning and late-night flights', 'Travellers with reduced mobility'],
    goodToKnow: [
      'Call the driver 20–30 minutes before arriving so they can meet you on time.',
      'Terminal drop-off charges are sometimes added by the airport — these are shown at booking.',
      'Remove valuables and toll tags before handing over your keys.',
    ],
    benefits: [
      { title: 'No shuttle buses', description: 'Hand over your car at the terminal and walk straight to check-in — the fastest start to any trip.', icon: Footprints },
      { title: 'Vetted, insured drivers', description: 'Every driver is DBS-checked, uniformed and fully insured to drive your vehicle.', icon: UserCheck },
      { title: 'Flight tracking', description: 'We follow your return flight, so your car is ready when you land — early or late.', icon: PlaneLanding },
      { title: 'Secure compounds', description: 'Cars are stored in fenced compounds with CCTV, lighting and 24/7 staff.', icon: ShieldCheck },
      { title: 'Ideal with luggage', description: 'No lifting cases onto buses — perfect with children, ski gear or golf clubs.', icon: Luggage },
      { title: 'Add a valet', description: 'Come home to a clean car by adding a wash or full valet while you are away.', icon: Sparkles },
    ],
    steps: [
      { title: 'Call ahead', description: 'Phone the number in your confirmation 20–30 minutes before you reach the airport.' },
      { title: 'Meet your driver', description: 'Drive to the Meet & Greet zone. Your driver checks the car with you and takes the keys.' },
      { title: 'Walk to check-in', description: 'Head straight into departures while your car goes to a secure compound.' },
      { title: 'Collect on return', description: 'Call when you land and collect your car from the same zone. Your flight is tracked.' },
    ],
    compare: {
      distance: 'At the terminal',
      transfer: 'None — walk in',
      keys: 'Handed to driver',
      bestFor: 'Speed, families, luggage',
      accessibility: 'Excellent — kerbside handover',
    },
    faqs: [
      { question: 'Where do I meet the driver?', answer: 'Each airport has a designated Meet & Greet or short-stay drop-off area. Exact directions, a map and your driver’s phone number are in your confirmation e-mail.' },
      { question: 'Is my car insured while a driver moves it?', answer: 'Yes. All our Meet & Greet partners hold insurance that covers their drivers to move and store your vehicle. Details are on each car park’s page.' },
      { question: 'What happens if my flight is delayed?', answer: 'We track your return flight, so the operator knows when you will land. There is no extra charge for delays that are outside your control.' },
      { question: 'Is there a terminal drop-off fee?', answer: 'Some airports charge a fee to use the drop-off zone. Where this applies it is shown clearly before you pay.' },
      { question: 'Can I add a car wash or valet?', answer: 'Yes. Many Meet & Greet operators offer a wash, valet or EV charging while you are away — add it during booking.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'on-airport',
    title: 'On-Airport',
    icon: Building2,
    fromPrice: 8.99,
    priceFactor: 1.85,
    menuDescription: 'Official short and long-stay car parks within the airport.',
    cardDescription: 'Official short and long-stay car parks within walking distance or a short transfer.',
    cardFeatures: ['Closest to terminal', 'Ideal for short trips', 'Blue Badge friendly'],
    hero: {
      pill: '★ Official airport car parks',
      title: { before: 'On-Airport parking,', highlight: 'closest', after: 'to the terminal.' },
      lead: 'Park in the airport’s own short-stay, mid-stay and long-stay car parks — many within a few minutes’ walk of departures. Pre-book for a guaranteed space and a lower price than turning up.',
      ticks: ['Walk to the terminal', 'Official airport sites', 'Blue Badge friendly'],
      illustration: { confirmLabel: 'LGW North · Short Stay', priceLabel: '3 days from', price: 26.97, saving: '-48%' },
    },
    stats: [
      { value: '2–10 min', label: 'Walk or transfer', icon: Footprints },
      { value: '£8.99', label: 'From per day', icon: Wallet },
      { value: 'Official', label: 'Airport-run car parks', icon: Building2 },
      { value: 'Blue Badge', label: 'Accessible bays', icon: Accessibility },
    ],
    overview: {
      title: 'Park on the airport’s doorstep.',
      paragraphs: [
        'On-Airport car parks are run by the airport itself. Short-stay car parks are right next to the terminal, while mid- and long-stay sites are a few minutes away by walkway or free airport bus.',
        'Booking ahead through us guarantees your space and is usually far cheaper than paying at the barrier on the day.',
      ],
      included: [
        'Guaranteed space in an official airport car park',
        'Automatic number-plate recognition entry',
        'Walkway or free inter-terminal bus',
        'Blue Badge bays close to the terminal',
        '24/7 security and staff on site',
        'Free cancellation up to 24 hours before',
      ],
    },
    bestFor: ['Short trips and weekend breaks', 'Early-morning departures', 'Picking up or dropping off passengers', 'Blue Badge holders'],
    goodToKnow: [
      'Short-stay rates rise quickly on longer trips — long-stay is often better value for a week or more.',
      'Your number plate is your ticket at most sites, so book with the right registration.',
      'Height restrictions apply in multi-storey car parks.',
    ],
    benefits: [
      { title: 'Closest to departures', description: 'Short-stay car parks are a few minutes’ walk from check-in — no buses needed.', icon: MapPin },
      { title: 'Official airport sites', description: 'Run by the airport, with staff, lighting and security on site 24/7.', icon: Building2 },
      { title: 'Ticketless entry', description: 'Number-plate recognition opens the barrier automatically. No tickets to lose.', icon: Zap },
      { title: 'Perfect for short trips', description: 'Ideal for day trips, weekend breaks and business travel.', icon: Clock },
      { title: 'Blue Badge friendly', description: 'Dedicated accessible bays close to the terminal, with assistance available.', icon: Accessibility },
      { title: 'Save by pre-booking', description: 'Booking ahead is typically 40–60% cheaper than the barrier price.', icon: Wallet },
    ],
    steps: [
      { title: 'Book your space', description: 'Choose short, mid or long-stay and enter your registration for automatic entry.' },
      { title: 'Drive in', description: 'Follow the airport signs. Cameras read your number plate and open the barrier.' },
      { title: 'Walk to the terminal', description: 'Short-stay is a short walk; longer-stay sites have a free airport bus.' },
      { title: 'Drive away', description: 'Return to your car and exit through the barrier — nothing to pay on the day.' },
    ],
    compare: {
      distance: '2–10 min walk or bus',
      transfer: 'Walkway or airport bus',
      keys: 'Keep them',
      bestFor: 'Short trips, convenience',
      accessibility: 'Blue Badge bays near terminal',
    },
    faqs: [
      { question: 'What is the difference between short, mid and long-stay?', answer: 'Short-stay is closest to the terminal and priced for short visits. Mid and long-stay are a little further away with a free bus, and are better value for longer trips.' },
      { question: 'Do I need a ticket?', answer: 'Most airports use number-plate recognition, so your registration is your ticket. Make sure it is correct on your booking.' },
      { question: 'Can I park a van or large vehicle?', answer: 'Multi-storey car parks have height limits. If your vehicle is tall, choose a surface car park — limits are shown on each car park’s page.' },
      { question: 'Are there Blue Badge spaces?', answer: 'Yes. All official airport car parks have accessible bays, usually on the level closest to the terminal.' },
      { question: 'What if I come back later than booked?', answer: 'Overstays are charged at the car park’s standard rate when you exit. You can extend your booking online before you travel to avoid this.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'valet-and-extras',
    title: 'Valet & Extras',
    icon: Sparkles,
    fromPrice: 9.99,
    priceFactor: 2.05,
    menuDescription: 'Valet, EV charging and car care while you’re away.',
    cardDescription: 'Come home to a clean car. Add a valet, EV charging or MOT while you’re away.',
    cardFeatures: ['Hand wash & valet', 'EV charging bays', 'Undercover storage'],
    hero: {
      pill: '★ Come home to a cleaner car',
      title: { before: 'Valet & Extras,', highlight: 'pampered', after: 'while you fly.' },
      lead: 'Make your parking work harder. Add a hand wash, full valet, EV charging, servicing or undercover storage while you are away — and drive home in a car that’s ready to go.',
      ticks: ['Hand wash & full valet', 'EV charging', 'Undercover storage'],
      illustration: { confirmLabel: 'STN · Meet & Greet + Valet', priceLabel: '7 days from', price: 69.93, saving: 'Valet' },
    },
    stats: [
      { value: '£9.99', label: 'From per day', icon: Wallet },
      { value: 'EV', label: 'Charging bays', icon: BatteryCharging },
      { value: 'Covered', label: 'Undercover storage', icon: Warehouse },
      { value: 'MOT', label: 'Servicing available', icon: Wrench },
    ],
    overview: {
      title: 'Turn parking time into car-care time.',
      paragraphs: [
        'Your car is going to be parked for days anyway — so why not have it cleaned, charged or serviced at the same time? Valet & Extras combines secure parking with professional car care from trusted local specialists.',
        'Choose a package when you book, or add extras to an existing Meet & Greet or Park & Ride booking from Manage booking.',
      ],
      included: [
        'Secure parking for your dates',
        'Your choice of wash, valet or care package',
        'Photos of your car before and after',
        'Quality-checked by the operator',
        'Car ready when you collect it',
        'Free cancellation up to 24 hours before',
      ],
    },
    bestFor: ['Coming home after a long trip', 'EV drivers who want a full battery', 'Classic and prestige cars', 'Busy people who want jobs done while away'],
    goodToKnow: [
      'Extras are offered at selected car parks — use the filters to find them.',
      'MOTs and services need at least 3 working days’ parking.',
      'EV charging is to an agreed level; charging cables must be left with the car.',
    ],
    benefits: [
      { title: 'Hand wash & valet', description: 'From an exterior hand wash to a full interior and exterior valet.', icon: Droplets },
      { title: 'EV charging', description: 'Return to a charged battery. Charging is done to your chosen level.', icon: BatteryCharging },
      { title: 'Undercover storage', description: 'Keep your car out of the weather in covered or indoor parking.', icon: Warehouse },
      { title: 'MOT & servicing', description: 'Have your MOT or service done by approved garages while you’re away.', icon: Wrench },
      { title: 'Book it in one go', description: 'Parking and extras on one booking, one confirmation and one payment.', icon: CalendarCheck },
      { title: 'Trusted specialists', description: 'All extras are carried out by vetted, insured professionals.', icon: ShieldCheck },
    ],
    steps: [
      { title: 'Choose your parking', description: 'Pick a car park that offers extras — Meet & Greet sites have the widest choice.' },
      { title: 'Add your extras', description: 'Select a wash, valet, EV charge, MOT or undercover storage at checkout.' },
      { title: 'Fly away', description: 'Drop off as normal. Your car is cared for while you travel.' },
      { title: 'Drive home happy', description: 'Collect a clean, charged or serviced car — with before-and-after photos.' },
    ],
    compare: {
      distance: 'Depends on parking type',
      transfer: 'As your parking type',
      keys: 'Handed over for services',
      bestFor: 'Car care, EVs, long trips',
      accessibility: 'As your parking type',
    },
    faqs: [
      { question: 'Which car parks offer extras?', answer: 'Extras are available at selected Meet & Greet, Park & Ride and On-Airport car parks. Use the “Extras” filter on the results page to see them.' },
      { question: 'Can I add a valet to an existing booking?', answer: 'Yes. Go to Manage booking and choose “Add extras”. Availability depends on your car park and dates.' },
      { question: 'How much does EV charging cost?', answer: 'EV charging is priced per charge or per kWh depending on the operator. The price is shown before you add it to your booking.' },
      { question: 'How long is needed for an MOT or service?', answer: 'Allow at least 3 working days of parking so the garage can complete the work and any minor repairs you approve.' },
      { question: 'What if I’m not happy with the valet?', answer: 'Let the operator know when you collect your car. If the work was not completed to standard, contact our support team and we’ll put it right.' },
    ],
  },
];

export const getParkingType = (slug: string): ParkingType | undefined =>
  parkingTypes.find((t) => t.slug === slug);

/** Row labels for the comparison table, in display order. */
export const comparisonRows: { key: keyof ComparisonPoints | 'price'; label: string }[] = [
  { key: 'price', label: 'Price from' },
  { key: 'distance', label: 'Distance to terminal' },
  { key: 'transfer', label: 'Getting to the terminal' },
  { key: 'keys', label: 'Your keys' },
  { key: 'accessibility', label: 'Accessibility' },
  { key: 'bestFor', label: 'Best for' },
];
