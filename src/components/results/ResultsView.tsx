
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useVote } from '@/contexts/VoteContext';
import { Trophy, Check, Users } from 'lucide-react';

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
      <Card className="shadow-sm overflow-hidden border-none bg-gradient-to-br from-slate-50 to-blue-50">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2.5 rounded-full">
              <Users className="h-5 w-5 text-vote-blue" />
            </div>
            <div>
              <CardTitle className="text-lg">Statistik Pemilihan</CardTitle>
              <CardDescription>
                <div className="flex flex-col space-y-1 mt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Total Suara:</span>
                    <span className="text-sm">{totalVotes} suara</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Total Pemilih:</span>
                    <span className="text-sm">{totalVoters} pemilih</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Tingkat Partisipasi:</span>
                    <span className="text-sm">{totalVoters > 0 ? Math.round((totalVotes / totalVoters) * 100) : 0}%</span>
                  </div>
                </div>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {winner && (
        <Card className="shadow-md overflow-hidden border-none bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
              <CardTitle>Pemenang</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-vote-blue shadow-inner">
                  <img
                    src={winner.photoUrl}
                    alt={winner.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-vote-blue text-white rounded-full p-1 shadow">
                  <Check className="h-4 w-4" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{winner.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{winner.description}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {winner.votes} suara ({totalVotes > 0 ? Math.round((winner.votes / totalVotes) * 100) : 0}%)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Users className="h-4 w-4" /> Semua Kandidat
      </h3>
      
      <div className="space-y-4">
        {sortedCandidates.map((candidate, index) => (
          <Card key={candidate.id} className={`transition-all hover:shadow-md overflow-hidden ${candidate.id === winner?.id ? 'border-2 border-blue-200' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div className="h-16 w-16 rounded-full overflow-hidden border">
                    <img
                      src={candidate.photoUrl}
                      alt={candidate.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-slate-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{candidate.name}</h3>
                    <span className="text-sm font-medium text-vote-blue">{candidate.votes} suara</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Persentase suara</span>
                      <span>{totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0}%</span>
                    </div>
                    <Progress 
                      value={totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0} 
                      className="h-2"
                    />
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
