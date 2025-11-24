import React from 'react';
import { Availability } from '../types';
import { CheckCircle2, Circle, Clock, Sun, CalendarDays } from 'lucide-react';

interface AvailabilityProps {
  data: Availability;
  onUpdate: (data: Availability) => void;
}

const AvailabilityPage: React.FC<AvailabilityProps> = ({ data, onUpdate }) => {
  const toggle = (key: keyof Omit<Availability, 'hoursPerDay'>) => {
    onUpdate({ ...data, [key]: !data[key] });
  };

  const setHours = (hours: number) => {
    onUpdate({ ...data, hoursPerDay: hours });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Disponibilidade</h2>
        <p className="text-gray-500 text-sm mt-1">Quando você pode aceitar urgências?</p>
      </div>

      <div className="space-y-4">
        {/* Main Urgent Toggles */}
        <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-indigo-900 font-bold mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-indigo-500" />
            Imediato
          </h3>
          
          <ToggleItem 
            label="Disponível Hoje" 
            subLabel="Pode começar agora se necessário"
            active={data.availableToday} 
            onClick={() => toggle('availableToday')} 
          />
          <div className="h-px bg-indigo-100 my-3"></div>
          <ToggleItem 
            label="Disponível Amanhã" 
            subLabel="Pode agendar para o próximo dia"
            active={data.availableTomorrow} 
            onClick={() => toggle('availableTomorrow')} 
          />
        </div>

        {/* Regular Schedule */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
           <h3 className="text-gray-900 font-bold mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-gray-500" />
            Recorrência
          </h3>

           <ToggleItem 
            label="Dias de Semana" 
            subLabel="Segunda a Sexta"
            active={data.weekDays} 
            onClick={() => toggle('weekDays')} 
          />
          <div className="h-px bg-gray-100 my-3"></div>
           <ToggleItem 
            label="Finais de Semana" 
            subLabel="Sábado e Domingo (Plantões)"
            active={data.weekends} 
            onClick={() => toggle('weekends')} 
          />
        </div>

        {/* Hours slider */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-gray-900 font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            Carga Horária Diária
          </h3>
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold text-primary">{data.hoursPerDay}h</span>
            <span className="text-sm text-gray-500">por dia</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="12" 
            value={data.hoursPerDay}
            onChange={(e) => setHours(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>1h</span>
            <span>4h</span>
            <span>8h</span>
            <span>12h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToggleItemProps {
  label: string;
  subLabel: string;
  active: boolean;
  onClick: () => void;
}

const ToggleItem: React.FC<ToggleItemProps> = ({ label, subLabel, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between group text-left"
    >
      <div>
        <p className={`font-semibold ${active ? 'text-gray-900' : 'text-gray-500'}`}>{label}</p>
        <p className="text-xs text-gray-400">{subLabel}</p>
      </div>
      <div className={`transition-colors duration-300 ${active ? 'text-green-500' : 'text-gray-300'}`}>
        {active ? <CheckCircle2 className="w-6 h-6 fill-green-100" /> : <Circle className="w-6 h-6" />}
      </div>
    </button>
  );
};

export default AvailabilityPage;