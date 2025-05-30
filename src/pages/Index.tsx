
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import AIChat from '@/components/AIChat';
import SkinQuiz from '@/components/SkinQuiz';
import GuidesSection from '@/components/GuidesSection';
import Dashboard from '@/components/Dashboard';
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newGuideFromChat, setNewGuideFromChat] = useState<string>('');

  const handleAuthAction = () => {
    if (isAuthenticated) {
      // Handle logout or profile actions
      setActiveTab('dashboard');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleGenerateGuide = (topic: string) => {
    setNewGuideFromChat(topic);
    setActiveTab('guides');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="max-w-4xl mx-auto">
            <AIChat 
              userId={isAuthenticated ? 'user-123' : undefined} 
              onGenerateGuide={handleGenerateGuide}
            />
          </div>
        );
      case 'quiz':
        return <SkinQuiz />;
      case 'guides':
        return <GuidesSection newGuideFromChat={newGuideFromChat} />;
      case 'dashboard':
        return (
          <Dashboard 
            isAuthenticated={isAuthenticated} 
            onAuthAction={handleAuthAction} 
          />
        );
      default:
        return (
          <div className="max-w-4xl mx-auto">
            <AIChat 
              userId={isAuthenticated ? 'user-123' : undefined} 
              onGenerateGuide={handleGenerateGuide}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dark-gradient">
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        onAuthAction={handleAuthAction}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-pink rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
