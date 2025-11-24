import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Save, Plus, X } from 'lucide-react';

interface ProfileProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [newSkill, setNewSkill] = useState('');

  const handleChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Seu Perfil</h2>
        <p className="text-gray-500 text-sm mt-1">Mantenha atualizado para receber as melhores vagas.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="Ex: Ana Silva"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título Profissional</label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => handleChange('headline', e.target.value)}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="Ex: Designer Gráfico Senior"
            />
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nível de Experiência</label>
          <div className="grid grid-cols-4 gap-2">
            {(['junior', 'mid', 'senior', 'specialist'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, experienceLevel: level }))}
                className={`py-2 px-1 rounded-lg text-xs font-medium capitalize border ${
                  formData.experienceLevel === level
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {level === 'specialist' ? 'Espec.' : level}
              </button>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Habilidades Técnicas</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              className="flex-1 p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Adicionar skill (ex: Python)"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-gray-900 text-white p-3 rounded-xl hover:bg-gray-800"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map(skill => (
              <span key={skill} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 group">
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Formação / Certificações</label>
            <textarea
              value={formData.education}
              onChange={(e) => handleChange('education', e.target.value)}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all h-24 resize-none"
              placeholder="Liste suas principais formações..."
            />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar Perfil
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;