
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Post } from '../models/types';
import postsService from '../services/postsService';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Edit } from 'lucide-react';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const postId = parseInt(id);
        const fetchedPost = await postsService.getPost(postId);
        setPost(fetchedPost);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load this post. It may have been deleted or you may not have permission to view it.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const handleDelete = async () => {
    if (!post || !confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await postsService.deletePost(post.id);
      navigate('/');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold text-destructive mb-4">Error</h2>
        <p className="text-muted-foreground mb-4">{error || 'Post not found'}</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }
  
  const isAuthor = user?.id === post.user_id;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
          <CardDescription>
            Posted on {formatDate(post.created_at)}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="prose max-w-none">
          {post.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </CardContent>
        
        {isAuthor && (
          <>
            <Separator />
            <CardFooter className="flex justify-between py-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/posts/${post.id}/edit`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Post
              </Button>
              
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default PostDetail;
