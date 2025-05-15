
import { CandidateList } from '@/components/admin/CandidateList';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CandidatesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kelola Kandidat</h1>
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dashboard
          </Link>
        </Button>
      </div>
      <CandidateList />
    </div>
  );
};

export default CandidatesPage;
