
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, Star, Wand2, Filter, BookOpen, Video, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  steps: string[];
  tags: string[];
  isAIGenerated?: boolean;
  createdAt: Date;
}

interface GuidesSectionProps {
  newGuideFromChat?: string;
}

const GuidesSection = ({ newGuideFromChat }: GuidesSectionProps) => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const { toast } = useToast();

  const categories = ['All', 'Eyes', 'Face', 'Lips', 'Contouring', 'Special Occasion', 'Skincare'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const defaultGuides: Guide[] = [
    {
      id: '1',
      title: 'Perfect Everyday Natural Look',
      description: 'Master a fresh, natural makeup look perfect for daily wear',
      category: 'Face',
      difficulty: 'Beginner',
      duration: '15 minutes',
      rating: 4.8,
      steps: [
        'Start with clean, moisturized skin',
        'Apply a lightweight primer',
        'Use a tinted moisturizer or light foundation',
        'Conceal any blemishes or dark circles',
        'Add a natural blush to the apples of cheeks',
        'Apply one coat of brown mascara',
        'Finish with a tinted lip balm'
      ],
      tags: ['natural', 'everyday', 'quick', 'beginner-friendly'],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Smoky Eye for Beginners',
      description: 'Create a sultry smoky eye that\'s perfect for evening events',
      category: 'Eyes',
      difficulty: 'Intermediate',
      duration: '25 minutes',
      rating: 4.6,
      steps: [
        'Prime your eyelids',
        'Apply a neutral base shade across the lid',
        'Use a darker shade in the outer V',
        'Blend the colors seamlessly',
        'Line the upper and lower lash lines',
        'Smudge the liner for a smoky effect',
        'Apply 2-3 coats of volumizing mascara',
        'Highlight the inner corners'
      ],
      tags: ['smoky', 'evening', 'dramatic', 'eyeshadow'],
      createdAt: new Date('2024-01-10')
    },
    {
      id: '3',
      title: 'Flawless Foundation Application',
      description: 'Learn professional techniques for perfect foundation coverage',
      category: 'Face',
      difficulty: 'Intermediate',
      duration: '20 minutes',
      rating: 4.9,
      steps: [
        'Choose the right foundation shade',
        'Apply primer and let it set',
        'Use a damp beauty sponge or brush',
        'Apply foundation in thin layers',
        'Build coverage gradually',
        'Set with translucent powder',
        'Check in natural light'
      ],
      tags: ['foundation', 'base', 'coverage', 'professional'],
      createdAt: new Date('2024-01-08')
    },
    {
      id: '4',
      title: 'Bold Red Lip Tutorial',
      description: 'Perfect the classic red lip look with staying power',
      category: 'Lips',
      difficulty: 'Beginner',
      duration: '10 minutes',
      rating: 4.7,
      steps: [
        'Exfoliate and moisturize lips',
        'Line lips with matching liner',
        'Apply lipstick with a brush for precision',
        'Blot with tissue',
        'Apply a second layer',
        'Clean up edges with concealer',
        'Optional: add clear gloss to center'
      ],
      tags: ['red lips', 'classic', 'bold', 'long-lasting'],
      createdAt: new Date('2024-01-05')
    }
  ];

  useEffect(() => {
    setGuides(defaultGuides);
  }, []);

  useEffect(() => {
    if (newGuideFromChat) {
      generateAIGuide(newGuideFromChat);
    }
  }, [newGuideFromChat]);

  const generateAIGuide = (topic: string) => {
    const newGuide: Guide = {
      id: `ai-${Date.now()}`,
      title: `AI Guide: ${topic}`,
      description: `Personalized guide generated based on your chat about ${topic.toLowerCase()}`,
      category: detectCategory(topic),
      difficulty: 'Intermediate',
      duration: '20 minutes',
      rating: 4.5,
      steps: generateStepsFromTopic(topic),
      tags: ['AI-generated', 'personalized', 'custom'],
      isAIGenerated: true,
      createdAt: new Date()
    };

    setGuides(prev => [newGuide, ...prev]);
    
    toast({
      title: "✨ AI Guide Created!",
      description: `Generated a personalized guide for "${topic}"`,
    });
  };

  const detectCategory = (topic: string): string => {
    const lowerTopic = topic.toLowerCase();
    if (lowerTopic.includes('eye') || lowerTopic.includes('eyeshadow') || lowerTopic.includes('mascara')) return 'Eyes';
    if (lowerTopic.includes('lip') || lowerTopic.includes('lipstick')) return 'Lips';
    if (lowerTopic.includes('contour') || lowerTopic.includes('highlight')) return 'Contouring';
    if (lowerTopic.includes('wedding') || lowerTopic.includes('party') || lowerTopic.includes('special')) return 'Special Occasion';
    if (lowerTopic.includes('skin') || lowerTopic.includes('skincare')) return 'Skincare';
    return 'Face';
  };

  const generateStepsFromTopic = (topic: string): string[] => {
    const lowerTopic = topic.toLowerCase();
    
    if (lowerTopic.includes('eye')) {
      return [
        'Prime your eyelids with eyeshadow primer',
        'Choose colors that complement your eye color',
        'Apply a base shade across the entire lid',
        'Add definition with a slightly deeper shade',
        'Blend colors seamlessly with appropriate brushes',
        'Line the eyes to enhance the shape',
        'Finish with mascara or false lashes',
        'Clean up any fallout under the eyes'
      ];
    }
    
    if (lowerTopic.includes('skin') || lowerTopic.includes('foundation')) {
      return [
        'Start with clean, well-moisturized skin',
        'Apply primer suitable for your skin type',
        'Choose foundation that matches your undertone',
        'Apply foundation using your preferred method',
        'Conceal any imperfections or discoloration',
        'Set with powder in areas that tend to get oily',
        'Add color back to the face with blush',
        'Finish with setting spray for longevity'
      ];
    }

    // Default steps for general makeup topics
    return [
      'Prepare your skin with proper skincare',
      'Apply primer to create a smooth base',
      'Build your look gradually with light layers',
      'Use the right tools for each step',
      'Blend everything seamlessly',
      'Set your makeup for lasting wear',
      'Make any final adjustments',
      'Take photos to see how it looks in different lighting'
    ];
  };

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || guide.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-neon-green/20 text-neon-green border-neon-green/50';
      case 'Intermediate': return 'bg-neon-orange/20 text-neon-orange border-neon-orange/50';
      case 'Advanced': return 'bg-neon-pink/20 text-neon-pink border-neon-pink/50';
      default: return 'bg-white/20 text-white border-white/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-neon-cyan neon-text">
          Makeup Guides & Tutorials
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Discover step-by-step guides tailored to your skill level and interests. 
          Our AI generates personalized tutorials based on your chat conversations!
        </p>
      </div>

      {/* Filters and Search */}
      <div className="glass-effect rounded-lg p-6 border border-white/20">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 focus:border-neon-cyan/50"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:border-neon-cyan/50 focus:outline-none"
          >
            {categories.map(category => (
              <option key={category} value={category} className="bg-dark-800 text-white">
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:border-neon-cyan/50 focus:outline-none"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty} className="bg-dark-800 text-white">
                {difficulty}
              </option>
            ))}
          </select>

          <Button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="glass-effect border-white/20 hover:border-neon-cyan/50 transition-all duration-300 group">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-white group-hover:text-neon-cyan transition-colors">
                  {guide.title}
                </CardTitle>
                {guide.isAIGenerated && (
                  <Wand2 className="h-5 w-5 text-neon-purple animate-glow" />
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-white/60">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{guide.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-neon-yellow fill-current" />
                  <span>{guide.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className={getDifficultyColor(guide.difficulty)}>
                  {guide.difficulty}
                </Badge>
                <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/50">
                  {guide.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-white/80 text-sm">
                {guide.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="font-medium text-white text-sm">Quick Steps:</h4>
                <ul className="space-y-1">
                  {guide.steps.slice(0, 3).map((step, index) => (
                    <li key={index} className="text-xs text-white/70 flex items-start space-x-2">
                      <span className="text-neon-green">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                  {guide.steps.length > 3 && (
                    <li className="text-xs text-white/50">
                      +{guide.steps.length - 3} more steps...
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {guide.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/60">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 hover:bg-neon-cyan/30 transition-all duration-300 neon-glow"
                >
                  <BookOpen className="h-3 w-3 mr-2" />
                  View Guide
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-white/20 text-white/70 hover:bg-white/10"
                >
                  <Video className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <Camera className="h-16 w-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No guides found</h3>
          <p className="text-white/60">
            Try adjusting your filters or search terms, or chat with our AI to generate a custom guide!
          </p>
        </div>
      )}
    </div>
  );
};

export default GuidesSection;
