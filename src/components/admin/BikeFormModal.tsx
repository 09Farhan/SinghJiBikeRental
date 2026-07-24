'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

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
    image: ''
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
        image: bike.images?.[0] || ''
      });
    } else if (isOpen) {
      setFormData({
        name: '', brand: '', category: 'BIKE', pricePerDay: '',
        engine: '', mileage: '', fuelType: 'PETROL', transmission: 'MANUAL',
        seatCapacity: '2', description: '', image: ''
      });
    }
  }, [bike, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image && !bike) {
      alert('Please upload an image');
      return;
    }
    
    onSubmit({
      ...formData,
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      pricePerDay: Number(formData.pricePerDay),
      seatCapacity: Number(formData.seatCapacity),
      images: formData.image ? [formData.image] : undefined
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
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 flex-shrink-0">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500/10 file:text-orange-500 hover:file:bg-orange-500/20"
            />
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
