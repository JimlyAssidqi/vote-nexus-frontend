
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useVote } from '@/contexts/VoteContext';

export const VotingPeriodForm = () => {
  const { votingPeriod, setVotingPeriod } = useVote();
  
  // Format date for input value: YYYY-MM-DDThh:mm
  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };
  
  const [formData, setFormData] = useState({
    startDate: formatDateForInput(votingPeriod.startDate),
    endDate: formatDateForInput(votingPeriod.endDate),
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVotingPeriod({
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
    });
  };
  
  const isActive = votingPeriod.isActive;
  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);
  const now = new Date();
  const isStarted = now >= startDate;
  const isEnded = now > endDate;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Periode Pemungutan Suara</CardTitle>
        <CardDescription>
          Tetapkan tanggal mulai dan berakhir untuk periode pemungutan suara
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Tanggal & Waktu Mulai</Label>
            <Input 
              id="startDate" 
              name="startDate" 
              type="datetime-local" 
              value={formData.startDate}
              onChange={handleChange}
              className={isStarted ? "border-vote-blue" : ""}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">Tanggal & Waktu Berakhir</Label>
            <Input 
              id="endDate" 
              name="endDate" 
              type="datetime-local" 
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate}
              className={isEnded ? "border-vote-blue" : ""}
              required
            />
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full">Simpan Periode Pemungutan Suara</Button>
            
            <div className={`mt-4 p-3 rounded-md border ${
              isActive ? "bg-green-50 border-green-200" : 
              isEnded ? "bg-gray-50 border-gray-200" : 
              "bg-yellow-50 border-yellow-200"
            }`}>
              <p className={`text-sm font-medium ${
                isActive ? "text-green-600" : 
                isEnded ? "text-gray-600" : 
                "text-yellow-600"
              }`}>
                {isActive ? "Pemungutan suara sedang berlangsung" : 
                 isEnded ? "Periode pemungutan suara telah berakhir" : 
                 "Periode pemungutan suara belum dimulai"}
              </p>
              <p className="text-xs mt-1">
                {isActive ? 
                  `Pemungutan suara berakhir pada ${endDate.toLocaleDateString()} jam ${endDate.toLocaleTimeString()}` :
                 isEnded ? 
                  `Pemungutan suara berakhir pada ${endDate.toLocaleDateString()} jam ${endDate.toLocaleTimeString()}` :
                  `Pemungutan suara dimulai pada ${startDate.toLocaleDateString()} jam ${startDate.toLocaleTimeString()}`
                }
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
