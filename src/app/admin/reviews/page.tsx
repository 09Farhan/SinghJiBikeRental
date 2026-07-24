'use client';

import { useState, useEffect } from 'react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  images: string[];
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      // Pass 'all=true' to fetch approved and pending reviews
      const res = await fetch('/api/reviews?all=true');
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

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: !currentStatus }),
      });
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isApproved: !currentStatus } : r))
        );
      }
    } catch (error) {
      console.error('Failed to update review:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete review:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Customer Reviews</h1>
          <p className="text-gray-400">Manage and approve reviews displayed on the homepage.</p>
        </div>
      </div>

      <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No reviews found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Photos
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{review.author}</div>
                      <div className="text-sm text-gray-500">{review.location}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i >= review.rating ? 'text-gray-700' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-300 max-w-xs truncate" title={review.comment}>
                        {review.comment}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {review.images && review.images.slice(0, 3).map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt="Preview"
                            className="w-8 h-8 rounded-full border-2 border-[#111827] object-cover"
                          />
                        ))}
                        {review.images && review.images.length === 0 && (
                          <span className="text-gray-500 text-sm">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={review.isApproved ? 'success' : 'warning'}>
                        {review.isApproved ? 'Approved' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleApproval(review.id, review.isApproved)}
                          disabled={isUpdating === review.id}
                        >
                          {review.isApproved ? 'Hide' : 'Approve'}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(review.id)}
                          disabled={isUpdating === review.id}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
