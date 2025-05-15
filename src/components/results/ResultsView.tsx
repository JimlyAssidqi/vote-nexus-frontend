
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useVote } from '@/contexts/VoteContext';
import { Trophy, Check } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const ResultsView = () => {
  const { candidates, getWinner } = useVote();
  
  // Calculate total votes and sort candidates by votes
  const totalVotes = useMemo(() => candidates.reduce((sum, candidate) => sum + candidate.votes, 0), [candidates]);
  
  const sortedCandidates = useMemo(() => 
    [...candidates].sort((a, b) => b.votes - a.votes),
  [candidates]);
  
  const winner = getWinner();
  
  // Prepare data for chart
  const chartData = useMemo(() => 
    sortedCandidates.map(candidate => ({
      name: candidate.name,
      votes: candidate.votes,
    })),
  [sortedCandidates]);
  
  if (candidates.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md">
        <p className="text-muted-foreground">No candidates available to display results.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Voting Results</CardTitle>
          <CardDescription>
            {totalVotes} total votes cast
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 30,
                }}
              >
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value}
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="votes" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {winner && (
        <Card className="border-vote-blue">
          <CardHeader className="bg-vote-blue/10 pb-2">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-vote-blue mr-2" />
              <CardTitle>Winner</CardTitle>
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
                  {winner.votes} votes ({totalVotes > 0 ? Math.round((winner.votes / totalVotes) * 100) : 0}%)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <h3 className="text-lg font-semibold">All Candidates</h3>
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
                      <span>{candidate.votes} votes</span>
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
