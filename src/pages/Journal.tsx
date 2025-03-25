
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Plus, Save, CalendarDays, Search, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample journal entries for demo
const sampleEntries = [
  {
    id: 1,
    date: '2023-03-25',
    title: 'RELIANCE Entry Strategy',
    content: 'Entered Reliance at ₹2890 based on technical breakout. Target ₹3000, stop loss at ₹2850.',
    tags: ['long', 'technical', 'breakout']
  },
  {
    id: 2,
    date: '2023-03-22',
    title: 'HDFC Bank Exit',
    content: 'Exited HDFC Bank position at ₹1485. Profit of 2.3%. Reason: Approaching resistance level and banking sector showing weakness.',
    tags: ['exit', 'resistance', 'sector-rotation']
  },
  {
    id: 3,
    date: '2023-03-20',
    title: 'Market Analysis - IT Sector',
    content: 'IT sector showing strength despite overall market weakness. Looking for entry opportunities in TCS and Infosys on pullbacks.',
    tags: ['analysis', 'IT-sector', 'watchlist']
  }
];

const Journal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [entries, setEntries] = useState(sampleEntries);
  const [newEntry, setNewEntry] = useState({ title: '', content: '', tags: '' });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNewEntryChange = (field: string, value: string) => {
    setNewEntry({ ...newEntry, [field]: value });
  };

  const addNewEntry = () => {
    if (newEntry.title.trim() === '' || newEntry.content.trim() === '') {
      return;
    }

    const tagsArray = newEntry.tags ? newEntry.tags.split(',').map(tag => tag.trim()) : [];
    
    const newJournalEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: newEntry.title,
      content: newEntry.content,
      tags: tagsArray
    };

    setEntries([newJournalEntry, ...entries]);
    setNewEntry({ title: '', content: '', tags: '' });
  };

  const filteredEntries = entries.filter(entry => {
    // Filter by search term
    const matchesSearch = 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchesSearch) return false;
    
    // Apply tag filter if not "all"
    if (filter !== 'all') {
      return entry.tags.includes(filter);
    }
    
    return true;
  });

  // Get unique tags for filter
  const allTags = Array.from(new Set(entries.flatMap(entry => entry.tags)));

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <Sidebar isMobile={true} onClose={toggleSidebar} />
      )}
      
      <div className="lg:ml-64 pt-16">
        <Header onMenuClick={toggleSidebar} />
        
        <main className="p-4 max-w-screen-2xl mx-auto">
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-bold">Trading Journal</h1>
            
            <Tabs defaultValue="entries" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="entries">Journal Entries</TabsTrigger>
                <TabsTrigger value="new">New Entry</TabsTrigger>
              </TabsList>
              
              <TabsContent value="entries" className="space-y-4">
                {/* Search and filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search entries..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Tag className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Entries</SelectItem>
                      {allTags.map(tag => (
                        <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Entry list */}
                <div className="space-y-4">
                  {filteredEntries.length > 0 ? (
                    filteredEntries.map(entry => (
                      <Card key={entry.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{entry.title}</CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarDays className="h-4 w-4 mr-1" />
                              {entry.date}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="whitespace-pre-wrap">{entry.content}</p>
                        </CardContent>
                        <CardFooter>
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.map(tag => (
                              <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center p-8 text-muted-foreground">
                      No entries found. Try changing your search or filter.
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="new">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Journal Entry</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Entry title"
                        value={newEntry.title}
                        onChange={(e) => handleNewEntryChange('title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Write your journal entry here..."
                        className="min-h-[200px]"
                        value={newEntry.content}
                        onChange={(e) => handleNewEntryChange('content', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Tags (comma separated)"
                        value={newEntry.tags}
                        onChange={(e) => handleNewEntryChange('tags', e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={addNewEntry}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Entry
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      
      <Sidebar />
    </div>
  );
};

export default Journal;
