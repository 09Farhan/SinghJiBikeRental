'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { CldUploadWidget } from 'next-cloudinary';
import { toast } from 'react-hot-toast';

interface BikeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  bike?: any;
  onSubmit: (data: any) => void;
}

export default function BikeFormModal({ isOpen, onClose, bike, onSubmit }: BikeFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'BIKE',
    pricePerDay: '',
    engine: '',
    mileage: '',
    fuelType: 'PETROL',
    transmission: 'MANUAL',
    seatCapacity: '2',
    description: '',
    image: '',
    registrationNumber: ''
  });

  useEffect(() => {
    if (bike && isOpen) {
      setFormData({
        name: bike.name || '',
        brand: bike.brand || '',
        category: bike.category || 'BIKE',
        pricePerDay: bike.pricePerDay ? String(bike.pricePerDay) : '',
        engine: bike.engine || '',
        mileage: bike.mileage || '',
        fuelType: bike.fuelType || 'PETROL',
        transmission: bike.transmission || 'MANUAL',
        seatCapacity: bike.seatCapacity ? String(bike.seatCapacity) : '2',
        description: bike.description || '',
        image: bike.images?.[0] || '',
        registrationNumber: bike.units?.[0]?.registrationNumber || ''
      });
    } else if (isOpen) {
      setFormData({
        name: '', brand: '', category: 'BIKE', pricePerDay: '',
        engine: '', mileage: '', fuelType: 'PETROL', transmission: 'MANUAL',
        seatCapacity: '2', description: '', image: '', registrationNumber: ''
      });
    }
  }, [bike, isOpen]);

  // handleImageChange removed in favor of CldUploadWidget

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image && !bike) {
      toast.error('Please upload an image');
      return;
    }
    
    onSubmit({
      ...formData,
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      pricePerDay: Number(formData.pricePerDay),
      seatCapacity: Number(formData.seatCapacity),
      images: formData.image ? [formData.image] : []
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={bike ? 'Edit Bike' : 'Add New Bike'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Name" 
            value={formData.name} 
            onChange={e => setFormData({ ...formData, name: e.target.value })} 
            required 
          />
          <Input 
            label="Brand" 
            value={formData.brand} 
            onChange={e => setFormData({ ...formData, brand: e.target.value })} 
            required 
          />
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Category</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              <option value="BIKE">Bike</option>
              <option value="SCOOTER">Scooter</option>
            </select>
          </div>
          
          <Input 
            label="Price Per Day (₹)" 
            type="number" 
            value={formData.pricePerDay} 
            onChange={e => setFormData({ ...formData, pricePerDay: e.target.value })} 
            required 
          />
          
          <Input 
            label="Engine (cc)" 
            value={formData.engine} 
            onChange={e => setFormData({ ...formData, engine: e.target.value })} 
          />

          <Input 
            label="Registration Number" 
            value={formData.registrationNumber} 
            onChange={e => setFormData({ ...formData, registrationNumber: e.target.value })} 
            placeholder="e.g. MH 01 AB 1234"
          />
          
          <Input 
            label="Mileage (km/l)" 
            value={formData.mileage} 
            onChange={e => setFormData({ ...formData, mileage: e.target.value })} 
          />
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Fuel Type</label>
            <select 
              value={formData.fuelType}
              onChange={e => setFormData({ ...formData, fuelType: e.target.value })}
              className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              <option value="PETROL">Petrol</option>
              <option value="ELECTRIC">Electric</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Transmission</label>
            <select 
              value={formData.transmission}
              onChange={e => setFormData({ ...formData, transmission: e.target.value })}
              className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              <option value="MANUAL">Manual</option>
              <option value="AUTOMATIC">Automatic</option>
            </select>
          </div>
          
          <Input 
            label="Seat Capacity" 
            type="number" 
            value={formData.seatCapacity} 
            onChange={e => setFormData({ ...formData, seatCapacity: e.target.value })} 
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">Description</label>
          <textarea 
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 min-h-[100px] resize-y"
            required
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Bike Image</label>
          <div className="flex items-center gap-4">
            {formData.image && (
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 flex-shrink-0 group">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  title="Remove Image"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            )}
            <CldUploadWidget 
              uploadPreset="bike_rental_preset"
              onSuccess={(result: any) => {
                setFormData(prev => ({ ...prev, image: result.info.secure_url }));
              }}
            >
              {({ open }) => (
                <button 
                  type="button" 
                  onClick={(e) => { e.preventDefault(); open(); }}
                  className="text-sm py-2 px-4 rounded-full font-semibold bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 transition-colors"
                >
                  Upload Image
                </button>
              )}
            </CldUploadWidget>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Save Bike
          </Button>
        </div>
      </form>
    </Modal>
  );
}
