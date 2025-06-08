// src/pages/UserAuth.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext';

// Import icons for a professional look
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';

export default function UserAuth() {
  const {
    currentUser,
    pendingApproval,
    error,
    loading,
    login,
    signup,
    googleAuth,
    setError
  } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Listener');

  const navigate = useNavigate();

  // Effect to navigate on successful login
  useEffect(() => {
    if (currentUser) {
      navigate('/homepage');
    }
  }, [currentUser, navigate]);

  // Clear errors when switching mode
  const toggleMode = () => {
    setError('');
    setEmail(''); // Clear form fields when switching mode
    setPassword('');
    setIsLogin(!isLogin);
  };

  // Submit handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await signup(email, password, role);
    }
  };

  // --- Pending Approval State ---
  if (pendingApproval) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 animate-fade-in">
        <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md text-center transform transition-transform duration-300 scale-100 hover:scale-105">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 animate-pulse">
            Registration Pending Approval
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Your account request is currently awaiting review by the admin. Please bear with us; we'll notify you once it's approved.
          </p>
          <div className="text-blue-500 animate-spin-slow">
            <svg className="mx-auto" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4"></path>
              <path d="M12 18v4"></path>
              <path d="M4.93 4.93l2.83 2.83"></path>
              <path d="M16.24 16.24l2.83 2.83"></path>
              <path d="M2 12h4"></path>
              <path d="M18 12h4"></path>
              <path d="M4.93 19.07l2.83-2.83"></path>
              <path d="M16.24 7.76l2.83-2.83"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // --- Login/Signup Form ---
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-blue-50 p-6 relative overflow-hidden group">
      {/* Background Sparkles for aesthetic */}
      {[...Array(20)].map((_, i) => ( // Create 20 sparkle elements
        <div
          key={i}
          className={`absolute rounded-full bg-blue-200 opacity-0 transition-all duration-700 ease-out transform scale-0 group-hover:opacity-60 group-hover:scale-100 animate-sparkle animation-delay-${i * 300}`}
          style={{
            width: `${Math.random() * 10 + 5}px`, // Random size between 5px and 15px
            height: `${Math.random() * 10 + 5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            // Randomize animation duration and delay to make movement less uniform
            animationDuration: `${Math.random() * 5 + 10}s`, // 10s to 15s
            animationDelay: `${Math.random() * 5}s`, // 0s to 5s
          }}
        ></div>
      ))}

      <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-200 transform transition-transform duration-500 ease-in-out hover:scale-[1.02] hover:shadow-3xl animate-fade-in-up relative z-10">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 drop-shadow-sm animate-fade-in-down">
          {isLogin ? 'Welcome Back!' : 'Join Us!'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors duration-300" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 pl-12 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors duration-300" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 pl-12 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>

          {!isLogin && (
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors duration-300" size={20} />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 pl-12 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10 transition-all duration-300 ease-in-out"
                required
              >
                <option value="Listener">Listener</option>
                <option value="Creator">Creator</option>
                <option value="Moderator">Moderator</option>
              </select>
              {/* Custom arrow for select to maintain style consistency */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15 8.707V15a1 1 0 01-1 1H5a1 1 0 01-1-1V8.707l4.293 4.293z"/></svg>
              </div>
            </div>
          )}

          {error && <p className="text-red-600 text-sm text-center animate-shake">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center p-3 rounded-lg font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 hover:translate-y-[-2px] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Please wait...
              </span>
            ) : (
              <>
                {isLogin ? <LogIn size={22} className="mr-3 group-hover:animate-bounce-h" /> : <UserPlus size={22} className="mr-3 group-hover:animate-bounce-h" />}
                {isLogin ? 'Login' : 'Sign Up'}
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-700 opacity-90 animate-fade-in-up">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={toggleMode}
                className="text-blue-600 underline font-medium hover:text-blue-800 transition duration-300"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={toggleMode}
                className="text-blue-600 underline font-medium hover:text-blue-800 transition duration-300"
              >
                Login
              </button>
            </>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center animate-fade-in-up">
          <p className="text-gray-600 mb-4">Or continue with</p>
          <button
            onClick={googleAuth}
            disabled={loading}
            className="w-full flex justify-center items-center p-3 rounded-lg font-bold text-lg bg-white border border-gray-300 text-gray-700 shadow-md hover:shadow-lg transform hover:scale-105 hover:translate-y-[-2px] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Please wait...
              </span>
            ) : (
              <>
                {/* Custom Google SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="24px"
                  height="24px"
                  className="mr-3 group-hover:animate-spin-once"
                >
                  <path
                    fill="#4285F4"
                    d="M24 9.5c3.54 0 6.68 1.2 9.13 3.58l6.83-6.83C34.84 2.7 29.76 0 24 0 14.64 0 6.43 6.32 3.08 15.22l7.93 6.17C12.97 14.08 18.97 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.5 24c0-1.56-.14-3.06-.41-4.5H24v9h12.71c-.55 2.93-2.49 5.4-5.31 6.71l8.11 6.29c4.74-4.38 7.88-11 7.88-18.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.01 28.23c-.35-1.03-.55-2.12-.55-3.23s.2-2.2.55-3.23l-7.93-6.17C1.15 19.37 0 21.56 0 24s1.15 4.63 3.08 6.17l7.93-6.17z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 46.5c6.5 0 12.08-2.14 16.1-5.8l-8.11-6.29c-2.29 1.54-5.15 2.45-8 2.45-5.03 0-10.03-4.58-12.99-11.36L3.08 33.6C6.43 42.5 14.64 46.5 24 46.5z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
