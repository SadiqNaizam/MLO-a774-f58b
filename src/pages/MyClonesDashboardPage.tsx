import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import CloneThumbnailCard from '@/components/CloneThumbnailCard';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { PlusCircle, Trash2 } from 'lucide-react';
import { toast } from "sonner";

// Placeholder clone data
const initialClones = [
  { id: 'clone1', name: 'SparkleBot', imageUrl: 'https://placekitten.com/300/300?image=1', mood: 'Joyful' },
  { id: 'clone2', name: 'GloomyGus', imageUrl: 'https://placekitten.com/300/300?image=2', mood: 'Pensive' },
  { id: 'clone3', name: 'Captain Cuddles', imageUrl: 'https://placekitten.com/300/300?image=3', mood: 'Adventurous' },
  { id: 'clone4', name: 'Professor Wiggles', imageUrl: 'https://placekitten.com/300/300?image=4', mood: 'Curious' },
  { id: 'clone5', name: 'Doodle Droid', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png', mood: 'Creative'},
];

const MyClonesDashboardPage = () => {
  console.log('MyClonesDashboardPage loaded');
  const navigate = useNavigate();
  const [clones, setClones] = useState(initialClones);
  const [cloneToDelete, setCloneToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const clonesPerPage = 6;

  const indexOfLastClone = currentPage * clonesPerPage;
  const indexOfFirstClone = indexOfLastClone - clonesPerPage;
  const currentClones = clones.slice(indexOfFirstClone, indexOfLastClone);
  const totalPages = Math.ceil(clones.length / clonesPerPage);

  const handlePaginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleInteract = (id: string) => {
    console.log(`Interacting with clone ${id}`);
    navigate(`/clone/${id}/interact`); // Navigate to interaction page
  };

  const handleEdit = (id: string) => {
    console.log(`Editing clone ${id}`);
    // For now, navigate to editor, in a real app might pass clone data
    navigate(`/editor?cloneId=${id}`); 
  };

  const confirmDelete = () => {
    if (cloneToDelete) {
      setClones(clones.filter(clone => clone.id !== cloneToDelete));
      toast.success(`Clone "${clones.find(c=>c.id === cloneToDelete)?.name}" has been deleted.`);
      setCloneToDelete(null);
      if (currentClones.length === 1 && currentPage > 1) { // if last item on a page is deleted
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
              <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Hearts.png" alt="Lovable Clones Logo" className="h-8 w-8" />
              <span className="font-bold text-xl text-pink-600">My Clones Dashboard</span>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Button onClick={() => navigate('/editor')} className="bg-pink-500 hover:bg-pink-600 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create New Clone
                </Button>
              </NavigationMenuItem>
               <NavigationMenuItem>
                  <Button onClick={() => navigate('/')} variant="ghost" className="ml-2">Home</Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        {clones.length === 0 ? (
          <div className="text-center py-20">
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Package.png" alt="Empty Box" className="mx-auto h-32 w-32 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Clones Yet!</h2>
            <p className="text-gray-500 mb-6">Looks like your dashboard is empty. Why not create your first Lovable Clone?</p>
            <Button size="lg" onClick={() => navigate('/editor')} className="bg-pink-500 hover:bg-pink-600 text-white">
              Create Your First Clone
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentClones.map(clone => (
                <CloneThumbnailCard
                  key={clone.id}
                  clone={clone}
                  onInteract={handleInteract}
                  onEdit={handleEdit}
                  onDelete={() => setCloneToDelete(clone.id)} // Trigger AlertDialog
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (currentPage > 1) handlePaginate(currentPage - 1); }} disabled={currentPage === 1} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => {
                     const page = i + 1;
                     if (page === currentPage || 
                         page <= 2 || page >= totalPages -1 || // Always show first 2 and last 2
                         (currentPage > 3 && page === currentPage -1) || // Show page before current
                         (currentPage < totalPages - 2 && page === currentPage + 1) // Show page after current
                        ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink href="#" isActive={currentPage === page} onClick={(e) => { e.preventDefault(); handlePaginate(page); }}>
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                     }
                     if ((currentPage > 4 && page === 3) || (currentPage < totalPages - 3 && page === totalPages - 2)){
                        return <PaginationEllipsis key={`ellipsis-${page}`} />;
                     }
                     return null;
                  })}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) handlePaginate(currentPage + 1); }} disabled={currentPage === totalPages} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>

      <AlertDialog open={!!cloneToDelete} onOpenChange={(open) => !open && setCloneToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your clone
              "{clones.find(c => c.id === cloneToDelete)?.name}" and remove its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCloneToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
                <Trash2 className="mr-2 h-4 w-4"/> Yes, delete clone
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default MyClonesDashboardPage;