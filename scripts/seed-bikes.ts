import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const bikes: any[] = [
    { 
      name: 'BMW G 310 GS', 
      slug: 'bmw-g310-gs', 
      brand: 'BMW', 
      category: 'BIKE', 
      pricePerDay: 2000, 
      engine: '313cc Single Cylinder', 
      mileage: '30 kmpl', 
      fuelType: 'PETROL', 
      transmission: 'MANUAL', 
      seatCapacity: 2, 
      description: 'The BMW G 310 GS is an adventure-ready motorcycle that brings the GS promise to the sub-500cc segment. It is designed for everyday adventures and long rides.', 
      images: ['/images/bikes/bmw-g310-gs-1.jpg'], 
      isActive: true 
    },
    { 
      name: 'Royal Enfield Himalayan 450', 
      slug: 'royal-enfield-himalayan-450', 
      brand: 'Royal Enfield', 
      category: 'BIKE', 
      pricePerDay: 1200, 
      engine: '452cc Single Cylinder', 
      mileage: '30 kmpl', 
      fuelType: 'PETROL', 
      transmission: 'MANUAL', 
      seatCapacity: 2, 
      description: 'Built for all roads and no roads. The Himalayan 450 is your true adventure companion with exceptional ground clearance and rugged build.', 
      images: ['/images/bikes/royal-enfield-himalayan-1.jpg'], 
      isActive: true 
    },
    { 
      name: 'Royal Enfield Classic 350', 
      slug: 'royal-enfield-classic-350', 
      brand: 'Royal Enfield', 
      category: 'BIKE', 
      pricePerDay: 1000, 
      engine: '349cc Single Cylinder', 
      mileage: '35 kmpl', 
      fuelType: 'PETROL', 
      transmission: 'MANUAL', 
      seatCapacity: 2, 
      description: 'The timeless Classic 350 continues to hold its appeal with its retro styling and thumping engine. A perfect companion for city rides and highway cruising.', 
      images: ['/images/bikes/royal-enfield-classic-350-1.jpg'], 
      isActive: true 
    },
    { 
      name: 'Suzuki Burgman', 
      slug: 'suzuki-burgman', 
      brand: 'Suzuki', 
      category: 'SCOOTER', 
      pricePerDay: 600, 
      engine: '124cc Single Cylinder', 
      mileage: '50 kmpl', 
      fuelType: 'PETROL', 
      transmission: 'AUTOMATIC', 
      seatCapacity: 2, 
      description: 'A maxi-scooter that offers unparalleled comfort and style for city commutes.', 
      images: ['/images/bikes/suzuki-burgman-1.jpg'], 
      isActive: true 
    },
    { 
      name: 'TVS NTorq', 
      slug: 'tvs-ntorq', 
      brand: 'TVS', 
      category: 'SCOOTER', 
      pricePerDay: 600, 
      engine: '124.8cc Single Cylinder', 
      mileage: '45 kmpl', 
      fuelType: 'PETROL', 
      transmission: 'AUTOMATIC', 
      seatCapacity: 2, 
      description: 'A sporty scooter that delivers thrilling performance and sharp handling.', 
      images: ['/images/bikes/tvs-ntorq-1.jpg'], 
      isActive: true 
    }
  ];

  console.log('Seeding bikes...');
  
  for (const bike of bikes) {
    const existing = await prisma.bike.findUnique({ where: { slug: bike.slug } });
    
    let createdBike;
    if (!existing) {
      createdBike = await prisma.bike.create({ data: bike });
      console.log(`Created bike: ${bike.name}`);
    } else {
      createdBike = await prisma.bike.update({ where: { slug: bike.slug }, data: bike });
      console.log(`Updated bike: ${bike.name}`);
    }

    // Add at least 2 units for each bike so they show up as "Available"
    const unitCount = await prisma.bikeUnit.count({ where: { bikeId: createdBike.id } });
    if (unitCount === 0) {
      await prisma.bikeUnit.create({
        data: {
          bikeId: createdBike.id,
          registrationNumber: `KA-01-${Math.floor(Math.random() * 9000) + 1000}`,
          color: 'Standard',
          status: 'AVAILABLE'
        }
      });
      await prisma.bikeUnit.create({
        data: {
          bikeId: createdBike.id,
          registrationNumber: `KA-01-${Math.floor(Math.random() * 9000) + 1000}`,
          color: 'Standard',
          status: 'AVAILABLE'
        }
      });
      console.log(`Added 2 units for ${bike.name}`);
    }
  }

  console.log('Done!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
