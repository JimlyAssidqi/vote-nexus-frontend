
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
            <Button onClick={handleGetStarted}>Ke Dashboard</Button>
          ) : (
            <Button onClick={() => navigate('/login')}>Masuk</Button>
          )}
        </div>
      </header>
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-white to-sky-50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
                  Pemilihan <span className="text-vote-blue">Kampus</span> Menjadi Mudah
                </h1>
                <p className="text-lg text-muted-foreground">
                  Platform yang aman dan efisien untuk pemilihan kampus. Pilih kandidat favorit Anda dengan mudah.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={handleGetStarted}>
                    Mulai
                  </Button>
                  {!isAuthenticated && (
                    <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                      Pelajari Lebih Lanjut
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
                      <h3 className="text-lg font-medium">Pemungutan Suara Aman</h3>
                      <p className="text-muted-foreground">
                        Platform kami memastikan setiap pemilih hanya dapat memilih sekali, menjaga integritas pemilihan.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Hasil Waktu Nyata</h3>
                      <p className="text-muted-foreground">
                        Lihat hasil pemilihan segera setelah periode pemungutan suara berakhir.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Antarmuka Ramah Pengguna</h3>
                      <p className="text-muted-foreground">
                        Platform yang mudah digunakan baik untuk administrator maupun pemilih.
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
            <h2 className="text-2xl font-semibold mb-6">Cara Kerjanya</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-4">
                <div className="bg-vote-blue/10 rounded-full p-3 mb-4">
                  <svg className="h-6 w-6 text-vote-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Masuk</h3>
                <p className="text-muted-foreground">Login dengan ID mahasiswa atau kredensial admin Anda.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="bg-vote-indigo/10 rounded-full p-3 mb-4">
                  <svg className="h-6 w-6 text-vote-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Pilih Kandidat</h3>
                <p className="text-muted-foreground">Jelajahi kandidat dan pilih yang Anda sukai.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="bg-vote-success/10 rounded-full p-3 mb-4">
                  <svg className="h-6 w-6 text-vote-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Kirim Suara</h3>
                <p className="text-muted-foreground">Konfirmasi pilihan Anda untuk memberikan suara dengan aman.</p>
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
            Platform pemilihan kampus yang aman
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
