
import React from 'react';

export default function ProfileCard({ profile, onInterest, onView }) {
  if (!profile) return null;

  return (
    <article className="profile-card">
      <div className="profile-card-header">
        {profile.photoUrl ? (
          <img
            className="profile-avatar"
            src={profile.photoUrl}
            alt={`${profile.name || 'Member'} profile`}
          />
        ) : (
          <div className="profile-avatar profile-placeholder">
            ❤️
          </div>
        )}

        <div>
          <h3>{profile.name || 'Marriage Life Member'}</h3>
          <p>{profile.age ? `${profile.age} years old` : 'Age not added'}</p>
          {profile.isVerified && (
            <span className="verified-badge">✓ Verified</span>
          )}
        </div>
      </div>

      <div className="profile-details">
        {profile.city && <p><strong>City:</strong> {profile.city}</p>}
        {profile.height && <p><strong>Height:</strong> {profile.height}</p>}
        {profile.cast && <p><strong>Caste:</strong> {profile.cast}</p>}
      </div>

      {profile.bio && <p className="profile-bio">{profile.bio}</p>}

      <div className="profile-actions">
        {onView && (
          <button type="button" className="secondary-button" onClick={() => onView(profile)}>
            View Profile
          </button>
        )}

        {onInterest && (
          <button type="button" onClick={() => onInterest(profile)}>
            Send Interest ❤️
          </button>
        )}
      </div>
    </article>
  );
}
