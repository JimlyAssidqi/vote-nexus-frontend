
import React, { createContext, useContext, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from './AuthContext';

export interface Candidate {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  votes: number;
}

export interface Voter {
  id: string;
  nim: string;
  name: string;
  hasVoted: boolean;
  votedFor?: string;
  password?: string;
}

export interface VotingPeriod {
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

// Mock data
const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    description: 'Computer Science major with a focus on student welfare and mental health support.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
    votes: 24,
  },
  {
    id: '2',
    name: 'Sarah Miller',
    description: 'Business Administration student committed to increasing student engagement and campus activities.',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
    votes: 19,
  },
  {
    id: '3',
    name: 'Michael Chen',
    description: 'Engineering major focusing on improving campus infrastructure and technological resources.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
    votes: 31,
  }
];

const MOCK_VOTERS: Voter[] = [
  {
    id: '2',
    nim: '123456',
    name: 'John Student',
    hasVoted: false,
    password: 'pass123'
  },
  {
    id: '3',
    nim: '654321',
    name: 'Jane Student',
    hasVoted: true,
    votedFor: '3',
    password: 'pass123'
  },
  {
    id: '4',
    nim: '234567',
    name: 'Bob Academic',
    hasVoted: false,
    password: 'pass123'
  },
  {
    id: '5',
    nim: '345678',
    name: 'Alice Scholar',
    hasVoted: true,
    votedFor: '1',
    password: 'pass123'
  }
];

// Set mock voting period - ongoing for the next 7 days
const now = new Date();
const MOCK_VOTING_PERIOD: VotingPeriod = {
  startDate: new Date(now.setDate(now.getDate() - 1)), // yesterday
  endDate: new Date(now.setDate(now.getDate() + 8)),  // 7 days from now
  isActive: true
};

interface VoteContextType {
  candidates: Candidate[];
  voters: Voter[];
  votingPeriod: VotingPeriod;
  addCandidate: (candidate: Omit<Candidate, 'id' | 'votes'>) => void;
  updateCandidate: (id: string, candidateData: Partial<Candidate>) => void;
  deleteCandidate: (id: string) => void;
  addVoter: (voter: Omit<Voter, 'id' | 'hasVoted' | 'votedFor'>) => void;
  updateVoter: (id: string, voterData: Partial<Voter>) => void;
  deleteVoter: (id: string) => void;
  setVotingPeriod: (period: Omit<VotingPeriod, 'isActive'>) => void;
  submitVote: (voterId: string, candidateId: string) => void;
  isVotingActive: () => boolean;
  getWinner: () => Candidate | null;
}

const VoteContext = createContext<VoteContextType>({
  candidates: [],
  voters: [],
  votingPeriod: { startDate: new Date(), endDate: new Date(), isActive: false },
  addCandidate: () => {},
  updateCandidate: () => {},
  deleteCandidate: () => {},
  addVoter: () => {},
  updateVoter: () => {},
  deleteVoter: () => {},
  setVotingPeriod: () => {},
  submitVote: () => {},
  isVotingActive: () => false,
  getWinner: () => null
});

export const useVote = () => useContext(VoteContext);

export const VoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [voters, setVoters] = useState<Voter[]>(MOCK_VOTERS);
  const [votingPeriod, setVotingPeriodState] = useState<VotingPeriod>(MOCK_VOTING_PERIOD);
  const { setUserVoted } = useAuth();
  const { toast } = useToast();
  
  // Candidate management
  const addCandidate = (candidate: Omit<Candidate, 'id' | 'votes'>) => {
    const newCandidate = {
      ...candidate,
      id: Math.random().toString(36).substr(2, 9), // Generate random ID
      votes: 0
    };
    setCandidates([...candidates, newCandidate]);
    toast({
      title: "Candidate added",
      description: `${candidate.name} has been added as a candidate.`
    });
  };
  
  const updateCandidate = (id: string, candidateData: Partial<Candidate>) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id ? { ...candidate, ...candidateData } : candidate
    ));
    toast({
      title: "Candidate updated",
      description: "The candidate information has been updated."
    });
  };
  
  const deleteCandidate = (id: string) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id));
    toast({
      title: "Candidate deleted",
      description: "The candidate has been removed."
    });
  };
  
  // Voter management
  const addVoter = (voter: Omit<Voter, 'id' | 'hasVoted' | 'votedFor'>) => {
    const newVoter = {
      ...voter,
      id: Math.random().toString(36).substr(2, 9),
      hasVoted: false
    };
    setVoters([...voters, newVoter]);
    toast({
      title: "Voter added",
      description: `${voter.name} has been added as a voter.`
    });
  };
  
  const updateVoter = (id: string, voterData: Partial<Voter>) => {
    setVoters(voters.map(voter => 
      voter.id === id ? { ...voter, ...voterData } : voter
    ));
    toast({
      title: "Voter updated",
      description: "The voter information has been updated."
    });
  };
  
  const deleteVoter = (id: string) => {
    setVoters(voters.filter(voter => voter.id !== id));
    toast({
      title: "Voter deleted",
      description: "The voter has been removed."
    });
  };
  
  // Voting period management
  const setVotingPeriod = (period: Omit<VotingPeriod, 'isActive'>) => {
    const now = new Date();
    const isActive = now >= period.startDate && now <= period.endDate;
    
    setVotingPeriodState({
      ...period,
      isActive
    });
    
    toast({
      title: "Voting period updated",
      description: `Voting period set from ${period.startDate.toLocaleDateString()} to ${period.endDate.toLocaleDateString()}`
    });
  };
  
  const isVotingActive = () => {
    const now = new Date();
    return now >= votingPeriod.startDate && now <= votingPeriod.endDate;
  };
  
  // Voting
  const submitVote = (voterId: string, candidateId: string) => {
    // Update voter status
    setVoters(voters.map(voter => 
      voter.id === voterId ? { ...voter, hasVoted: true, votedFor: candidateId } : voter
    ));
    
    // Update candidate votes
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId ? { ...candidate, votes: candidate.votes + 1 } : candidate
    ));
    
    // Update user context
    setUserVoted(voterId, candidateId);
  };
  
  // Get winner
  const getWinner = (): Candidate | null => {
    if (candidates.length === 0) return null;
    
    return candidates.reduce((prev, current) => 
      (prev.votes > current.votes) ? prev : current
    );
  };
  
  return (
    <VoteContext.Provider
      value={{
        candidates,
        voters,
        votingPeriod,
        addCandidate,
        updateCandidate,
        deleteCandidate,
        addVoter,
        updateVoter,
        deleteVoter,
        setVotingPeriod,
        submitVote,
        isVotingActive,
        getWinner
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};
