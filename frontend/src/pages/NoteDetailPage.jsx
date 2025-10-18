import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../lib/axios'
import toast, { LoaderIcon } from 'react-hot-toast'
import { ArrowLeftIcon, Trash, Trash2Icon } from 'lucide-react';


const NoteDetailPage = () => {
  const [note, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  console.log({id});

  useEffect(() => { 
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNotes(res.data);
        
      } catch (error) {
        setLoading(false);
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch note.");
      }finally {
        setLoading(false);  
      }

    };
    fetchNote();

  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      setSaving(true);
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note.");
    } finally {
      setSaving(false);
    } 
  };  

    const handleSave = async () => {
      if (!note.title.trim() || !note.content.trim()) {
        toast.error('All fields are required.');
         return;
       }  
      try {
        setSaving(true);
        await api.put(`/notes/${id}`, {
          title: note.title,
          content: note.content
        });
        toast.success("Note updated successfully!");  
        navigate("/");
      } catch (error) {
        console.error("Error updating note:", error);
        toast.error("Failed to update note.");
      } finally {
        setSaving(false);
      } 

  }; 


  if (loading) {
    return (
        <div className='min-h-screen bg-base-200 flex items-center justify-center'>
          <LoaderIcon className='animate-spin size-10' />
        </div>);
  } 

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className='max-w-2xl mx-auto'>
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Notes
          </Link>
          <button onClick={handleDelete} className="btn btn-error btn-outline">
            <Trash2Icon className="h-5 w-5" />
            Delete Note

          </button>
          
        </div>
        
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className='label'>
                <span className='label-text '> Title </span>
              </label>
              <input 
              className='input input-bordered'
              type="text"
              placeholder='notes'
              value={note.title}
              onChange={(e) => setNotes({...note, title: e.target.value})} />

            </div>

            <div className="form-control">
              <label className='label'>
                <span className='label-text '> Content </span>
              </label>
              <textarea 
              className='textarea textarea-bordered h-32'
              type="text"
              placeholder='write your notes here....'
              value={note.content}
              onChange={(e) => setNotes({...note, content: e.target.value})} />

            </div>
            <div className="card-actions justify-end">
              <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
                
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default NoteDetailPage               