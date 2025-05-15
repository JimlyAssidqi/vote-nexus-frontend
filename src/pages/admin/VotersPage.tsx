
import { VoterList } from '@/components/admin/VoterList';

const VotersPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Voters</h1>
      <VoterList />
    </div>
  );
};

export default VotersPage;
