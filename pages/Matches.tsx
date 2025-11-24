import React, { useEffect, useState, useCallback } from 'react';
import { UserProfile, Availability, Job } from '../types';
import JobCard from '../components/JobCard';
import { fetchMatchingJobs } from '../services/gemini';
import { RefreshCw, Sparkles, Filter } from 'lucide-react';

interface MatchesProps {
  profile: UserProfile;
  availability: Availability;
}

const Matches: React.FC<MatchesProps> = ({ profile, availability }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const getJobs = useCallback(async () => {
    if (!process.env.API_KEY) {
      alert("Configure sua API Key no environment para usar o Gemini.");
      return;
    }
    
    setLoading(true);
    const newJobs = await fetchMatchingJobs(profile, availability);
    setJobs(newJobs);
    setLoading(false);
    setHasFetched(true);
  }, [profile, availability]);

  // Initial fetch if haven't fetched yet
  useEffect(() => {
    if (!hasFetched && profile.name) {
      getJobs();
    }
  }, [hasFetched, profile.name, getJobs]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vagas Compatíveis</h2>
          <p className="text-gray-500 text-sm mt-1">Baseado no seu perfil e urgência.</p>
        </div>
        <button 
          onClick={getJobs}
          disabled={loading}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Buscando oportunidades...</p>
            <p className="text-sm text-gray-500">A IA está analisando demandas urgentes.</p>
          </div>
        </div>
      ) : jobs.length > 0 ? (
        <div className="space-y-4">
           <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <span className="whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Recomendados
              </span>
              <span className="whitespace-nowrap bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium">
                Mais Recentes
              </span>
              <span className="whitespace-nowrap bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium">
                Maior Valor
              </span>
           </div>
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900">Nenhuma vaga encontrada</h3>
          <p className="text-gray-500 text-sm max-w-xs mx-auto mt-2">
             Tente adicionar mais skills ao seu perfil ou aumentar sua disponibilidade.
          </p>
          <button 
             onClick={getJobs}
             className="mt-6 text-primary font-bold text-sm hover:underline"
          >
            Tentar Novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default Matches;