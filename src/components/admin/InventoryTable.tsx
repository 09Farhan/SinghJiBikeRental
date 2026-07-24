'use client';

import React, { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface InventoryTableProps {
  inventory: any[];
  onEdit: (bike: any) => void;
  onToggleUnit: (bikeId: string, unitId: string, status: string) => void;
  onDeleteUnit?: (bikeId: string, unitId: string) => void;
}

export default function InventoryTable({ inventory, onEdit, onToggleUnit, onDeleteUnit }: InventoryTableProps) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getUnitStatusVariant = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'success';
      case 'MAINTENANCE': return 'warning';
      case 'BOOKED': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#1f2937] text-gray-400 text-xs uppercase tracking-wider">
            <th className="px-6 py-4 font-medium w-10"></th>
            <th className="px-6 py-4 font-medium">Model</th>
            <th className="px-6 py-4 font-medium">Brand</th>
            <th className="px-6 py-4 font-medium">Category</th>
            <th className="px-6 py-4 font-medium">Price/Day</th>
            <th className="px-6 py-4 font-medium">Units Summary</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {inventory.map((bike) => {
            const isExpanded = expandedRows[bike.id];
            const available = bike.units.filter((u: any) => u.status === 'AVAILABLE').length;
            const booked = bike.units.filter((u: any) => u.status === 'BOOKED').length;
            const maintenance = bike.units.filter((u: any) => u.status === 'MAINTENANCE').length;

            return (
              <React.Fragment key={bike.id}>
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleRow(bike.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{bike.name}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{bike.brand}</td>
                  <td className="px-6 py-4">
                    <Badge variant="info">{bike.category}</Badge>
                  </td>
                  <td className="px-6 py-4 text-white text-sm font-medium">
                    {formatCurrency(bike.pricePerDay)}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    <span className="text-green-400">{available} Avail</span> ·{' '}
                    <span className="text-red-400">{booked} Booked</span> ·{' '}
                    <span className="text-amber-400">{maintenance} Maint</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onEdit(bike)}
                      className="text-orange-400 hover:text-orange-300 text-sm font-medium mr-4"
                    >
                      Edit Model
                    </button>
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                      + Add Unit
                    </button>
                  </td>
                </tr>
                {isExpanded && (
                  <tr>
                    <td colSpan={7} className="p-0 border-t border-gray-800 bg-[#172033]">
                      <div className="px-14 py-4">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="text-gray-500 text-xs uppercase">
                              <th className="pb-2 font-medium">Registration Number</th>
                              <th className="pb-2 font-medium">Color</th>
                              <th className="pb-2 font-medium">Status</th>
                              <th className="pb-2 font-medium text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800/50">
                            {bike.units.map((unit: any) => (
                              <tr key={unit.id}>
                                <td className="py-2 text-sm text-gray-300">{unit.registrationNumber}</td>
                                <td className="py-2 text-sm text-gray-300">{unit.color}</td>
                                <td className="py-2">
                                  <Badge variant={getUnitStatusVariant(unit.status)}>{unit.status}</Badge>
                                </td>
                                <td className="py-2 text-right flex justify-end gap-2 items-center h-full">
                                  <select
                                    value={unit.status}
                                    onChange={(e) => onToggleUnit(bike.id, unit.id, e.target.value)}
                                    className="bg-[#1f2937] border border-gray-700 text-white text-xs rounded p-1 focus:ring-1 focus:ring-orange-500 outline-none"
                                  >
                                    <option value="AVAILABLE">Available</option>
                                    <option value="BOOKED">Booked</option>
                                    <option value="MAINTENANCE">Maintenance</option>
                                  </select>
                                  {onDeleteUnit && (
                                    <button
                                      onClick={() => {
                                        if (confirm('Are you sure you want to delete this unit?')) {
                                          onDeleteUnit(bike.id, unit.id);
                                        }
                                      }}
                                      className="text-red-500 hover:text-red-400 p-1"
                                      title="Delete Unit"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                            {bike.units.length === 0 && (
                              <tr>
                                <td colSpan={4} className="py-4 text-center text-sm text-gray-500">
                                  No units added yet.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
