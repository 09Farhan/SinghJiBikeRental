'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ReviewForm from './ReviewForm';

interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  images: string[];
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    setShowSuccessMessage(true);
    fetchReviews();
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            What Our Riders in Siliguri Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mb-8"></div>
          
          <Button onClick={() => setShowReviewForm(true)} size="lg">
            Write a Review
          </Button>

          {showSuccessMessage && (
            <div className="mt-6 text-green-400 bg-green-500/10 border border-green-500/20 px-6 py-3 rounded-full">
              Thank you! Your review has been submitted successfully.
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No reviews yet. Be the first to leave one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((t) => (
              <div 
                key={t.id}
                className="bg-[#111827] shadow-neu border border-gray-800 rounded-2xl p-6 relative overflow-hidden group hover:shadow-neu-pressed transition-all flex flex-col h-full"
              >
                {/* Decorative Quote Mark */}
                <div className="absolute -top-4 -right-2 text-9xl text-amber-500/10 font-heading leading-none select-none group-hover:text-amber-500/20 transition-colors">
                  "
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4 text-yellow-400">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} className={`w-5 h-5 ${idx >= t.rating ? 'text-gray-600' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-gray-300 italic mb-6 leading-relaxed flex-grow">
                    "{t.comment}"
                  </p>
                  
                  {/* Photos */}
                  {t.images && t.images.length > 0 && (
                    <div className="flex gap-2 mb-6 mt-auto">
                      {t.images.map((img, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-700">
                          <Image src={img} alt={`Review photo ${i + 1}`} fill sizes="64px" className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className={!t.images || t.images.length === 0 ? "mt-auto" : ""}>
                    <h4 className="text-white font-semibold font-heading text-lg">
                      {t.author}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showReviewForm && (
        <ReviewForm 
          onClose={() => setShowReviewForm(false)} 
          onSuccess={handleReviewSuccess}
        />
      )}
    </section>
  );
}
