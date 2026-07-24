import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function HeroSection() {
  const totalBikes = await prisma.bikeUnit.count();
  const reviewStats = await prisma.review.aggregate({
    _avg: { rating: true },
    where: { isApproved: true }
  });
  
  const displayRating = reviewStats._avg.rating ? reviewStats._avg.rating.toFixed(1) : "4.8";
  const displayBikes = totalBikes > 0 ? `${totalBikes}+` : "50+";
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0e1a] via-[#0a0e1a]/95 to-[#0a0e1a] py-20 px-4 md:px-8">
      {/* Decorative Gradients */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/5 blur-3xl top-1/4 -right-32 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl bottom-1/4 -left-32 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div 
          className="animate-fade-in-up bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-full px-4 py-2 text-sm font-medium mb-8"
          style={{ animationDelay: '0ms' }}
        >
          Premium Bike & Scooter Rentals
        </div>
        
        {/* Main Heading */}
        <h1 
          className="animate-fade-in-up font-heading text-5xl md:text-7xl font-bold tracking-tight mb-6"
          style={{ animationDelay: '100ms' }}
        >
          <span className="text-white block mb-2">Explore India on</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Two Wheels</span>
        </h1>
        
        {/* Subheading */}
        <p 
          className="animate-fade-in-up text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-body"
          style={{ animationDelay: '200ms' }}
        >
          Rent premium bikes and scooters for your next adventure. Self-drive rentals with doorstep delivery, starting at just ₹600/day.
        </p>
        
        {/* CTA Buttons */}
        <div 
          className="animate-fade-in-up flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto"
          style={{ animationDelay: '300ms' }}
        >
          <Link 
            href="/bikes" 
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium text-lg hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center w-full sm:w-auto"
          >
            Browse Our Fleet
          </Link>
          <Link 
            href="/contact" 
            className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium text-lg hover:bg-white/10 transition-all flex items-center justify-center w-full sm:w-auto"
          >
            Contact Us
          </Link>
        </div>
        
        {/* Trust Indicators */}
        <div 
          className="animate-fade-in-up flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm md:text-base text-gray-400 font-medium"
          style={{ animationDelay: '400ms' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-orange-400 font-bold text-lg">500+</span> 
            <span>Happy Riders</span>
          </div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-gray-700"></div>
          <div className="flex items-center gap-2">
            <span className="text-orange-400 font-bold text-lg">{displayBikes}</span> 
            <span>Bikes Available</span>
          </div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-gray-700"></div>
          <div className="flex items-center gap-2">
            <span className="text-orange-400 font-bold text-lg">{displayRating}★</span> 
            <span>Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
