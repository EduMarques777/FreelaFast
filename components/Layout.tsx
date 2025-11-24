import React from 'react';
import { Briefcase, User, Calendar, Bell } from 'lucide-react';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentRoute, onNavigate }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            FreelaFast
          </h1>
        </div>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-urgent rounded-full border border-white"></span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-100 fixed bottom-0 w-full max-w-md z-20">
        <div className="flex justify-around items-center px-2 py-2">
          <NavButton 
            active={currentRoute === AppRoute.MATCHES} 
            onClick={() => onNavigate(AppRoute.MATCHES)}
            icon={<Briefcase className="w-6 h-6" />}
            label="Vagas"
          />
          <NavButton 
            active={currentRoute === AppRoute.AVAILABILITY} 
            onClick={() => onNavigate(AppRoute.AVAILABILITY)}
            icon={<Calendar className="w-6 h-6" />}
            label="Agenda"
          />
          <NavButton 
            active={currentRoute === AppRoute.PROFILE} 
            onClick={() => onNavigate(AppRoute.PROFILE)}
            icon={<User className="w-6 h-6" />}
            label="Perfil"
          />
        </div>
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all w-20 ${
        active ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <div className={`transition-transform duration-200 ${active ? 'scale-110' : ''}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-medium mt-1 ${active ? 'opacity-100' : 'opacity-70'}`}>
        {label}
      </span>
    </button>
  );
};

export default Layout;