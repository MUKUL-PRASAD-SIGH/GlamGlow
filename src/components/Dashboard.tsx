
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  MessageCircle, 
  BookOpen, 
  Star, 
  Calendar, 
  TrendingUp, 
  Award,
  Sparkles,
  Heart,
  Target,
  BarChart3
} from 'lucide-react';

interface DashboardProps {
  isAuthenticated: boolean;
  onAuthAction: () => void;
}

const Dashboard = ({ isAuthenticated, onAuthAction }: DashboardProps) => {
  const [userProfile] = useState({
    name: 'Beauty Enthusiast',
    email: 'user@example.com',
    skinType: 'Combination',
    memberSince: 'January 2024',
    avatar: '/placeholder.svg',
    level: 'Intermediate',
    points: 2450,
    nextLevelPoints: 3000
  });

  const [stats] = useState({
    chatsSent: 127,
    guidesCompleted: 18,
    quizzesTaken: 5,
    favoriteTips: 32,
    streakDays: 12
  });

  const [recentActivity] = useState([
    { id: 1, type: 'chat', content: 'Asked about eyeshadow blending techniques', time: '2 hours ago' },
    { id: 2, type: 'guide', content: 'Completed "Perfect Winged Eyeliner" guide', time: '1 day ago' },
    { id: 3, type: 'quiz', content: 'Retook skin type analysis quiz', time: '3 days ago' },
    { id: 4, type: 'achievement', content: 'Earned "Makeup Explorer" badge', time: '5 days ago' },
  ]);

  const [recommendations] = useState([
    'Try contouring techniques for your face shape',
    'Explore cream blushes for your combination skin',
    'Practice color theory for eyeshadow combinations',
    'Learn about seasonal color palettes'
  ]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="glass-effect border-neon-purple/30 max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-neon-purple/20 rounded-full flex items-center justify-center border border-neon-purple/50 mb-4">
              <User className="h-8 w-8 text-neon-purple" />
            </div>
            <CardTitle className="text-2xl text-neon-purple neon-text">
              Welcome to Your Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-white/80">
              Sign in to access your personalized makeup journey, track your progress, and get AI-powered recommendations!
            </p>
            <Button 
              onClick={onAuthAction}
              className="w-full bg-neon-purple/20 text-neon-purple border border-neon-purple/50 hover:bg-neon-purple/30 hover:scale-105 transition-all duration-300 neon-glow"
            >
              Sign In to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progressPercentage = (userProfile.points / userProfile.nextLevelPoints) * 100;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="glass-effect border-neon-pink/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-20 h-20 border-2 border-neon-pink/50">
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback className="bg-neon-pink/20 text-neon-pink text-xl">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-neon-pink neon-text">{userProfile.name}</h1>
              <p className="text-white/70">{userProfile.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50">
                  {userProfile.skinType} Skin
                </Badge>
                <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
                  Level {userProfile.level}
                </Badge>
                <span className="text-sm text-white/60">Member since {userProfile.memberSince}</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-yellow neon-text">{userProfile.points}</div>
              <div className="text-sm text-white/60">Beauty Points</div>
              <Progress value={progressPercentage} className="w-24 h-2 mt-2 bg-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-neon-pink to-neon-yellow transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </Progress>
              <div className="text-xs text-white/50 mt-1">
                {userProfile.nextLevelPoints - userProfile.points} to next level
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="glass-effect border-neon-blue/30">
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-neon-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-neon-blue neon-text">{stats.chatsSent}</div>
            <div className="text-xs text-white/60">AI Chats</div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect border-neon-green/30">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 text-neon-green mx-auto mb-2" />
            <div className="text-2xl font-bold text-neon-green neon-text">{stats.guidesCompleted}</div>
            <div className="text-xs text-white/60">Guides Done</div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect border-neon-purple/30">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-neon-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-neon-purple neon-text">{stats.quizzesTaken}</div>
            <div className="text-xs text-white/60">Quizzes</div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect border-neon-orange/30">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-neon-orange mx-auto mb-2" />
            <div className="text-2xl font-bold text-neon-orange neon-text">{stats.favoriteTips}</div>
            <div className="text-xs text-white/60">Favorites</div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect border-neon-cyan/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-neon-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold text-neon-cyan neon-text">{stats.streakDays}</div>
            <div className="text-xs text-white/60">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-neon-cyan neon-text flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'chat' ? 'bg-neon-blue/20 border border-neon-blue/50' :
                  activity.type === 'guide' ? 'bg-neon-green/20 border border-neon-green/50' :
                  activity.type === 'quiz' ? 'bg-neon-purple/20 border border-neon-purple/50' :
                  'bg-neon-orange/20 border border-neon-orange/50'
                }`}>
                  {activity.type === 'chat' && <MessageCircle className="h-4 w-4 text-neon-blue" />}
                  {activity.type === 'guide' && <BookOpen className="h-4 w-4 text-neon-green" />}
                  {activity.type === 'quiz' && <Target className="h-4 w-4 text-neon-purple" />}
                  {activity.type === 'achievement' && <Award className="h-4 w-4 text-neon-orange" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/90">{activity.content}</p>
                  <p className="text-xs text-white/50">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-neon-green neon-text flex items-center">
              <Sparkles className="h-5 w-5 mr-2 animate-glow" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-white/70 mb-4">
              Based on your activity and skin profile, here are personalized suggestions:
            </p>
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-neon-green/5 border border-neon-green/20 hover:bg-neon-green/10 transition-colors">
                <div className="w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center border border-neon-green/50 flex-shrink-0 mt-0.5">
                  <span className="text-neon-green text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-sm text-white/90">{rec}</p>
              </div>
            ))}
            
            <Button className="w-full mt-4 bg-neon-green/20 text-neon-green border border-neon-green/50 hover:bg-neon-green/30 transition-all duration-300 neon-glow">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with AI for More Tips
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Section */}
      <Card className="glass-effect border-neon-yellow/30">
        <CardHeader>
          <CardTitle className="text-neon-yellow neon-text flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'First Chat', icon: MessageCircle, color: 'neon-blue', earned: true },
              { name: 'Quiz Master', icon: Target, color: 'neon-purple', earned: true },
              { name: 'Guide Explorer', icon: BookOpen, color: 'neon-green', earned: true },
              { name: 'Beauty Guru', icon: Star, color: 'neon-yellow', earned: false },
            ].map((achievement, index) => (
              <div key={index} className={`p-4 rounded-lg text-center border transition-all duration-300 ${
                achievement.earned 
                  ? `bg-${achievement.color}/10 border-${achievement.color}/30 hover:bg-${achievement.color}/20` 
                  : 'bg-white/5 border-white/20 opacity-50'
              }`}>
                <achievement.icon className={`h-8 w-8 mx-auto mb-2 ${
                  achievement.earned ? `text-${achievement.color}` : 'text-white/40'
                }`} />
                <div className={`text-sm font-medium ${
                  achievement.earned ? `text-${achievement.color}` : 'text-white/40'
                }`}>
                  {achievement.name}
                </div>
                {achievement.earned && (
                  <div className="text-xs text-white/60 mt-1">Earned!</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
