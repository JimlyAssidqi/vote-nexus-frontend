
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const LoginForm = () => {
  const [activeTab, setActiveTab] = useState<string>('voter');
  const [usernameOrNim, setUsernameOrNim] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await login(usernameOrNim, password);
      if (success) {
        // Redirect based on role
        const redirectPath = activeTab === 'admin' ? '/admin' : '/voter';
        navigate(redirectPath);
      } else {
        setError('Kredensial tidak valid');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat login');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="mx-auto max-w-md px-4 sm:px-0">
      <Card className="animate-fade-in overflow-hidden shadow-lg border-0 bg-white">
        <div className="h-2 bg-gradient-to-r from-vote-blue to-vote-indigo"></div>
        <CardHeader className="space-y-1 pb-6">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-vote-blue/10 p-3">
              <LogIn className="h-6 w-6 text-vote-blue" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Masuk</CardTitle>
          <CardDescription className="text-center">
            Masuk untuk mengakses sistem pemilihan kampus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="voter">Pemilih</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="voter">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nim">NIM</Label>
                  <Input 
                    id="nim" 
                    placeholder="Masukkan NIM Anda" 
                    value={usernameOrNim}
                    onChange={(e) => setUsernameOrNim(e.target.value)}
                    required
                    className="rounded-md focus-within:ring-vote-blue"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voter-password">Kata Sandi</Label>
                  <Input
                    id="voter-password"
                    type="password"
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-md focus-within:ring-vote-blue"
                  />
                </div>
                
                {error && (
                  <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                
                <Button type="submit" className="w-full rounded-md shadow-sm" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Masuk...
                    </>
                  ) : (
                    'Masuk sebagai Pemilih'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="admin">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    placeholder="Masukkan username admin" 
                    value={usernameOrNim}
                    onChange={(e) => setUsernameOrNim(e.target.value)}
                    required
                    className="rounded-md focus-within:ring-vote-blue"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Kata Sandi</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Masukkan kata sandi admin"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-md focus-within:ring-vote-blue"
                  />
                </div>
                
                {error && (
                  <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                
                <Button type="submit" className="w-full rounded-md shadow-sm" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Masuk...
                    </>
                  ) : (
                    'Masuk sebagai Admin'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground pt-4 border-t w-full text-center">
            <p className="mb-2">Kredensial Demo:</p>
            <p>Admin: username: <span className="font-mono bg-muted px-1 rounded">admin</span>, kata sandi: <span className="font-mono bg-muted px-1 rounded">admin123</span></p>
            <p>Pemilih: NIM: <span className="font-mono bg-muted px-1 rounded">123456</span>, kata sandi: <span className="font-mono bg-muted px-1 rounded">pass123</span></p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
