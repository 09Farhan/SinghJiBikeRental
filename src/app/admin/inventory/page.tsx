'use client';

import { useState } from 'react';
import InventoryTable from '@/components/admin/InventoryTable';
import BikeFormModal from '@/components/admin/BikeFormModal';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const DEMO_INVENTORY = [
  { id: '1', name: 'BMW G 310 GS', brand: 'BMW', category: 'BIKE', pricePerDay: 2000, isActive: true, units: [
    { id: 'u1', registrationNumber: 'KA-01-AB-1234', color: 'Black', status: 'BOOKED' },
    { id: 'u2', registrationNumber: 'KA-01-AB-1235', color: 'White', status: 'AVAILABLE' }
  ]},
  { id: '2', name: 'Royal Enfield Classic 350', brand: 'Royal Enfield', category: 'BIKE', pricePerDay: 1000, isActive: true, units: [
    { id: 'u3', registrationNumber: 'KA-01-CD-5678', color: 'Silver', status: 'AVAILABLE' },
    { id: 'u4', registrationNumber: 'KA-01-CD-5679', color: 'Black', status: 'BOOKED' },
    { id: 'u5', registrationNumber: 'KA-01-CD-5680', color: 'Green', status: 'MAINTENANCE' }
  ]},
  { id: '3', name: 'Royal Enfield Himalayan', brand: 'Royal Enfield', category: 'BIKE', pricePerDay: 1500, isActive: true, units: [
    { id: 'u6', registrationNumber: 'KA-01-IJ-7890', color: 'Red', status: 'BOOKED' },
    { id: 'u7', registrationNumber: 'KA-01-IJ-7891', color: 'Grey', status: 'AVAILABLE' }
  ]},
  { id: '4', name: 'KTM Duke 390', brand: 'KTM', category: 'BIKE', pricePerDay: 1800, isActive: true, units: [
    { id: 'u8', registrationNumber: 'KA-01-EF-9012', color: 'Orange', status: 'AVAILABLE' }
  ]},
  { id: '5', name: 'TVS Apache RTR 160', brand: 'TVS', category: 'BIKE', pricePerDay: 800, isActive: true, units: [
    { id: 'u9', registrationNumber: 'KA-01-KL-2345', color: 'Grey', status: 'AVAILABLE' },
    { id: 'u10', registrationNumber: 'KA-01-KL-2346', color: 'Red', status: 'AVAILABLE' }
  ]},
  { id: '6', name: 'Honda Activa 6G', brand: 'Honda', category: 'SCOOTER', pricePerDay: 400, isActive: true, units: [
    { id: 'u11', registrationNumber: 'KA-01-GH-3456', color: 'White', status: 'AVAILABLE' },
    { id: 'u12', registrationNumber: 'KA-01-GH-3457', color: 'Grey', status: 'AVAILABLE' },
    { id: 'u13', registrationNumber: 'KA-01-GH-3458', color: 'Black', status: 'MAINTENANCE' }
  ]},
  { id: '7', name: 'Suzuki Access 125', brand: 'Suzuki', category: 'SCOOTER', pricePerDay: 450, isActive: true, units: [
    { id: 'u14', registrationNumber: 'KA-01-MN-4567', color: 'Blue', status: 'AVAILABLE' },
    { id: 'u15', registrationNumber: 'KA-01-MN-4568', color: 'Red', status: 'AVAILABLE' }
  ]},
  { id: '8', name: 'Yamaha Aerox 155', brand: 'Yamaha', category: 'SCOOTER', pricePerDay: 600, isActive: true, units: [
    { id: 'u16', registrationNumber: 'KA-01-OP-5678', color: 'Blue', status: 'AVAILABLE' }
  ]}
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState(DEMO_INVENTORY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBike, setEditingBike] = useState<any>(null);

  const handleEdit = (bike: any) => {
    setEditingBike(bike);
    setIsModalOpen(true);
  };

  const handleToggleUnit = (bikeId: string, unitId: string, newStatus: string) => {
    setInventory(inventory.map(bike => {
      if (bike.id === bikeId) {
        return {
          ...bike,
          units: bike.units.map(unit => unit.id === unitId ? { ...unit, status: newStatus } : unit)
        };
      }
      return bike;
    }));
  };

  const handleSave = (bikeData: any) => {
    if (editingBike) {
      setInventory(inventory.map(b => b.id === editingBike.id ? { ...b, ...bikeData } : b));
    } else {
      setInventory([{ ...bikeData, id: String(Date.now()), units: [] }, ...inventory]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 mt-[-64px]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Fleet Inventory</h1>
        <Button onClick={() => { setEditingBike(null); setIsModalOpen(true); }}>
          Add New Bike
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Models', value: '8', color: 'text-blue-400' },
          { label: 'Total Units', value: '16', color: 'text-purple-400' },
          { label: 'Available', value: '12', color: 'text-green-400' },
          { label: 'In Maintenance', value: '2', color: 'text-red-400' }
        ].map((stat, i) => (
          <Card key={i} className="bg-[#111827] border-gray-700/50 p-4">
            <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </Card>
        ))}
      </div>

      <div className="bg-[#111827] border border-gray-700/50 rounded-2xl overflow-hidden">
        <InventoryTable 
          inventory={inventory} 
          onEdit={handleEdit} 
          onToggleUnit={handleToggleUnit} 
        />
      </div>

      <BikeFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bike={editingBike}
        onSubmit={handleSave}
      />
    </div>
  );
}
