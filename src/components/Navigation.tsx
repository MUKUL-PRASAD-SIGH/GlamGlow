
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, User, MessageCircle, BookOpen, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthenticated: boolean;
  onAuthAction: () => void;
}

const Navigation = ({ activeTab, setActiveTab, isAuthenticated, onAuthAction }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'quiz', label: 'Skin Quiz', icon: Sparkles },
    { id: 'guides', label: 'Guides', icon: BookOpen },
    { id: 'dashboard', label: 'Dashboard', icon: User },
  ];

  return (
    <nav className="glass-effect border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-neon-pink animate-glow" />
            <h1 className="text-2xl font-bold neon-text text-neon-pink">
              GlamBot
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 ${
                    activeTab === item.id
                      ? 'bg-neon-pink/20 text-neon-pink neon-border'
                      : 'text-white/80 hover:text-neon-blue hover:bg-white/10'
                  } transition-all duration-300 neon-glow`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Auth Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={onAuthAction}
              className={`hidden sm:flex ${
                isAuthenticated 
                  ? 'bg-neon-green/20 text-neon-green border border-neon-green/50' 
                  : 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50'
              } hover:scale-105 transition-all duration-300 neon-glow`}
            >
              <User className="h-4 w-4 mr-2" />
              {isAuthenticated ? 'Profile' : 'Login'}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white/80 hover:text-neon-cyan"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center justify-start space-x-3 w-full ${
                      activeTab === item.id
                        ? 'bg-neon-pink/20 text-neon-pink neon-border'
                        : 'text-white/80 hover:text-neon-blue hover:bg-white/10'
                    } transition-all duration-300`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
              <Button
                onClick={() => {
                  onAuthAction();
                  setIsMenuOpen(false);
                }}
                className={`flex items-center justify-start space-x-3 w-full ${
                  isAuthenticated 
                    ? 'bg-neon-green/20 text-neon-green border border-neon-green/50' 
                    : 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50'
                } transition-all duration-300`}
              >
                <User className="h-4 w-4" />
                <span>{isAuthenticated ? 'Profile' : 'Login'}</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
