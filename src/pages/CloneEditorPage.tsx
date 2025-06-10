import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import InteractiveCloneCanvas from '@/components/InteractiveCloneCanvas';
import ClonePartSelector from '@/components/ClonePartSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Save, Palette, Smile, Users, Settings, Info, Bot } from 'lucide-react'; // Added Bot icon
import { toast } from "sonner"; // Using sonner for toast notifications

// Sample data for ClonePartSelector
const bodyOptions = [
  { id: 'body_round', name: 'Round', preview: <Bot size={24} /> },
  { id: 'body_square', name: 'Square', preview: <Bot size={24} className="rounded-none" /> },
  { id: 'body_tall', name: 'Tall', preview: <Bot size={24} style={{transform: 'scaleY(1.5)'}} /> },
];
const eyeOptions = [
  { id: 'eyes_dots', name: 'Dots', preview: <span>● ●</span> },
  { id: 'eyes_lines', name: 'Lines', preview: <span>— —</span> },
  { id: 'eyes_circles', name: 'Circles', preview: <span>◎ ◎</span> },
];
const mouthOptions = [
  { id: 'mouth_smile', name: 'Smile', preview: <span>😊</span> },
  { id: 'mouth_straight', name: 'Straight', preview: <span>😐</span> },
  { id: 'mouth_sad', name: 'Sad', preview: <span>😟</span> },
];
const accessoryOptions = [
  { id: 'acc_hat', name: 'Top Hat', preview: <span>🎩</span> },
  { id: 'acc_bow', name: 'Bow Tie', preview: <span>🎀</span> },
  { id: 'acc_glasses', name: 'Glasses', preview: <span>👓</span> },
];
const colorOptions = [
    { id: 'color_pink', name: 'Pink', preview: <div className="w-6 h-6 bg-pink-500 rounded-full border border-gray-300"></div> },
    { id: 'color_blue', name: 'Blue', preview: <div className="w-6 h-6 bg-blue-500 rounded-full border border-gray-300"></div> },
    { id: 'color_green', name: 'Green', preview: <div className="w-6 h-6 bg-green-500 rounded-full border border-gray-300"></div> },
    { id: 'color_yellow', name: 'Yellow', preview: <div className="w-6 h-6 bg-yellow-500 rounded-full border border-gray-300"></div> },
];


const CloneEditorPage = () => {
  console.log('CloneEditorPage loaded');
  const navigate = useNavigate();
  const [cloneName, setCloneName] = useState('');
  const [selectedBody, setSelectedBody] = useState<string | undefined>(bodyOptions[0]?.id);
  const [selectedEyes, setSelectedEyes] = useState<string | undefined>(eyeOptions[0]?.id);
  const [selectedMouth, setSelectedMouth] = useState<string | undefined>(mouthOptions[0]?.id);
  const [selectedAccessory, setSelectedAccessory] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>(colorOptions[0]?.id);

  const currentCloneData = {
    name: cloneName,
    body: selectedBody,
    eyes: selectedEyes,
    mouth: selectedMouth,
    accessory: selectedAccessory,
    color: selectedColor,
  };

  const handleSaveClone = () => {
    if (!cloneName.trim()) {
      toast.error("Please give your clone a name!");
      return;
    }
    console.log('Saving clone:', currentCloneData);
    // Here you would typically send data to a backend
    toast.success(`${cloneName} has been saved! Redirecting to dashboard...`);
    // Simulate saving and redirect
    setTimeout(() => {
      navigate('/dashboard'); // Navigate to dashboard after saving
    }, 1500);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
           <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Hearts.png" alt="Lovable Clones Logo" className="h-8 w-8" />
                <span className="font-bold text-xl text-pink-600">Lovable Clones Editor</span>
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button onClick={() => navigate('/dashboard')} variant="ghost">My Clones</Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleSaveClone} className="bg-green-500 hover:bg-green-600 text-white">
                        <Save className="mr-2 h-4 w-4" /> Save Clone
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save your current creation</p>
                    </TooltipContent>
                  </Tooltip>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>

        <ResizablePanelGroup direction="horizontal" className="flex-grow border-t">
          <ResizablePanel defaultSize={65} minSize={40}>
            <div className="flex h-full items-center justify-center p-6 bg-gray-100">
              <InteractiveCloneCanvas cloneData={currentCloneData} backgroundColor="bg-white" />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={35} minSize={25}>
            <ScrollArea className="h-full p-1">
              <div className="p-4 space-y-6">
                <div>
                  <label htmlFor="cloneName" className="block text-sm font-medium text-gray-700 mb-1">
                    Clone Name
                  </label>
                  <Input
                    id="cloneName"
                    placeholder="My Awesome Clone"
                    value={cloneName}
                    onChange={(e) => setCloneName(e.target.value)}
                  />
                  <Tooltip>
                    <TooltipTrigger className="mt-1 text-xs text-gray-500 flex items-center">
                        <Info size={12} className="mr-1 inline"/> Give your clone a unique name!
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>This name will appear on your dashboard.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Tabs defaultValue="parts" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="parts"><Smile className="mr-2 h-4 w-4"/>Parts</TabsTrigger>
                    <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4"/>Appearance</TabsTrigger>
                  </TabsList>
                  <TabsContent value="parts">
                    <Accordion type="multiple" defaultValue={['item-body', 'item-eyes']} className="w-full">
                      <AccordionItem value="item-body">
                        <AccordionTrigger>Body Shape</AccordionTrigger>
                        <AccordionContent>
                          <ClonePartSelector title="Body" options={bodyOptions} selectedOptionId={selectedBody} onOptionSelect={setSelectedBody} />
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-eyes">
                        <AccordionTrigger>Eyes</AccordionTrigger>
                        <AccordionContent>
                          <ClonePartSelector title="Eyes" options={eyeOptions} selectedOptionId={selectedEyes} onOptionSelect={setSelectedEyes} />
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-mouth">
                        <AccordionTrigger>Mouth</AccordionTrigger>
                        <AccordionContent>
                          <ClonePartSelector title="Mouth" options={mouthOptions} selectedOptionId={selectedMouth} onOptionSelect={setSelectedMouth} />
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-accessories">
                        <AccordionTrigger>Accessories</AccordionTrigger>
                        <AccordionContent>
                          <ClonePartSelector title="Accessory" options={accessoryOptions} selectedOptionId={selectedAccessory} onOptionSelect={setSelectedAccessory} />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TabsContent>
                  <TabsContent value="appearance">
                     <ClonePartSelector title="Color" options={colorOptions} selectedOptionId={selectedColor} onOptionSelect={setSelectedColor} />
                     {/* Potentially add texture selectors or other appearance options here */}
                  </TabsContent>
                </Tabs>
                <div className="mt-auto pt-4 border-t">
                    <Button onClick={handleSaveClone} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                        <Save className="mr-2 h-4 w-4" /> Save My Lovable Clone
                    </Button>
                </div>
              </div>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default CloneEditorPage;