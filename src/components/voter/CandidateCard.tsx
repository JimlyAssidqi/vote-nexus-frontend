
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useVote, Candidate } from '@/contexts/VoteContext';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Check, Vote } from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const { user } = useAuth();
  const { submitVote } = useVote();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleVoteClick = () => {
    setIsConfirmOpen(true);
  };
  
  const handleConfirmVote = () => {
    if (user) {
      submitVote(user.id, candidate.id);
      setIsConfirmOpen(false);
      setIsSuccess(true);
    }
  };
  
  return (
    <>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
        <CardHeader className="p-0 overflow-hidden">
          <div className="aspect-[4/3] relative overflow-hidden">
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{candidate.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 min-h-[3rem]">
            {candidate.description}
          </p>
          <Button onClick={handleVoteClick} className="w-full rounded-full shadow-sm flex gap-2 items-center justify-center">
            <Vote className="h-4 w-4" />
            Pilih Kandidat Ini
          </Button>
        </CardContent>
      </Card>
      
      {/* Vote Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Pilihan Anda</DialogTitle>
            <DialogDescription>
              Anda akan memilih {candidate.name}. Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-4 p-4 border rounded-md bg-muted/20">
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="h-16 w-16 rounded-full object-cover border"
            />
            <div>
              <h3 className="font-semibold">{candidate.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{candidate.description}</p>
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>Batal</Button>
            <Button onClick={handleConfirmVote} className="gap-2">
              <Check className="h-4 w-4" />
              Konfirmasi Pilihan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Success Dialog */}
      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-700">
              <div className="bg-green-100 p-1 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              Suara Berhasil Direkam
            </DialogTitle>
            <DialogDescription>
              Terima kasih telah berpartisipasi dalam pemilihan kampus. Suara Anda telah direkam.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-md">
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-green-200"
            />
            <div>
              <h3 className="font-semibold">{candidate.name}</h3>
              <p className="text-sm text-muted-foreground">{candidate.description}</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => window.location.reload()} className="gap-2">
              <Check className="h-4 w-4" />
              Selesai
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
