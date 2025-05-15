
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    if (isAuthenticated && user) {
      const redirectPath = user.role === 'admin' ? '/admin' : '/voter';
      navigate(redirectPath);
    } else {
      navigate('/login');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="h-6 w-6 text-vote-blue" />
            <span className="text-xl font-bold">VoteNexus</span>
          </div>
          
          {isAuthenticated ? (
            <Button onClick={handleGetStarted}>Go to Dashboard</Button>
          ) : (
            <Button onClick={() => navigate('/login')}>Sign In</Button>
          )}
        </div>
      </header>
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-white to-sky-50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
                  Campus <span className="text-vote-blue">Voting</span> Made Simple
                </h1>
                <p className="text-lg text-muted-foreground">
                  A secure and efficient platform for campus elections. Vote for your preferred candidates with ease.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={handleGetStarted}>
                    Get Started
                  </Button>
                  {!isAuthenticated && (
                    <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                      Learn More
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-vote-indigo/10 rounded-lg p-8 relative">
                  <div className="absolute -top-4 -left-4 bg-vote-blue text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Secure Voting</h3>
                      <p className="text-muted-foreground">
                        Our platform ensures each voter can only vote once, maintaining election integrity.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Real-time Results</h3>
                      <p className="text-muted-foreground">
                        View election results as soon as the voting period ends.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">User-friendly Interface</h3>
                      <p className="text-muted-foreground">
                        Easy-to-use platform for both administrators and voters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-4">
                <div className="bg-vote-blue/10 rounded-full p-3 mb-4">
                  <svg className="h-6 w-6 text-vote-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Sign In</h3>
                <p className="text-muted-foreground">Login with your student ID or admin credentials.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="bg-vote-indigo/10 rounded-full p-3 mb-4">
                  <svg className="h-6 w-6 text-vote-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Choose Candidate</h3>
                <p className="text-muted-foreground">Browse candidates and select your preferred choice.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="bg-vote-success/10 rounded-full p-3 mb-4">
                  <svg className="h-6 w-6 text-vote-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Submit Vote</h3>
                <p className="text-muted-foreground">Confirm your selection to cast your vote securely.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 bg-background">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-vote-blue" />
            <span className="text-sm font-medium">VoteNexus © 2025</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A secure campus voting platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
