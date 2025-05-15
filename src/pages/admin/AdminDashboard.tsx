
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VotingPeriodForm } from '@/components/admin/VotingPeriodForm';
import { useVote } from '@/contexts/VoteContext';
import { User, Users, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { candidates, voters, isVotingActive } = useVote();
  
  // Calculate stats
  const totalCandidates = candidates.length;
  const totalVoters = voters.length;
  const totalVotes = voters.filter(voter => voter.hasVoted).length;
  const participationRate = totalVoters > 0 ? Math.round((totalVotes / totalVoters) * 100) : 0;
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardDescription>Total Candidates</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-vote-indigo" />
              <span>{totalCandidates}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link to="/admin/candidates" className="text-sm text-vote-indigo underline underline-offset-4">
              Manage Candidates
            </Link>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardDescription>Registered Voters</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-vote-blue" />
              <span>{totalVoters}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link to="/admin/voters" className="text-sm text-vote-blue underline underline-offset-4">
              Manage Voters
            </Link>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardDescription>Voter Participation</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-vote-success" />
              <span>{totalVotes} / {totalVoters} ({participationRate}%)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {totalVotes} out of {totalVoters} voters have cast their votes.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <VotingPeriodForm />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Voting Results</CardTitle>
            <CardDescription>
              Results will be available once the voting period has ended.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-md">
              {isVotingActive() ? (
                <div className="text-center py-4">
                  <p className="text-amber-600 font-medium">Voting is still in progress</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Results will be displayed once the voting period ends.
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Link
                    to="/admin/results"
                    className="inline-flex items-center px-4 py-2 bg-vote-indigo text-white rounded-md hover:bg-vote-indigo/90"
                  >
                    View Results
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
