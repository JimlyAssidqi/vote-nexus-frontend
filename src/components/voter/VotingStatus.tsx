
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
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
  };
  
  let statusIcon;
  let statusTitle;
  let statusDescription;
  let statusColor;
  
  if (!votingActive && now < startDate) {
    statusIcon = <Clock className="h-5 w-5 text-vote-warning" />;
    statusTitle = "Pemilihan Belum Dimulai";
    statusDescription = `Pemilihan akan dimulai pada ${formatDateDisplay(startDate)}`;
    statusColor = "border-vote-warning bg-amber-50";
  } else if (!votingActive && now > endDate) {
    statusIcon = <AlertCircle className="h-5 w-5 text-vote-blue" />;
    statusTitle = "Periode Pemilihan Berakhir";
    statusDescription = `Pemilihan berakhir pada ${formatDateDisplay(endDate)}`;
    statusColor = "border-vote-blue bg-blue-50";
  } else if (hasVoted) {
    statusIcon = <Check className="h-5 w-5 text-vote-success" />;
    statusTitle = "Anda Telah Memilih";
    statusDescription = `Terima kasih atas partisipasi Anda. Pemilihan berakhir pada ${formatDateDisplay(endDate)}`;
    statusColor = "border-vote-success bg-green-50";
  } else {
    statusIcon = <Clock className="h-5 w-5 text-primary" />;
    statusTitle = "Pemilihan Sedang Berlangsung";
    statusDescription = `Pemilihan berlangsung hingga ${formatDateDisplay(endDate)}`;
    statusColor = "border-primary bg-primary-foreground";
  }
  
  return (
    <Card className={statusColor}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          {statusIcon}
          {statusTitle}
        </CardTitle>
        <CardDescription>
          {statusDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
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
