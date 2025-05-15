
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useVote } from '@/contexts/VoteContext';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, Check, AlertCircle } from 'lucide-react';

export const VotingStatus = () => {
  const { votingPeriod, isVotingActive } = useVote();
  const { user } = useAuth();
  
  const hasVoted = user?.hasVoted;
  const votingActive = isVotingActive();
  
  const startDate = votingPeriod.startDate;
  const endDate = votingPeriod.endDate;
  const now = new Date();
  
  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  let statusIcon;
  let statusTitle;
  let statusDescription;
  let statusColor;
  
  if (!votingActive && now < startDate) {
    statusIcon = <Clock className="h-6 w-6 text-amber-500" />;
    statusTitle = "Pemilihan Belum Dimulai";
    statusDescription = `Pemilihan akan dimulai pada ${formatDateDisplay(startDate)}`;
    statusColor = "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200";
  } else if (!votingActive && now > endDate) {
    statusIcon = <AlertCircle className="h-6 w-6 text-vote-blue" />;
    statusTitle = "Periode Pemilihan Berakhir";
    statusDescription = `Pemilihan berakhir pada ${formatDateDisplay(endDate)}`;
    statusColor = "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200";
  } else if (hasVoted) {
    statusIcon = <Check className="h-6 w-6 text-green-600" />;
    statusTitle = "Anda Telah Memilih";
    statusDescription = `Terima kasih atas partisipasi Anda. Pemilihan berakhir pada ${formatDateDisplay(endDate)}`;
    statusColor = "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200";
  } else {
    statusIcon = <Clock className="h-6 w-6 text-primary" />;
    statusTitle = "Pemilihan Sedang Berlangsung";
    statusDescription = `Pemilihan berlangsung hingga ${formatDateDisplay(endDate)}`;
    statusColor = "bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200";
  }
  
  return (
    <Card className={`shadow-sm overflow-hidden ${statusColor}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${!votingActive && now < startDate ? 'bg-amber-100' : 
                                              !votingActive && now > endDate ? 'bg-blue-100' : 
                                              hasVoted ? 'bg-green-100' : 'bg-blue-100'}`}>
            {statusIcon}
          </div>
          <div>
            <CardTitle className="text-lg">{statusTitle}</CardTitle>
            <CardDescription className="text-sm">
              {statusDescription}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm px-4 py-3 bg-white/70 backdrop-blur-sm rounded-lg">
          {votingActive && !hasVoted && (
            <p className="font-medium">Silakan memberikan suara Anda dengan memilih salah satu kandidat di bawah ini.</p>
          )}
          {hasVoted && (
            <p className="font-medium">Suara Anda telah tercatat. Hasil akan tersedia setelah periode pemilihan berakhir.</p>
          )}
          {!votingActive && now > endDate && (
            <p className="font-medium">Periode pemilihan telah berakhir. Lihat hasil di bawah ini.</p>
          )}
          {!votingActive && now < startDate && (
            <p className="font-medium">Silakan periksa kembali saat periode pemilihan dimulai.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
