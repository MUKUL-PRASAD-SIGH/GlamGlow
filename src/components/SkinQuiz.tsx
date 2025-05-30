
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sparkles, ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  options: Array<{
    value: string;
    label: string;
    score: Record<string, number>;
  }>;
}

interface QuizResult {
  skinType: string;
  description: string;
  recommendations: string[];
  concerns: string[];
}

const SkinQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const { toast } = useToast();

  const questions: Question[] = [
    {
      id: 'oiliness',
      question: 'How does your skin feel a few hours after cleansing?',
      options: [
        { value: 'very_oily', label: 'Very oily and shiny all over', score: { oily: 3, combination: 1, dry: 0, sensitive: 0 } },
        { value: 'tzone_oily', label: 'Oily in T-zone, normal elsewhere', score: { oily: 1, combination: 3, dry: 0, sensitive: 0 } },
        { value: 'comfortable', label: 'Comfortable and balanced', score: { oily: 0, combination: 1, dry: 0, sensitive: 1 } },
        { value: 'tight_dry', label: 'Tight and dry', score: { oily: 0, combination: 0, dry: 3, sensitive: 1 } },
      ],
    },
    {
      id: 'pores',
      question: 'How visible are your pores?',
      options: [
        { value: 'very_visible', label: 'Very visible, especially on nose and cheeks', score: { oily: 3, combination: 2, dry: 0, sensitive: 0 } },
        { value: 'tzone_visible', label: 'Visible mainly in T-zone', score: { oily: 1, combination: 3, dry: 0, sensitive: 0 } },
        { value: 'barely_visible', label: 'Barely visible', score: { oily: 0, combination: 0, dry: 2, sensitive: 1 } },
        { value: 'not_visible', label: 'Not visible at all', score: { oily: 0, combination: 0, dry: 3, sensitive: 2 } },
      ],
    },
    {
      id: 'breakouts',
      question: 'How often do you experience breakouts?',
      options: [
        { value: 'frequently', label: 'Frequently (weekly)', score: { oily: 3, combination: 2, dry: 0, sensitive: 1 } },
        { value: 'monthly', label: 'Monthly, usually around hormonal changes', score: { oily: 1, combination: 2, dry: 0, sensitive: 1 } },
        { value: 'rarely', label: 'Rarely', score: { oily: 0, combination: 1, dry: 1, sensitive: 0 } },
        { value: 'never', label: 'Never or almost never', score: { oily: 0, combination: 0, dry: 2, sensitive: 0 } },
      ],
    },
    {
      id: 'sensitivity',
      question: 'How does your skin react to new products?',
      options: [
        { value: 'very_reactive', label: 'Gets irritated, red, or burns easily', score: { oily: 0, combination: 0, dry: 1, sensitive: 3 } },
        { value: 'sometimes_reactive', label: 'Sometimes gets irritated with harsh products', score: { oily: 0, combination: 1, dry: 1, sensitive: 2 } },
        { value: 'rarely_reactive', label: 'Rarely reacts, tolerates most products well', score: { oily: 2, combination: 2, dry: 1, sensitive: 0 } },
        { value: 'never_reactive', label: 'Never reacts, can use any product', score: { oily: 3, combination: 1, dry: 0, sensitive: 0 } },
      ],
    },
    {
      id: 'texture',
      question: 'What best describes your skin texture?',
      options: [
        { value: 'rough_bumpy', label: 'Rough and bumpy', score: { oily: 2, combination: 1, dry: 2, sensitive: 1 } },
        { value: 'uneven', label: 'Uneven with some rough patches', score: { oily: 1, combination: 3, dry: 1, sensitive: 1 } },
        { value: 'mostly_smooth', label: 'Mostly smooth with occasional texture', score: { oily: 1, combination: 1, dry: 1, sensitive: 1 } },
        { value: 'very_smooth', label: 'Very smooth and even', score: { oily: 0, combination: 0, dry: 0, sensitive: 2 } },
      ],
    },
    {
      id: 'aging_concerns',
      question: 'What are your main skin concerns?',
      options: [
        { value: 'acne_oil', label: 'Acne and excess oil', score: { oily: 3, combination: 1, dry: 0, sensitive: 0 } },
        { value: 'uneven_tone', label: 'Uneven skin tone and texture', score: { oily: 1, combination: 2, dry: 1, sensitive: 1 } },
        { value: 'dryness_flaking', label: 'Dryness and flaking', score: { oily: 0, combination: 0, dry: 3, sensitive: 1 } },
        { value: 'redness_irritation', label: 'Redness and irritation', score: { oily: 0, combination: 0, dry: 1, sensitive: 3 } },
      ],
    },
  ];

  const calculateResults = (): QuizResult => {
    const scores = { oily: 0, combination: 0, dry: 0, sensitive: 0 };
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(opt => opt.value === answer);
      if (option) {
        Object.entries(option.score).forEach(([type, points]) => {
          scores[type as keyof typeof scores] += points;
        });
      }
    });

    const dominantType = Object.entries(scores).reduce((a, b) => scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b)[0];

    const results: Record<string, QuizResult> = {
      oily: {
        skinType: 'Oily Skin',
        description: 'Your skin produces excess sebum, giving you a shiny appearance especially in the T-zone. You may be prone to enlarged pores and breakouts.',
        recommendations: [
          'Use oil-free, non-comedogenic makeup products',
          'Start with a mattifying primer to control shine',
          'Choose powder or long-wear liquid foundations',
          'Use blotting papers throughout the day',
          'Opt for powder blushes and eyeshadows over creams'
        ],
        concerns: ['Excess oil production', 'Enlarged pores', 'Frequent breakouts', 'Makeup longevity']
      },
      dry: {
        skinType: 'Dry Skin',
        description: 'Your skin lacks moisture and may feel tight or flaky. You might have fine pores and be prone to fine lines.',
        recommendations: [
          'Use hydrating, luminous foundation formulas',
          'Apply a moisturizing primer before makeup',
          'Choose cream blushes and highlighters',
          'Avoid powder products that can emphasize dryness',
          'Use a setting spray instead of powder'
        ],
        concerns: ['Lack of moisture', 'Flaky patches', 'Fine lines', 'Makeup clinging to dry areas']
      },
      combination: {
        skinType: 'Combination Skin',
        description: 'You have both oily and dry areas on your face, typically with an oily T-zone and normal to dry cheeks.',
        recommendations: [
          'Use different primers for different face zones',
          'Apply mattifying products to T-zone only',
          'Use a versatile foundation suitable for mixed skin types',
          'Spot-conceal rather than full coverage',
          'Set only the oily areas with powder'
        ],
        concerns: ['Mixed skin needs', 'Balancing different areas', 'Targeted application', 'Product compatibility']
      },
      sensitive: {
        skinType: 'Sensitive Skin',
        description: 'Your skin reacts easily to products and environmental factors, often showing redness or irritation.',
        recommendations: [
          'Choose hypoallergenic, fragrance-free makeup',
          'Test new products on a small area first',
          'Use mineral-based foundations and concealers',
          'Avoid products with harsh chemicals or alcohol',
          'Remove makeup gently with mild cleansers'
        ],
        concerns: ['Product reactions', 'Redness and irritation', 'Ingredient sensitivities', 'Gentle removal needs']
      }
    };

    return results[dominantType];
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculateResults();
      setQuizResult(result);
      setShowResults(true);
      
      toast({
        title: "🎉 Quiz Complete!",
        description: `Your skin type has been identified: ${result.skinType}`,
      });
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizResult(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && quizResult) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="glass-effect border-neon-pink/30">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-neon-pink/20 rounded-full flex items-center justify-center border border-neon-pink/50 mb-4">
              <Sparkles className="h-8 w-8 text-neon-pink animate-glow" />
            </div>
            <CardTitle className="text-2xl text-neon-pink neon-text">
              Your Skin Type: {quizResult.skinType}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-white/80 text-lg">
              {quizResult.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neon-cyan neon-text">
                  📝 Makeup Recommendations
                </h3>
                <ul className="space-y-2">
                  {quizResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2 text-white/80">
                      <span className="text-neon-green">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neon-orange neon-text">
                  🎯 Key Concerns to Address
                </h3>
                <ul className="space-y-2">
                  {quizResult.concerns.map((concern, index) => (
                    <li key={index} className="flex items-start space-x-2 text-white/80">
                      <span className="text-neon-yellow">•</span>
                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center pt-6">
              <Button 
                onClick={resetQuiz}
                className="bg-neon-purple/20 text-neon-purple border border-neon-purple/50 hover:bg-neon-purple/30 hover:scale-105 transition-all duration-300 neon-glow"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Take Quiz Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="glass-effect border-neon-cyan/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-neon-cyan neon-text">
              AI-Powered Skin Analysis
            </CardTitle>
            <span className="text-sm text-white/60">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <h2 className="text-lg font-medium text-white">
            {questions[currentQuestion].question}
          </h2>
          
          <RadioGroup 
            value={answers[questions[currentQuestion].id] || ''} 
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <RadioGroupItem 
                  value={option.value} 
                  id={option.value}
                  className="border-neon-cyan text-neon-cyan"
                />
                <Label 
                  htmlFor={option.value}
                  className="flex-1 cursor-pointer text-white/90 hover:text-white"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          <div className="flex justify-between pt-6">
            <Button 
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-white/20 text-white/70 hover:bg-white/10 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button 
              onClick={nextQuestion}
              disabled={!answers[questions[currentQuestion].id]}
              className="bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 hover:bg-neon-cyan/30 hover:scale-105 transition-all duration-300 neon-glow disabled:opacity-50"
            >
              {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkinQuiz;
