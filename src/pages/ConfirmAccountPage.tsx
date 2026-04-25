// src/pages/ConfirmAccountPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '@/api/client';
import { Button } from '@/components/ui/button';

export default function ConfirmAccountPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    apiClient.get(`/auth/confirm/${token}/`)
      .then(response => {
        setStatus('success');
        setMessage(response.data.detail);
        setTimeout(() => navigate('/login'), 3000);
      })
      .catch(error => {
        setStatus('error');
        setMessage(error.response?.data?.detail || 'Lien invalide ou expiré');
      });
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {status === 'loading' && <p>Vérification de votre compte...</p>}
        {status === 'success' && (
          <>
            <p className="text-green-600">{message}</p>
            <p>Redirection vers la page de connexion...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <p className="text-red-600">{message}</p>
            <Button onClick={() => navigate('/login')}>Retour à la connexion</Button>
          </>
        )}
      </div>
    </div>
  );
}