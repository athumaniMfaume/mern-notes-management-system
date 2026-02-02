import { Navbar } from '../components/Navbar';
import { useEffect, useState } from 'react';
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios';
import NoteCard from '../components/NoteCard';
import { toast } from 'react-hot-toast';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true); // start as true

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        console.log('API response:', res.data);

        // Ensure we always have an array
        const data = Array.isArray(res.data) ? res.data : [];
        setNotes(data);
        setIsRateLimit(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        if (error?.response?.status === 429) {
          setIsRateLimit(true);
        } else {
          toast.error('Failed to fetch notes.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimit && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {!loading && Array.isArray(notes) && notes.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}

        {!loading && Array.isArray(notes) && notes.length === 0 && !isRateLimit && <NotesNotFound />}
      </div>
    </div>
  );
};

export default HomePage;

