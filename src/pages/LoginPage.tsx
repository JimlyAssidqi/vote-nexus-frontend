
import { LoginForm } from '@/components/auth/LoginForm';
import { Check } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Check className="h-6 w-6 text-vote-blue" />
            <span className="text-xl font-bold">VoteNexus</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-10 flex items-center justify-center">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
