import { useState, useCallback } from 'react';
import { useMonthLunarInfo, useCalendarNavigation } from '../../hooks';
import type { LunarDayInfo } from '../../services/lunar';
import { CalendarHeader } from './CalendarHeader';
import { DayCell } from './DayCell';
import { DayDetailPanel } from './DayDetailPanel';
import { Legend } from './Legend';

export function LunarCalendar() {
  const { defaultYear, defaultMonth, getNextMonth, getPreviousMonth } = useCalendarNavigation();
  
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);
  const [selectedDay, setSelectedDay] = useState<LunarDayInfo | null>(null);
  
  const monthData = useMonthLunarInfo(year, month);
  
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;

  const handlePreviousMonth = useCallback(() => {
    const { year: newYear, month: newMonth } = getPreviousMonth(year, month);
    setYear(newYear);
    setMonth(newMonth);
  }, [year, month, getPreviousMonth]);

  const handleNextMonth = useCallback(() => {
    const { year: newYear, month: newMonth } = getNextMonth(year, month);
    setYear(newYear);
    setMonth(newMonth);
  }, [year, month, getNextMonth]);

  const handleToday = useCallback(() => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth() + 1);
  }, []);

  const handleSelectDay = useCallback((dayInfo: LunarDayInfo) => {
    setSelectedDay(dayInfo);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedDay(null);
  }, []);

  // Calculer le premier jour du mois pour l'alignement de la grille
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  // Ajuster pour commencer par Lundi (0 = Lundi, 6 = Dimanche)
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Noms des jours - version courte pour mobile, longue pour desktop
  const dayNamesShort = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const dayNamesFull = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6">
      <CalendarHeader
        year={year}
        month={month}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {dayNamesFull.map((day, index) => (
          <div
            key={day}
            className="text-center text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)] py-2"
          >
            <span className="sm:hidden">{dayNamesShort[index]}</span>
            <span className="hidden sm:inline">{day}</span>
          </div>
        ))}
      </div>

      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {/* Cellules vides pour l'alignement */}
        {Array.from({ length: startOffset }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square sm:aspect-auto" />
        ))}

        {/* Jours du mois */}
        {monthData.map((dayInfo) => (
          <DayCell
            key={dayInfo.gregorianDay}
            dayInfo={dayInfo}
            isToday={isCurrentMonth && dayInfo.gregorianDay === today.getDate()}
            onSelect={handleSelectDay}
          />
        ))}
      </div>

      <Legend />

      {/* Panel de détails */}
      <DayDetailPanel 
        dayInfo={selectedDay} 
        onClose={handleCloseDetail} 
      />
    </div>
  );
}
