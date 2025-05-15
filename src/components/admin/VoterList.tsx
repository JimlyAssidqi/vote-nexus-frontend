
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
import { Input } from '@/components/ui/input';

export const VoterList = () => {
  const { voters, deleteVoter } = useVote();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [voterToEdit, setVoterToEdit] = useState<Voter | undefined>(undefined);
  const [voterToDelete, setVoterToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
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
  
  const filteredVoters = voters.filter(voter => 
    voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voter.nim.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Daftar Pemilih</h2>
        <Button onClick={handleAdd} className="shadow-sm rounded-full">
          <Plus className="mr-1 h-4 w-4" />
          Tambah Pemilih
        </Button>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm p-4">
        <div className="mb-4">
          <Input 
            placeholder="Cari pemilih..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-muted/50 font-medium">Nama</TableHead>
                <TableHead className="bg-muted/50 font-medium">NIM</TableHead>
                <TableHead className="bg-muted/50 font-medium w-24 text-center">Status</TableHead>
                <TableHead className="bg-muted/50 font-medium w-36 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVoters.length > 0 ? (
                filteredVoters.map((voter) => (
                  <TableRow key={voter.id}>
                    <TableCell className="font-medium">{voter.name}</TableCell>
                    <TableCell>{voter.nim}</TableCell>
                    <TableCell className="text-center">
                      {voter.hasVoted ? (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          <Check className="h-3 w-3 mr-1" />
                          Sudah
                        </div>
                      ) : (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                          <X className="h-3 w-3 mr-1" />
                          Belum
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleEdit(voter)}>
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteConfirm(voter.id)}>
                          <Trash className="h-3.5 w-3.5" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-32 text-muted-foreground">
                    {searchTerm ? 'Tidak ada pemilih yang sesuai dengan pencarian' : 'Belum ada pemilih. Tambahkan pemilih pertama!'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
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
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan menghapus pemilih secara permanen dan tidak dapat dibatalkan.
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
