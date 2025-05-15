
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pemilihan Kampus</h1>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <VotingStatus />
      
      {showCandidates && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Check className="h-3 w-3 text-vote-blue" />
            </span>
            Pilih Kandidat
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {candidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      )}
      
      {showVoted && (
        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <div className="bg-green-100 p-1.5 rounded-full">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              Terima Kasih Telah Memilih
            </CardTitle>
            <CardDescription className="text-green-700/70">
              Suara Anda telah berhasil dicatat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {votedCandidate ? (
              <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-green-100">
                <img
                  src={votedCandidate.photoUrl}
                  alt={votedCandidate.name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-green-300 shadow-sm"
                />
                <div>
                  <h3 className="font-semibold">Anda memilih: {votedCandidate.name}</h3>
                  <p className="text-sm text-muted-foreground">{votedCandidate.description}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground p-4 bg-white/60 backdrop-blur-sm rounded-lg">
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
