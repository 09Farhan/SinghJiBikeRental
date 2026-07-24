'use client';

import { useState, useEffect } from 'react';
import InventoryTable from '@/components/admin/InventoryTable';
import BikeFormModal from '@/components/admin/BikeFormModal';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBike, setEditingBike] = useState<any>(null);

  const fetchInventory = async () => {
    try {
      const res = await fetch('/api/bikes');
      const data = await res.json();
      if (data.success) {
        setInventory(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch inventory', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleEdit = (bike: any) => {
    setEditingBike(bike);
    setIsModalOpen(true);
  };

  const handleDeleteBike = async (bikeId: string) => {
    try {
      const res = await fetch(`/api/bikes/${bikeId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (data.success) {
        setInventory(inventory.filter(bike => bike.id !== bikeId));
      } else {
        alert('Failed to delete bike: ' + data.error);
      }
    } catch (error) {
      console.error('Failed to delete bike', error);
      alert('Error deleting bike');
    }
  };

  const handleToggleUnit = async (bikeId: string, unitId: string, newStatus: string) => {
    // Optimistic update
    setInventory(inventory.map(bike => {
      if (bike.id === bikeId) {
        return {
          ...bike,
          units: bike.units.map((unit: any) => unit.id === unitId ? { ...unit, status: newStatus } : unit)
        };
      }
      return bike;
    }));
    // Note: We'd need an API route for unit updates, skipping for now since we focus on bike updates
  };

  const handleDeleteUnit = async (bikeId: string, unitId: string) => {
    try {
      const res = await fetch(`/api/bikes/units/${unitId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (data.success) {
        setInventory(inventory.map(bike => {
          if (bike.id === bikeId) {
            return {
              ...bike,
              units: bike.units.filter((unit: any) => unit.id !== unitId)
            };
          }
          return bike;
        }));
      } else {
        alert('Failed to delete unit: ' + data.error);
      }
    } catch (error) {
      console.error('Failed to delete unit', error);
      alert('Error deleting unit');
    }
  };

  const handleSave = async (bikeData: any) => {
    try {
      const { image, ...payload } = bikeData;
      const url = editingBike ? `/api/bikes/${editingBike.id}` : '/api/bikes';
      const method = editingBike ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        await fetchInventory(); // Refresh data
        setIsModalOpen(false);
      } else {
        alert('Failed to save bike: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving bike', error);
      alert('Error saving bike');
    }
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
          { label: 'Total Models', value: inventory.length, color: 'text-blue-400' },
          { label: 'Total Units', value: inventory.reduce((acc, bike) => acc + (bike.units?.length || 0), 0), color: 'text-purple-400' },
          { label: 'Available', value: inventory.reduce((acc, bike) => acc + (bike.units?.filter((u: any) => u.status === 'AVAILABLE').length || 0), 0), color: 'text-green-400' },
          { label: 'In Maintenance', value: inventory.reduce((acc, bike) => acc + (bike.units?.filter((u: any) => u.status === 'MAINTENANCE').length || 0), 0), color: 'text-red-400' }
        ].map((stat, i) => (
          <Card key={i} className="bg-[#111827] border-gray-700/50 p-4">
            <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </Card>
        ))}
      </div>

      <div className="bg-[#111827] border border-gray-700/50 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Loading inventory...</div>
        ) : (
          <InventoryTable 
            inventory={inventory} 
            onEdit={handleEdit} 
            onDelete={handleDeleteBike}
            onToggleUnit={handleToggleUnit} 
            onDeleteUnit={handleDeleteUnit}
          />
        )}
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
