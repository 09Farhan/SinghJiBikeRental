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
    description: ''
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
        description: bike.description || ''
      });
    } else if (isOpen) {
      setFormData({
        name: '', brand: '', category: 'BIKE', pricePerDay: '',
        engine: '', mileage: '', fuelType: 'PETROL', transmission: 'MANUAL',
        seatCapacity: '2', description: ''
      });
    }
  }, [bike, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      pricePerDay: Number(formData.pricePerDay),
      seatCapacity: Number(formData.seatCapacity)
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
          ></textarea>
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
