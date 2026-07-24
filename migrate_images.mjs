import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'a6ztqdg1',
  api_key: '271929154934584',
  api_secret: '5iFkyy2WCPXuOLIt1uOdbRn4wyg'
});

const prisma = new PrismaClient();

async function main() {
  const bikes = await prisma.bike.findMany();
  for (const bike of bikes) {
    const newImages = [];
    let updated = false;
    for (const img of bike.images) {
      if (img.startsWith('data:image')) {
        console.log(`Uploading image for bike: ${bike.name}`);
        try {
          const res = await cloudinary.uploader.upload(img, { folder: 'bike_rental' });
          newImages.push(res.secure_url);
          updated = true;
        } catch (e) {
          console.error(e);
          newImages.push(img);
        }
      } else {
        newImages.push(img);
      }
    }
    if (updated) {
      await prisma.bike.update({
        where: { id: bike.id },
        data: { images: newImages }
      });
      console.log(`Updated images for bike: ${bike.name}`);
    }
  }
  console.log('Migration complete');
}
main();
