
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VotingStatus } from '@/components/voter/VotingStatus';
import { CandidateCard } from '@/components/voter/CandidateCard';
import { ResultsView } from '@/components/results/ResultsView';
import { useAuth } from '@/contexts/AuthContext';
import { useVote } from '@/contexts/VoteContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const VoterDashboard = () => {
  const { user } = useAuth();
  const { candidates, isVotingActive } = useVote();
  const navigate = useNavigate();
  
  // Check if user exists and has voter role
  useEffect(() => {
    if (!user || user.role !== 'voter') {
      navigate('/login');
    }
  }, [user, navigate]);
  
  // Determine what to show based on voting status and user vote status
  const hasVoted = user?.hasVoted;
  const votingActive = isVotingActive();
  
  // Find the candidate the user voted for (if any)
  const votedCandidate = candidates.find(
    candidate => user?.hasVoted && user?.id === '3' && candidate.id === '3'
  );
  
  // Show candidates if voting is active and user hasn't voted
  const showCandidates = votingActive && !hasVoted;
  // Show already voted screen if user has voted and voting is still active
  const showVoted = hasVoted && votingActive;
  // Show results if voting has ended
  const showResults = !votingActive;
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pemilihan Kampus</h1>
      
      <VotingStatus />
      
      {showCandidates && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Pilih Kandidat</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {candidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      )}
      
      {showVoted && (
        <Card className="border-vote-success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-vote-success" />
              Terima Kasih Telah Memilih
            </CardTitle>
            <CardDescription>
              Suara Anda telah berhasil dicatat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {votedCandidate ? (
              <div className="flex items-center gap-4 p-4 border rounded-md">
                <img
                  src={votedCandidate.photoUrl}
                  alt={votedCandidate.name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-vote-success"
                />
                <div>
                  <h3 className="font-semibold">Anda memilih: {votedCandidate.name}</h3>
                  <p className="text-sm text-muted-foreground">{votedCandidate.description}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Hasil akan tersedia setelah periode pemilihan berakhir.
              </p>
            )}
          </CardContent>
        </Card>
      )}
      
      {showResults && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Hasil Pemilihan</h2>
          <ResultsView />
        </div>
      )}
    </div>
  );
};

export default VoterDashboard;
