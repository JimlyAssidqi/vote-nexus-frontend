
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
          <DialogTitle>{voterToEdit ? 'Edit Voter' : 'Add New Voter'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Voter name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nim">Student ID (NIM)</Label>
            <Input 
              id="nim" 
              name="nim" 
              value={formData.nim} 
              onChange={handleChange} 
              placeholder="Student ID number"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password"
              type="password"
              value={formData.password} 
              onChange={handleChange} 
              placeholder={voterToEdit ? "Leave blank to keep current password" : "Set password for voter"}
              required={!voterToEdit}
            />
            {voterToEdit && (
              <p className="text-xs text-muted-foreground">
                Leave blank to keep the current password unchanged
              </p>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{voterToEdit ? 'Update' : 'Add'} Voter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
