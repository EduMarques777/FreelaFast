import React from 'react';
import { Clock, MapPin, DollarSign, AlertCircle } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const isUrgent = job.urgencyLevel === 'alta';

  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
      
      {/* Urgency Badge */}
      {isUrgent && (
        <div className="absolute top-0 right-0 bg-red-50 text-urgent text-xs font-bold px-3 py-1 rounded-bl-xl border-l border-b border-red-100 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          URGENTE
        </div>
      )}

      <div className="mb-3 pr-20">
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{job.title}</h3>
        <p className="text-gray-500 text-sm font-medium">{job.companyName}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skillsRequired.slice(0, 3).map((skill, i) => (
          <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
            {skill}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-green-700">{job.budget}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5 col-span-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-primary font-medium">
            {job.type === 'substituicao' ? 'Substituição Imediata' : job.type === 'pico_demanda' ? 'Apoio em Pico' : 'Projeto Rápido'}
          </span>
        </div>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
        {job.description}
      </p>

      <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors active:scale-[0.98]">
        Candidatar-se Agora
      </button>
    </div>
  );
};

export default JobCard;