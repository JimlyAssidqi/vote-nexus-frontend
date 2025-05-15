
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

// Types for our users
export type UserRole = 'admin' | 'voter';

export interface User {
  id: string;
  username?: string;
  nim?: string; // Student ID for voters
  name: string;
  role: UserRole;
  hasVoted?: boolean;
}

// Mock data for our users
const MOCK_USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Administrator',
    role: 'admin' as UserRole,
  },
  {
    id: '2',
    nim: '123456',
    password: 'pass123',
    name: 'John Student',
    role: 'voter' as UserRole,
    hasVoted: false,
  },
  {
    id: '3',
    nim: '654321',
    password: 'pass123',
    name: 'Jane Student',
    role: 'voter' as UserRole,
    hasVoted: true,
  }
];

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (usernameOrNim: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUserVoted: (userId: string, candidateId: string) => void;
  loadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => Promise.resolve(false),
  logout: () => {},
  setUserVoted: () => {},
  loadingAuth: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if there's a stored user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('voteUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('voteUser');
      }
    }
    setLoadingAuth(false);
  }, []);

  // Login function
  const login = async (usernameOrNim: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find the user with matching credentials
    const foundUser = MOCK_USERS.find(u => 
      (u.username === usernameOrNim || u.nim === usernameOrNim) && 
      u.password === password
    );

    if (foundUser) {
      // Create a user object without the password
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('voteUser', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
      
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('voteUser');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/login');
  };

  // Update user's voted status
  const setUserVoted = (userId: string, candidateId: string) => {
    if (user && user.id === userId && user.role === 'voter') {
      const updatedUser = { ...user, hasVoted: true };
      setUser(updatedUser);
      localStorage.setItem('voteUser', JSON.stringify(updatedUser));
      
      // In a real app, we would also update the backend here
      toast({
        title: "Vote recorded",
        description: "Your vote has been successfully recorded.",
      });
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        login, 
        logout,
        setUserVoted,
        loadingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
