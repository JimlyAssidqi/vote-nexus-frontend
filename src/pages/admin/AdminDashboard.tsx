
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VotingPeriodForm } from '@/components/admin/VotingPeriodForm';
import { useVote } from '@/contexts/VoteContext';
import { User, Users, Check, ChartBar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const { candidates, voters, isVotingActive } = useVote();
  
  // Calculate stats
  const totalCandidates = candidates.length;
  const totalVoters = voters.length;
  const totalVotes = voters.filter(voter => voter.hasVoted).length;
  const participationRate = totalVoters > 0 ? Math.round((totalVotes / totalVoters) * 100) : 0;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden border-l-4 border-l-vote-indigo">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Kandidat</p>
                <h3 className="text-2xl font-bold">{totalCandidates}</h3>
                <Link to="/admin/candidates" className="text-xs text-vote-indigo mt-2 inline-block">
                  Kelola Kandidat
                </Link>
              </div>
              <div className="bg-vote-indigo/10 p-3 rounded-full">
                <User className="h-5 w-5 text-vote-indigo" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-l-4 border-l-vote-blue">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Pemilih</p>
                <h3 className="text-2xl font-bold">{totalVoters}</h3>
                <Link to="/admin/voters" className="text-xs text-vote-blue mt-2 inline-block">
                  Kelola Pemilih
                </Link>
              </div>
              <div className="bg-vote-blue/10 p-3 rounded-full">
                <Users className="h-5 w-5 text-vote-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-l-4 border-l-vote-success">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Partisipasi Pemilih</p>
                <h3 className="text-2xl font-bold">{totalVotes} / {totalVoters}</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  Tingkat Partisipasi: {participationRate}%
                </p>
              </div>
              <div className="bg-vote-success/10 p-3 rounded-full">
                <Check className="h-5 w-5 text-vote-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Periode Pemilihan</CardTitle>
            <CardDescription>
              Atur waktu mulai dan selesai periode pemilihan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VotingPeriodForm />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Hasil Pemilihan</CardTitle>
            <CardDescription>
              Hasil akan tersedia setelah periode pemilihan berakhir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 border rounded-md bg-muted/20 flex flex-col items-center">
              {isVotingActive() ? (
                <>
                  <div className="bg-amber-100 p-3 rounded-full mb-3">
                    <ChartBar className="h-5 w-5 text-amber-600" />
                  </div>
                  <p className="text-amber-600 font-medium text-center">Pemungutan suara masih berlangsung</p>
                  <p className="text-sm text-muted-foreground mt-1 text-center">
                    Hasil akan ditampilkan setelah periode pemilihan berakhir.
                  </p>
                </>
              ) : (
                <>
                  <div className="bg-vote-blue/10 p-3 rounded-full mb-3">
                    <ChartBar className="h-5 w-5 text-vote-blue" />
                  </div>
                  <p className="font-medium mb-3 text-center">Periode pemilihan telah berakhir</p>
                  <Button asChild>
                    <Link to="/admin/results" className="rounded-full shadow-sm">
                      Lihat Hasil
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
