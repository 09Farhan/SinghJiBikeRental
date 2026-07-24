import { useState, useMemo, useEffect } from 'react';
import { calculateDays, calculateRentalAmount } from '@/lib/utils';

export function useBooking(bikePricePerDay: number) {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [step, setStep] = useState<number>(1);

  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;
    return calculateDays(new Date(startDate), new Date(endDate));
  }, [startDate, endDate]);

  const totalAmount = useMemo(() => {
    return calculateRentalAmount(bikePricePerDay, totalDays);
  }, [bikePricePerDay, totalDays]);

  const setDates = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const reset = () => {
    setStartDate('');
    setEndDate('');
    setStep(1);
  };

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setDates,
    totalDays,
    totalAmount,
    step,
    setStep,
    reset,
  };
}
