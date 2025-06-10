import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"; // For many options
import { CheckCircle } from 'lucide-react';

interface ClonePartOption {
  id: string;
  name: string;
  preview?: React.ReactNode; // e.g., an icon or small image
}

interface ClonePartSelectorProps {
  title: string;
  options: ClonePartOption[];
  selectedOptionId?: string;
  onOptionSelect: (optionId: string) => void;
}

const ClonePartSelector: React.FC<ClonePartSelectorProps> = ({
  title,
  options,
  selectedOptionId,
  onOptionSelect,
}) => {
  console.log(`Rendering ClonePartSelector for "${title}" with ${options.length} options.`);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {options.length > 0 ? (
          <ScrollArea className="h-auto max-h-60 pr-3"> {/* Adjust max-h as needed */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {options.map((option) => (
                <Button
                  key={option.id}
                  variant={selectedOptionId === option.id ? "default" : "outline"}
                  onClick={() => {
                    console.log(`Selected option "${option.name}" (ID: ${option.id}) for "${title}"`);
                    onOptionSelect(option.id);
                  }}
                  className="h-auto p-2 flex flex-col items-center justify-center text-center relative"
                >
                  {selectedOptionId === option.id && (
                    <CheckCircle className="absolute top-1 right-1 h-4 w-4 text-green-500" />
                  )}
                  {option.preview && <div className="mb-1">{option.preview}</div>}
                  <span className="text-xs truncate w-full">{option.name}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-sm text-gray-500">No options available for {title}.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ClonePartSelector;