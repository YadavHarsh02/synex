import { useAuth, useUser } from '@clerk/react';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import api, { setAuthToken } from '../../services/api';

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [onboardingStatus, setOnboardingStatus] = useState('loading'); // loading, complete, incomplete
  const location = useLocation();

  // Axios request interceptor to dynamically refresh and inject Clerk tokens
  useEffect(() => {
    if (!isSignedIn) return;

    const interceptor = api.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Failed to attach dynamic Clerk token:", error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [isSignedIn, getToken]);

  useEffect(() => {
    const initAuth = async () => {
      if (isSignedIn) {
        try {
          const response = await api.post('/user/upsert', {
            email: user.primaryEmailAddress.emailAddress,
            name: user.fullName || user.username,
          });
          
          if (response.data.onboardingCompleted) {
            setOnboardingStatus('complete');
          } else {
            setOnboardingStatus('incomplete');
          }
        } catch (error) {
          console.error("Failed to sync user:", error);
          setOnboardingStatus('error');
        }
      }
    };

    if (isLoaded) {
      initAuth();
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || (isSignedIn && onboardingStatus === 'loading')) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  if (onboardingStatus === 'incomplete' && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
