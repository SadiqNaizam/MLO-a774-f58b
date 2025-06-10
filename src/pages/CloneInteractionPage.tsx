import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import InteractiveCloneCanvas from '@/components/InteractiveCloneCanvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Heart, Zap, MessageSquare, Home, Edit3 } from 'lucide-react';

// Mock clone data - in a real app, this would be fetched based on cloneId
const mockClones = {
  clone1: { name: 'SparkleBot', mood: 'Joyful', color: 'pink', parts: { eyes: 'dots', body: 'round' } },
  clone2: { name: 'GloomyGus', mood: 'Pensive', color: 'blue', parts: { eyes: 'lines', body: 'square' } },
  // ... other clones from dashboard
};

type MockCloneKey = keyof typeof mockClones;

const CloneInteractionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  console.log(`CloneInteractionPage loaded for clone ID: ${id}`);

  const [cloneData, setCloneData] = useState<typeof mockClones[MockCloneKey] | null>(null);
  const [cloneMood, setCloneMood] = useState('');
  const [interactionMessage, setInteractionMessage] = useState('');

  useEffect(() => {
    // Simulate fetching clone data
    if (id && id in mockClones) {
        const fetchedClone = mockClones[id as MockCloneKey];
        setCloneData(fetchedClone);
        setCloneMood(fetchedClone.mood);
        setInteractionMessage(`Hello! I'm ${fetchedClone.name}. Nice to meet you!`);
    } else {
        // Fallback or redirect if clone not found
        setCloneData({name: "Cloney McCloneFace", mood: "Happy", color: "green", parts: {eyes: "circles", body: "tall"}});
        setCloneMood("Happy");
        setInteractionMessage("Hello! I'm a default clone. Nice to meet you!");
    }
  }, [id]);

  const handlePoke = () => {
    setCloneMood('Surprised!');
    setInteractionMessage(`${cloneData?.name} says: "Ouch! That tickles!"`);
    setTimeout(() => setCloneMood(cloneData?.mood || 'Neutral'), 1500);
  };

  const handleCompliment = () => {
    setCloneMood('Blushing');
    setInteractionMessage(`${cloneData?.name} says: "Aww, thank you! You're so kind!"`);
    setTimeout(() => setCloneMood(cloneData?.mood || 'Happy'), 2000);
  };

  if (!cloneData) {
    return <div className="flex items-center justify-center min-h-screen">Loading clone data...</div>;
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 via-sky-50 to-cyan-100">
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png" alt="Lovable Clones Logo" className="h-8 w-8" />
                <span className="font-bold text-xl text-sky-600">Interacting with {cloneData.name}</span>
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button onClick={() => navigate('/dashboard')} variant="ghost" className="mr-2"><Home className="mr-2 h-4 w-4"/>Dashboard</Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button onClick={() => navigate(`/editor?cloneId=${id}`)} variant="outline"><Edit3 className="mr-2 h-4 w-4"/>Edit Clone</Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Clone Canvas */}
            <div className="md:col-span-2">
              <InteractiveCloneCanvas cloneData={{ ...cloneData.parts, name: cloneData.name, color: cloneData.color }} backgroundColor="bg-white shadow-xl rounded-lg" />
            </div>

            {/* Interaction Panel */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-sky-700">Meet {cloneData.name}!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">Current Mood: <span className="font-semibold text-pink-500">{cloneMood}</span></p>
                  {interactionMessage && (
                    <div className="mt-4 p-3 bg-sky-100 rounded-md text-sky-800">
                      <MessageSquare className="inline mr-2 h-5 w-5" /> {interactionMessage}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-sky-700">Interact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handlePoke} className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900">
                        <Zap className="mr-2 h-5 w-5" /> Poke {cloneData.name}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>See how {cloneData.name} reacts to a gentle poke!</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleCompliment} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                        <Heart className="mr-2 h-5 w-5" /> Compliment {cloneData.name}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Say something nice to {cloneData.name}.</p>
                    </TooltipContent>
                  </Tooltip>
                  {/* Add more interaction buttons as desired */}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default CloneInteractionPage;