import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Edit3, Trash2, Smile } from 'lucide-react'; // Example icons

interface CloneThumbnailCardProps {
  clone: {
    id: string;
    name: string;
    imageUrl?: string; // URL to a preview image of the clone
    // Other relevant preview data, e.g., creation date, mood
    mood?: string;
  };
  onInteract: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CloneThumbnailCard: React.FC<CloneThumbnailCardProps> = ({
  clone,
  onInteract,
  onEdit,
  onDelete,
}) => {
  console.log(`Rendering CloneThumbnailCard for "${clone.name}" (ID: ${clone.id})`);

  const handleInteract = () => {
    console.log(`Interact clicked for clone ID: ${clone.id}`);
    onInteract(clone.id);
  };

  const handleEdit = () => {
    console.log(`Edit clicked for clone ID: ${clone.id}`);
    onEdit(clone.id);
  };

  const handleDelete = () => {
    console.log(`Delete clicked for clone ID: ${clone.id}`);
    onDelete(clone.id);
  };

  return (
    <Card className="w-full max-w-xs overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <AspectRatio ratio={1 / 1} className="bg-slate-200">
          {clone.imageUrl ? (
            <img
              src={clone.imageUrl}
              alt={`Preview of ${clone.name}`}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')} // Fallback
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Smile size={48} className="text-slate-400" />
            </div>
          )}
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold truncate">{clone.name}</CardTitle>
        {clone.mood && <p className="text-sm text-gray-600">Mood: {clone.mood}</p>}
      </CardContent>
      <CardFooter className="p-3 flex justify-between gap-2">
        <Button variant="outline" size="sm" onClick={handleInteract} className="flex-1">
          Interact
        </Button>
        <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={handleEdit} aria-label="Edit Clone">
                <Edit3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete} className="text-red-500 hover:text-red-600" aria-label="Delete Clone">
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CloneThumbnailCard;