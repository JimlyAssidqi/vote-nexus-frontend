
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash, Plus, Search } from 'lucide-react';
import { useVote, Candidate } from '@/contexts/VoteContext';
import { CandidateForm } from './CandidateForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';

export const CandidateList = () => {
  const { candidates, deleteCandidate } = useVote();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [candidateToEdit, setCandidateToEdit] = useState<Candidate | undefined>(undefined);
  const [candidateToDelete, setCandidateToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleEdit = (candidate: Candidate) => {
    setCandidateToEdit(candidate);
    setIsFormOpen(true);
  };
  
  const handleAdd = () => {
    setCandidateToEdit(undefined);
    setIsFormOpen(true);
  };
  
  const handleDeleteConfirm = (id: string) => {
    setCandidateToDelete(id);
  };
  
  const handleDeleteCancel = () => {
    setCandidateToDelete(null);
  };
  
  const executeDelete = () => {
    if (candidateToDelete) {
      deleteCandidate(candidateToDelete);
      setCandidateToDelete(null);
    }
  };
  
  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Daftar Kandidat</h2>
        <Button onClick={handleAdd} className="shadow-sm rounded-full">
          <Plus className="mr-1 h-4 w-4" />
          Tambah Kandidat
        </Button>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm p-4">
        <div className="mb-4 relative">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari kandidat..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        {filteredCandidates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-[3/2] relative overflow-hidden">
                  <img
                    alt={candidate.name}
                    className="object-cover w-full h-full"
                    src={candidate.photoUrl}
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium">
                    {candidate.votes} Suara
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{candidate.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {candidate.description}
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10" onClick={() => handleEdit(candidate)}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteConfirm(candidate.id)}>
                      <Trash className="h-4 w-4 mr-1" />
                      Hapus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-md">
            <p className="text-muted-foreground">
              {searchTerm ? 'Tidak ada kandidat yang sesuai dengan pencarian' : 'Belum ada kandidat. Tambahkan kandidat pertama!'}
            </p>
          </div>
        )}
      </div>
      
      {/* Add/Edit Form Dialog */}
      <CandidateForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        candidateToEdit={candidateToEdit}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={candidateToDelete !== null} onOpenChange={handleDeleteCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan menghapus kandidat secara permanen dan tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={executeDelete} className="bg-destructive text-destructive-foreground">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
