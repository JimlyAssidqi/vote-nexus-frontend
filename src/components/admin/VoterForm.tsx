
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useVote, Voter } from '@/contexts/VoteContext';

interface VoterFormProps {
  isOpen: boolean;
  onClose: () => void;
  voterToEdit?: Voter;
}

export const VoterForm: React.FC<VoterFormProps> = ({ isOpen, onClose, voterToEdit }) => {
  const { addVoter, updateVoter } = useVote();
  const [formData, setFormData] = useState({
    name: voterToEdit?.name || '',
    nim: voterToEdit?.nim || '',
    password: voterToEdit?.password || '',
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (voterToEdit) {
      updateVoter(voterToEdit.id, formData);
    } else {
      addVoter(formData);
    }
    
    onClose();
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{voterToEdit ? 'Edit Pemilih' : 'Tambah Pemilih Baru'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Nama pemilih"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nim">NIM (Nomor Induk Mahasiswa)</Label>
            <Input 
              id="nim" 
              name="nim" 
              value={formData.nim} 
              onChange={handleChange} 
              placeholder="Nomor induk mahasiswa"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input 
              id="password" 
              name="password"
              type="password"
              value={formData.password} 
              onChange={handleChange} 
              placeholder={voterToEdit ? "Biarkan kosong untuk mempertahankan kata sandi saat ini" : "Tetapkan kata sandi untuk pemilih"}
              required={!voterToEdit}
            />
            {voterToEdit && (
              <p className="text-xs text-muted-foreground">
                Biarkan kosong untuk mempertahankan kata sandi saat ini
              </p>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
            <Button type="submit">{voterToEdit ? 'Perbarui' : 'Tambah'} Pemilih</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
