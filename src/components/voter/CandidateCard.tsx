
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useVote, Candidate } from '@/contexts/VoteContext';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Check } from 'lucide-react';

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
      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md">
        <CardHeader className="p-0 overflow-hidden">
          <img
            src={candidate.photoUrl}
            alt={candidate.name}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <h3 className="font-semibold text-lg mb-2">{candidate.name}</h3>
          <p className="text-muted-foreground text-sm flex-1 mb-4">
            {candidate.description}
          </p>
          <Button onClick={handleVoteClick} className="mt-auto">
            Vote for this Candidate
          </Button>
        </CardContent>
      </Card>
      
      {/* Vote Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Vote</DialogTitle>
            <DialogDescription>
              You are about to vote for {candidate.name}. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-4 p-4 border rounded-md">
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
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmVote}>
              Confirm Vote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Success Dialog */}
      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-vote-success">
              <Check className="h-5 w-5" />
              Vote Recorded Successfully
            </DialogTitle>
            <DialogDescription>
              Thank you for participating in the campus election. Your vote has been recorded.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-4 p-4 border rounded-md bg-muted/20">
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-vote-success"
            />
            <div>
              <h3 className="font-semibold">{candidate.name}</h3>
              <p className="text-sm text-muted-foreground">{candidate.description}</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsSuccess(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
