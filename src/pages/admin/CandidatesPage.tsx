
import { CandidateList } from '@/components/admin/CandidateList';

const CandidatesPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Candidates</h1>
      <CandidateList />
    </div>
  );
};

export default CandidatesPage;
