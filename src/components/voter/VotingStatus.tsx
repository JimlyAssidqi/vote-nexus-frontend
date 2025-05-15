
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
    statusTitle = "Voting Not Started Yet";
    statusDescription = `Voting will begin on ${formatDateDisplay(startDate)}`;
    statusColor = "border-vote-warning bg-amber-50";
  } else if (!votingActive && now > endDate) {
    statusIcon = <AlertCircle className="h-5 w-5 text-vote-blue" />;
    statusTitle = "Voting Period Ended";
    statusDescription = `Voting ended on ${formatDateDisplay(endDate)}`;
    statusColor = "border-vote-blue bg-blue-50";
  } else if (hasVoted) {
    statusIcon = <Check className="h-5 w-5 text-vote-success" />;
    statusTitle = "You Have Voted";
    statusDescription = `Thank you for participating. Voting ends on ${formatDateDisplay(endDate)}`;
    statusColor = "border-vote-success bg-green-50";
  } else {
    statusIcon = <Clock className="h-5 w-5 text-primary" />;
    statusTitle = "Voting in Progress";
    statusDescription = `Voting is open until ${formatDateDisplay(endDate)}`;
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
            <p className="font-medium">Please cast your vote by selecting one of the candidates below.</p>
          )}
          {hasVoted && (
            <p className="font-medium">Your vote has been recorded. Results will be available after the voting period ends.</p>
          )}
          {!votingActive && now > endDate && (
            <p className="font-medium">The voting period has ended. View the results below.</p>
          )}
          {!votingActive && now < startDate && (
            <p className="font-medium">Please check back when the voting period begins.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
