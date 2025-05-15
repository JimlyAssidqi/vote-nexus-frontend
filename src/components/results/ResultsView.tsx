
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useVote } from '@/contexts/VoteContext';
import { Trophy, Check } from 'lucide-react';

export const ResultsView = () => {
  const { candidates, getWinner, voters } = useVote();
  
  // Calculate total votes and sort candidates by votes
  const totalVotes = useMemo(() => candidates.reduce((sum, candidate) => sum + candidate.votes, 0), [candidates]);
  const totalVoters = voters.length;
  
  const sortedCandidates = useMemo(() => 
    [...candidates].sort((a, b) => b.votes - a.votes),
  [candidates]);
  
  const winner = getWinner();
  
  if (candidates.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md">
        <p className="text-muted-foreground">Tidak ada kandidat yang tersedia untuk ditampilkan.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Statistik Pemilihan</CardTitle>
          <CardDescription>
            <div className="flex flex-col space-y-1">
              <span>Total Suara: {totalVotes} suara</span>
              <span>Total Pemilih: {totalVoters} pemilih</span>
              <span>Tingkat Partisipasi: {totalVoters > 0 ? Math.round((totalVotes / totalVoters) * 100) : 0}%</span>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
      
      {winner && (
        <Card className="border-vote-blue">
          <CardHeader className="bg-vote-blue/10 pb-2">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-vote-blue mr-2" />
              <CardTitle>Pemenang</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={winner.photoUrl}
                  alt={winner.name}
                  className="h-20 w-20 rounded-full object-cover border-2 border-vote-blue"
                />
                <div className="absolute -bottom-1 -right-1 bg-vote-blue text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{winner.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{winner.description}</p>
                <div className="flex items-center text-vote-blue font-medium mt-1">
                  {winner.votes} suara ({totalVotes > 0 ? Math.round((winner.votes / totalVotes) * 100) : 0}%)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <h3 className="text-lg font-semibold">Semua Kandidat</h3>
      <div className="space-y-4">
        {sortedCandidates.map((candidate) => (
          <Card key={candidate.id} className={`${candidate.id === winner?.id ? 'border-vote-blue card-hover' : 'card-hover'}`}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-4">
                <img
                  src={candidate.photoUrl}
                  alt={candidate.name}
                  className="h-12 w-12 rounded-full object-cover border"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{candidate.name}</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{candidate.votes} suara</span>
                      <span>{totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0}%</span>
                    </div>
                    <Progress value={totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
