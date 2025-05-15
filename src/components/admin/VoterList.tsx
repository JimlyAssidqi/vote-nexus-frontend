
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash, Plus, Check, X } from 'lucide-react';
import { useVote, Voter } from '@/contexts/VoteContext';
import { VoterForm } from './VoterForm';
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

export const VoterList = () => {
  const { voters, deleteVoter } = useVote();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [voterToEdit, setVoterToEdit] = useState<Voter | undefined>(undefined);
  const [voterToDelete, setVoterToDelete] = useState<string | null>(null);
  
  const handleEdit = (voter: Voter) => {
    setVoterToEdit(voter);
    setIsFormOpen(true);
  };
  
  const handleAdd = () => {
    setVoterToEdit(undefined);
    setIsFormOpen(true);
  };
  
  const handleDeleteConfirm = (id: string) => {
    setVoterToDelete(id);
  };
  
  const handleDeleteCancel = () => {
    setVoterToDelete(null);
  };
  
  const executeDelete = () => {
    if (voterToDelete) {
      deleteVoter(voterToDelete);
      setVoterToDelete(null);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Voters</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-1 h-4 w-4" />
          Add Voter
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-header">Name</TableHead>
              <TableHead className="table-header">Student ID</TableHead>
              <TableHead className="table-header w-24 text-center">Voted</TableHead>
              <TableHead className="table-header w-36 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {voters.map((voter) => (
              <TableRow key={voter.id}>
                <TableCell className="table-cell font-medium">{voter.name}</TableCell>
                <TableCell className="table-cell">{voter.nim}</TableCell>
                <TableCell className="table-cell text-center">
                  {voter.hasVoted ? (
                    <Check className="h-4 w-4 text-vote-success mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-vote-danger mx-auto" />
                  )}
                </TableCell>
                <TableCell className="table-cell text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(voter)}>
                      <Pencil className="h-3.5 w-3.5" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDeleteConfirm(voter.id)}>
                      <Trash className="h-3.5 w-3.5" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {voters.length === 0 && (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No voters found. Add your first voter!</p>
          </div>
        )}
      </div>
      
      {/* Add/Edit Form Dialog */}
      <VoterForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        voterToEdit={voterToEdit}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={voterToDelete !== null} onOpenChange={handleDeleteCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this voter and cannot be undone.
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
