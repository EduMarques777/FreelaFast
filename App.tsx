import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import AvailabilityPage from './pages/Availability';
import Matches from './pages/Matches';
import { AppRoute, UserProfile, Availability } from './types';

const INITIAL_PROFILE: UserProfile = {
  name: 'Alex Ferreira',
  headline: 'Desenvolvedor Frontend',
  skills: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
  education: 'Bacharelado em Ciência da Computação - USP',
  experienceLevel: 'mid'
};

const INITIAL_AVAILABILITY: Availability = {
  availableToday: true,
  availableTomorrow: true,
  weekDays: true,
  weekends: false,
  hoursPerDay: 8
};

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.MATCHES);
  
  // In a real app, this would be in Context or Redux and persisted
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [availability, setAvailability] = useState<Availability>(INITIAL_AVAILABILITY);

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.MATCHES:
        return <Matches profile={profile} availability={availability} />;
      case AppRoute.PROFILE:
        return <Profile profile={profile} onUpdate={setProfile} />;
      case AppRoute.AVAILABILITY:
        return <AvailabilityPage data={availability} onUpdate={setAvailability} />;
      default:
        return <Matches profile={profile} availability={availability} />;
    }
  };

  return (
    <HashRouter>
      <Layout currentRoute={currentRoute} onNavigate={setCurrentRoute}>
        {renderContent()}
      </Layout>
    </HashRouter>
  );
};

export default App;