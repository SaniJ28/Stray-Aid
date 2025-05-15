import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import VirtualVet from './VirtualVet';

// Mock data for entries
const entries = [
  {
    id: 1,
    date: '2024-03-21',
    location: 'Mumbai, India',
    animal: 'Dog',
    status: 'Rescued',
    priority: 'High',
  },
  {
    id: 2,
    date: '2024-03-20',
    location: 'Delhi, India',
    animal: 'Cat',
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    id: 3,
    date: '2024-03-19',
    location: 'Bangalore, India',
    animal: 'Bird',
    status: 'Pending',
    priority: 'Low',
  },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto px-6 py-12 bg-pink-100/50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-pink-900">Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-pink-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-pink-800">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-900">43</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-pink-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-pink-800">Active Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-900">12</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-pink-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-pink-800">Rescued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-900">28</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-pink-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-pink-800">NGO Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-900">8</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Entries */}
      <Card className="mb-8 bg-white shadow-lg hover:shadow-xl transition-shadow border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-gray-900">Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100">
                <TableHead className="text-gray-700">Date</TableHead>
                <TableHead className="text-gray-700">Location</TableHead>
                <TableHead className="text-gray-700">Animal</TableHead>
                <TableHead className="text-gray-700">Status</TableHead>
                <TableHead className="text-gray-700">Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id} className="border-gray-100">
                  <TableCell className="text-gray-800">{entry.date}</TableCell>
                  <TableCell className="text-gray-800">{entry.location}</TableCell>
                  <TableCell className="text-gray-800">{entry.animal}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={entry.status === 'Rescued' ? 'default' : entry.status === 'In Progress' ? 'secondary' : 'outline'}
                      className={
                        entry.status === 'Rescued' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                        entry.status === 'In Progress' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                        'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }
                    >
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={entry.priority === 'High' ? 'destructive' : entry.priority === 'Medium' ? 'secondary' : 'outline'}
                      className={
                        entry.priority === 'High' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                        entry.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                        'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }
                    >
                      {entry.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Virtual Vet Chat */}
      <VirtualVet />
    </div>
  );
};

export default Dashboard; 