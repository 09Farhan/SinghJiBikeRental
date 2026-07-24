import { PrismaClient, BikeCategory, FuelType, TransmissionType, UnitStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Admin User
  const adminPassword = await bcrypt.hash('Admin@123456', 10);
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@singhjibikes.com';
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: adminPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('Admin user seeded.');

  // Bikes Data
  const bikes = [
    {
      name: 'BMW G 310 GS',
      slug: 'bmw-g310-gs',
      brand: 'BMW',
      category: BikeCategory.BIKE,
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.MANUAL,
      pricePerDay: 2000,
      engine: '313cc Single Cylinder',
      mileage: '30 kmpl',
      seatCapacity: 2,
      description: 'The BMW G 310 GS is an adventure-ready motorcycle perfect for long rides and off-road exploration. With its robust build and reliable engine, it delivers an exhilarating riding experience.',
      images: ['/images/bikes/bmw-g310-gs-1.jpg', '/images/bikes/bmw-g310-gs-2.jpg'],
      units: [
        { registrationNumber: 'KA-01-AB-1234', color: 'Rallye' },
        { registrationNumber: 'KA-01-AB-1235', color: 'Polar White' },
      ],
    },
    {
      name: 'Royal Enfield Classic 350',
      slug: 'royal-enfield-classic-350',
      brand: 'Royal Enfield',
      category: BikeCategory.BIKE,
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.MANUAL,
      pricePerDay: 1000,
      engine: '349cc Single Cylinder',
      mileage: '35 kmpl',
      seatCapacity: 2,
      description: 'The timeless Classic 350 combines retro charm with modern reliability. Perfect for cruising through cities or highway journeys with its thumping exhaust note.',
      images: ['/images/bikes/royal-enfield-classic-350-1.jpg', '/images/bikes/royal-enfield-classic-350-2.jpg'],
      units: [
        { registrationNumber: 'KA-02-CD-2345', color: 'Chrome Red' },
        { registrationNumber: 'KA-02-CD-2346', color: 'Stealth Black' },
        { registrationNumber: 'KA-02-CD-2347', color: 'Gunmetal Grey' },
      ],
    },
    {
      name: 'Royal Enfield Himalayan',
      slug: 'royal-enfield-himalayan',
      brand: 'Royal Enfield',
      category: BikeCategory.BIKE,
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.MANUAL,
      pricePerDay: 1500,
      engine: '411cc Single Cylinder',
      mileage: '30 kmpl',
      seatCapacity: 2,
      description: 'Built for adventure, the Himalayan is your ideal companion for mountain roads and rough terrains. Purpose-built for exploring the unexplored.',
      images: ['/images/bikes/royal-enfield-himalayan-1.jpg', '/images/bikes/royal-enfield-himalayan-2.jpg'],
      units: [
        { registrationNumber: 'KA-03-EF-3456', color: 'Gravel Grey' },
        { registrationNumber: 'KA-03-EF-3457', color: 'Pine Green' },
      ],
    },
    {
      name: 'KTM Duke 390',
      slug: 'ktm-duke-390',
      brand: 'KTM',
      category: BikeCategory.BIKE,
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.MANUAL,
      pricePerDay: 1800,
      engine: '373cc Single Cylinder',
      mileage: '25 kmpl',
      seatCapacity: 2,
      description: 'The KTM Duke 390 is a street-naked sportbike that delivers raw performance. Aggressive styling meets cutting-edge technology for the ultimate urban riding experience.',
      images: ['/images/bikes/ktm-duke-390-1.jpg', '/images/bikes/ktm-duke-390-2.jpg'],
      units: [
        { registrationNumber: 'KA-04-GH-4567', color: 'Electronic Orange' },
      ],
    },
    {
      name: 'TVS Apache RTR 160',
      slug: 'tvs-apache-rtr-160',
      brand: 'TVS',
      category: BikeCategory.BIKE,
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.MANUAL,
      pricePerDay: 800,
      engine: '159.7cc Single Cylinder',
      mileage: '45 kmpl',
      seatCapacity: 2,
      description: 'The Apache RTR 160 offers sporty performance at an accessible price point. Race-inspired design with excellent fuel efficiency for daily adventures.',
      images: ['/images/bikes/tvs-apache-rtr-160-1.jpg', '/images/bikes/tvs-apache-rtr-160-2.jpg'],
      units: [
        { registrationNumber: 'KA-05-IJ-5678', color: 'Racing Red' },
        { registrationNumber: 'KA-05-IJ-5679', color: 'Gloss Black' },
      ],
    },
    {
      name: 'Honda Activa 6G',
      slug: 'honda-activa-6g',
      brand: 'Honda',
      category: BikeCategory.SCOOTER,
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.AUTOMATIC,
      pricePerDay: 400,
      engine: '109.51cc Single Cylinder',
      mileage: '60 kmpl',
      seatCapacity: 2,
      description: "India's most trusted scooter. The Activa 6G offers unmatched reliability, comfort, and fuel efficiency for effortless city commuting.",
      images: ['/images/bikes/honda-activa-6g-1.jpg', '/images/bikes/honda-activa-6g-2.jpg'],
      units: [
        { registrationNumber: 'KA-51-KL-6789', color: 'Pearl Spartan Red' },
        { registrationNumber: 'KA-51-KL-6790', color: 'Matte Axis Grey Metallic' },
        { registrationNumber: 'KA-51-KL-6791', color: 'Decent Blue' },
      ],
    },
    {
      name: 'Suzuki Access 125',
      slug: 'suzuki-access-125',
      brand: 'Suzuki',
      category: BikeCategory.SCOOTER,
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.AUTOMATIC,
      pricePerDay: 450,
      engine: '124cc Single Cylinder',
      mileage: '55 kmpl',
      seatCapacity: 2,
      description: 'The Suzuki Access 125 combines style with substance. A premium scooter experience with peppy performance and excellent ride quality.',
      images: ['/images/bikes/suzuki-access-125-1.jpg', '/images/bikes/suzuki-access-125-2.jpg'],
      units: [
        { registrationNumber: 'KA-53-MN-7890', color: 'Metallic Matte Black' },
        { registrationNumber: 'KA-53-MN-7891', color: 'Pearl Mirage White' },
      ],
    },
    {
      name: 'Yamaha Aerox 155',
      slug: 'yamaha-aerox-155',
      brand: 'Yamaha',
      category: BikeCategory.SCOOTER,
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.AUTOMATIC,
      pricePerDay: 600,
      engine: '155cc Single Cylinder',
      mileage: '40 kmpl',
      seatCapacity: 2,
      description: 'The Yamaha Aerox 155 is a sportbike in scooter form. Aggressive design, VVA engine technology, and connected features for the modern rider.',
      images: ['/images/bikes/yamaha-aerox-155-1.jpg', '/images/bikes/yamaha-aerox-155-2.jpg'],
      units: [
        { registrationNumber: 'KA-02-OP-8901', color: 'Racing Blue' },
      ],
    }
  ];

  for (const bikeData of bikes) {
    const { units, ...bikeInfo } = bikeData;
    
    const bike = await prisma.bike.upsert({
      where: { slug: bikeInfo.slug },
      update: bikeInfo,
      create: bikeInfo,
    });

    for (const unit of units) {
      await prisma.bikeUnit.upsert({
        where: { registrationNumber: unit.registrationNumber },
        update: {
          bikeId: bike.id,
          color: unit.color,
        },
        create: {
          bikeId: bike.id,
          registrationNumber: unit.registrationNumber,
          color: unit.color,
          status: UnitStatus.AVAILABLE,
        },
      });
    }
  }

  console.log('Bikes seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
