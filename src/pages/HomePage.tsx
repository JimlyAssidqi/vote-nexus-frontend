
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Shield, Clock, User } from 'lucide-react';
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
      <header className="border-b bg-background shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-vote-blue p-2 rounded-full">
              <Check className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-vote-blue to-vote-indigo bg-clip-text text-transparent">VoteNexus</span>
          </div>
          
          {isAuthenticated ? (
            <Button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-vote-blue to-vote-indigo hover:opacity-90 transition-all rounded-full shadow-md px-6"
            >
              Ke Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-vote-blue to-vote-indigo hover:opacity-90 transition-all rounded-full shadow-md px-6"
            >
              Masuk
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section with improved design */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNCQkRERkYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTZWNmg2djI0em0tNiAwSDI0VjZoNnYyNHptLTYgMEgxOFY2aDZ2MjR6bS02IDBoLTZWNmg2djI0em0tNiAwSDB2LTZoNnY2em0zMCAwdi02aDZ2NmgtNnptNi02aC02di02aDZ2NnptLTYtNmgtNnYtNmg2djZ6bS02LTZIMzB2LTZoNnY2em0tNi02aC02di02aDZ2NnptLTYtNkgyNHYtNmg2djZ6bS02LTZoLTZ2LTZoNnY2em0tNi02aC02djZoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10 -z-10"></div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 bg-gradient-to-r from-vote-blue to-vote-indigo bg-clip-text text-transparent">
                Pemilihan <span className="text-vote-blue">Kampus</span> Menjadi Lebih Mudah
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                Platform yang aman dan efisien untuk pemilihan kampus. Pilih kandidat favorit Anda dengan mudah dan transparan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-vote-blue to-vote-indigo hover:opacity-90 transition-all rounded-full shadow-md px-8 py-6"
                >
                  Mulai Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {!isAuthenticated && (
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => navigate('/login')}
                    className="rounded-full border-vote-blue text-vote-blue hover:bg-vote-blue/5 px-8 py-6"
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                )}
              </div>
            </div>
            
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 transform transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="rounded-full bg-blue-100 p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-vote-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Pemungutan Suara Aman</h3>
                <p className="text-slate-600">
                  Platform kami memastikan setiap pemilih hanya dapat memilih sekali, menjaga integritas pemilihan.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 transform transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="rounded-full bg-indigo-100 p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-vote-indigo" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Hasil Waktu Nyata</h3>
                <p className="text-slate-600">
                  Lihat hasil pemilihan segera setelah periode pemungutan suara berakhir dengan visualisasi yang jelas.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 transform transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="rounded-full bg-green-100 p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-vote-success" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Antarmuka Intuitif</h3>
                <p className="text-slate-600">
                  Platform yang mudah digunakan baik untuk administrator maupun pemilih dengan desain yang intuitif.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-800">Cara Kerjanya</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-vote-blue to-vote-indigo mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-vote-blue/10 rounded-full p-6 mb-6">
                    <div className="bg-vote-blue rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">1</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">Masuk</h3>
                  <p className="text-slate-600">Login dengan ID mahasiswa atau kredensial admin Anda untuk mengakses sistem.</p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-1 bg-gradient-to-r from-vote-blue to-transparent -translate-y-1/2 -translate-x-8"></div>
              </div>
              
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-vote-indigo/10 rounded-full p-6 mb-6">
                    <div className="bg-vote-indigo rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">2</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">Pilih Kandidat</h3>
                  <p className="text-slate-600">Jelajahi kandidat dan pilih yang Anda sukai sesuai dengan preferensi Anda.</p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-1 bg-gradient-to-r from-vote-indigo to-transparent -translate-y-1/2 -translate-x-8"></div>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-vote-success/10 rounded-full p-6 mb-6">
                  <div className="bg-vote-success rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">3</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Kirim Suara</h3>
                <p className="text-slate-600">Konfirmasi pilihan Anda untuk memberikan suara dengan aman dan sah.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-vote-blue to-vote-indigo text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Siap untuk Memilih?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Bergabunglah dalam proses demokratis kampus dan berikan suara Anda untuk perubahan yang lebih baik.</p>
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="bg-white text-vote-blue hover:bg-white/90 rounded-full px-8 shadow-lg"
            >
              {isAuthenticated ? 'Ke Dashboard' : 'Mulai Sekarang'}
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8 bg-slate-50">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="bg-vote-blue p-1.5 rounded-full">
              <Check className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-vote-blue to-vote-indigo bg-clip-text text-transparent">
              VoteNexus © {new Date().getFullYear()}
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Platform pemilihan kampus yang aman dan terpercaya
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
