import React, { useEffect, useState } from 'react';
import { getCurrentUser, logoutUser } from './lib/auth.js';
import { getMyProfile } from './lib/profile.js';
import { getProfiles } from './lib/profilesList.js';
import AuthForm from './components/AuthForm.jsx';
import ProfileForm from './components/ProfileForm.jsx';
import ProfilesList from './components/ProfilesList.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadApp(currentUser) {
    setError('');

    if (currentUser) {
      setUser(currentUser);

      try {
        const myProfile = await getMyProfile(currentUser.$id);
        setProfile(myProfile);

        const allProfiles = await getProfiles();
        setProfiles(allProfiles);
      } catch (err) {
        setError(err?.message || 'Could not load profiles.');
      }
    } else {
      setUser(null);
      setProfile(null);
      setProfiles([]);
    }
  }

  useEffect(() => {
    async function start() {
      try {
        const currentUser = await getCurrentUser();
        await loadApp(currentUser);
      } catch (err) {
        setError(err?.message || 'Could not open the app.');
      } finally {
        setLoading(false);
      }
    }

    start();
  }, []);

  async function handleLogout() {
    try {
      await logoutUser();
      setUser(null);
      setProfile(null);
      setProfiles([]);
      setPage('home');
      setError('');
    } catch (err) {
      setError(err?.message || 'Logout failed.');
    }
  }

  if (loading) {
    return (
      <main className="app">
        <h2>Marriage Life ❤️</h2>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="app">
      <header className="topbar">
        <h1>Marriage Life ❤️</h1>
        <p>Find your life partner</p>

        {user && (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>

      {error && <p className="auth-error">{error}</p>}

      {!user ? (
        <>
          <section className="welcome">
            <h2>Welcome to Marriage Life 💍</h2>
            <p>
              Discover profiles, connect with people and begin
              your journey towards a happy future.
            </p>

            <div className="welcome-actions">
              <button type="button" onClick={() => setPage('signup')}>
                Create Account
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => setPage('login')}
              >
                Login
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => setPage('explore')}
              >
                Explore Profiles
              </button>
            </div>
          </section>

          {page === 'signup' && (
            <AuthForm
              key="signup"
              onSuccess={async () => {
                const currentUser = await getCurrentUser();
                await loadApp(currentUser);
                setPage('profile');
              }}
            />
          )}

          {page === 'login' && (
            <AuthForm
              key="login"
              onSuccess={async () => {
                const currentUser = await getCurrentUser();
                await loadApp(currentUser);
                setPage('dashboard');
              }}
            />
          )}

          {page === 'explore' && (
            <section className="welcome">
              <h3>Join Marriage Life to explore profiles</h3>
              <p>Create an account or log in to continue.</p>
              <button type="button" onClick={() => setPage('signup')}>
                Get Started
              </button>
            </section>
          )}
        </>
      ) : (
        <>
          <nav className="profile-actions">
            <button type="button" onClick={() => setPage('dashboard')}>
              Home
            </button>
            <button type="button" onClick={() => setPage('profile')}>
              My Profile
            </button>
            <button type="button" onClick={() => setPage('explore')}>
              Find Matches
            </button>
          </nav>

          {page === 'profile' && (
            <ProfileForm
              key={profile?.$id || 'new-profile'}
              userId={user.$id}
              existingProfile={profile}
              onSaved={async () => {
                await loadApp(user);
                setPage('dashboard');
              }}
            />
          )}

          {page === 'explore' && (
            <ProfilesList
              profiles={profiles}
              currentUserId={user.$id}
            />
          )}

          {page === 'dashboard' && (
            <section className="welcome">
              <h2>Welcome, {profile?.name || user.name || 'Member'}! ❤️</h2>
              <p>
                {profile
                  ? 'Your account is ready. Explore profiles and find a match.'
                  : 'Create your profile to get started.'}
              </p>

              <button
                type="button"
                onClick={() => setPage(profile ? 'explore' : 'profile')}
              >
                {profile ? 'Explore Profiles' : 'Create My Profile'}
              </button>
            </section>
          )}
        </>
      )}

      <footer>
        <p>Marriage Life © 2026</p>
      </footer>
    </main>
  );
}
