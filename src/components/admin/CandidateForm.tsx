
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useVote, Candidate } from '@/contexts/VoteContext';

interface CandidateFormProps {
  isOpen: boolean;
  onClose: () => void;
  candidateToEdit?: Candidate;
}

export const CandidateForm: React.FC<CandidateFormProps> = ({ isOpen, onClose, candidateToEdit }) => {
  const { addCandidate, updateCandidate } = useVote();
  const [formData, setFormData] = useState({
    name: candidateToEdit?.name || '',
    description: candidateToEdit?.description || '',
    photoUrl: candidateToEdit?.photoUrl || '',
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (candidateToEdit) {
      updateCandidate(candidateToEdit.id, formData);
    } else {
      addCandidate(formData);
    }
    
    onClose();
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{candidateToEdit ? 'Edit Kandidat' : 'Tambah Kandidat Baru'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Nama kandidat"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Deskripsi atau platform kandidat"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="photoUrl">URL Foto</Label>
            <Input 
              id="photoUrl" 
              name="photoUrl" 
              value={formData.photoUrl} 
              onChange={handleChange} 
              placeholder="URL ke foto kandidat"
              required
            />
          </div>
          
          {formData.photoUrl && (
            <div className="flex justify-center">
              <img 
                src={formData.photoUrl} 
                alt="Kandidat preview" 
                className="h-24 w-24 rounded-full object-cover border"
              />
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
            <Button type="submit">{candidateToEdit ? 'Perbarui' : 'Tambah'} Kandidat</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
