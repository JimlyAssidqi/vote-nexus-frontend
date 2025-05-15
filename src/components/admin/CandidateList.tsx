
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash, Plus } from 'lucide-react';
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

export const CandidateList = () => {
  const { candidates, deleteCandidate } = useVote();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [candidateToEdit, setCandidateToEdit] = useState<Candidate | undefined>(undefined);
  const [candidateToDelete, setCandidateToDelete] = useState<string | null>(null);
  
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
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Candidates</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-1 h-4 w-4" />
          Add Candidate
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="card-hover">
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              <img
                alt={candidate.name}
                className="rounded-full h-14 w-14 object-cover"
                src={candidate.photoUrl}
              />
              <div className="grid gap-1">
                <CardTitle>{candidate.name}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="font-medium text-vote-indigo">{candidate.votes} votes</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {candidate.description}
              </p>
              <div className="flex justify-end mt-4 gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(candidate)}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDeleteConfirm(candidate.id)}>
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {candidates.length === 0 && (
        <div className="text-center p-8 border rounded-md">
          <p className="text-muted-foreground">No candidates found. Add your first candidate!</p>
        </div>
      )}
      
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
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this candidate and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={executeDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
