
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Users, Check, Landmark } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const navItems = React.useMemo(() => {
    // Common nav items
    const items = [];
    
    if (user) {
      if (user.role === 'admin') {
        items.push(
          { path: '/admin', label: 'Dashboard', icon: <Landmark className="h-4 w-4" /> },
          { path: '/admin/candidates', label: 'Kandidat', icon: <User className="h-4 w-4" /> },
          { path: '/admin/voters', label: 'Pemilih', icon: <Users className="h-4 w-4" /> },
        );
      } else if (user.role === 'voter') {
        items.push(
          { path: '/voter', label: 'Pemilihan', icon: <Check className="h-4 w-4" /> },
        );
      }
    }
    
    return items;
  }, [user]);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-vote-blue p-2">
              <Check className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-vote-blue to-vote-indigo bg-clip-text text-transparent">VoteNexus</span>
          </Link>
          
          {user && (
            <nav className="hidden md:flex items-center gap-6 ml-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 border rounded-full px-3 py-1 bg-muted/30">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button size="sm" variant="ghost" onClick={logout} className="hover:bg-destructive/10 hover:text-destructive">
                <LogOut className="h-4 w-4 mr-1" />
                Keluar
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="default" className="rounded-full shadow-sm">
                Masuk
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile navigation */}
      {user && (
        <div className="container md:hidden py-2 border-t">
          <nav className="flex items-center justify-between">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 py-2 px-3 text-xs transition-colors hover:text-primary ${
                  location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
