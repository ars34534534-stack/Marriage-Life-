
import React, { useMemo, useState } from 'react';
import ProfileCard from './ProfileCard.jsx';

export default function ProfilesList({
  profiles = [],
  currentUserId,
  onInterest,
  onView
}) {
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('All');
  const [city, setCity] = useState('');

  const cities = useMemo(
    () => [...new Set(profiles.map(p => p.city).filter(Boolean))].sort(),
    [profiles]
  );

  const filteredProfiles = profiles.filter(profile => {
    if (profile.userId === currentUserId) return false;

    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      !searchText ||
      [profile.name, profile.city, profile.cast, profile.bio]
        .some(value => String(value || '').toLowerCase().includes(searchText));

    const matchesGender =
      gender === 'All' || profile.gender === gender;

    const matchesCity =
      !city || profile.city === city;

    return matchesSearch && matchesGender && matchesCity;
  });

  return (
    <section className="profiles-section">
      <h2>Find Your Life Partner ❤️</h2>
      <p>Explore profiles and find a compatible match.</p>

      <div className="profile-filters">
        <input
          type="search"
          placeholder="Search name, city or caste..."
          value={search}
          onChange={event => setSearch(event.target.value)}
          aria-label="Search profiles"
        />

        <select
          value={gender}
          onChange={event => setGender(event.target.value)}
          aria-label="Filter by gender"
        >
          <option value="All">All genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          value={city}
          onChange={event => setCity(event.target.value)}
          aria-label="Filter by city"
        >
          <option value="">All cities</option>
          {cities.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {filteredProfiles.length === 0 ? (
        <p className="empty-message">
          No matching profiles found. Try changing your filters.
        </p>
      ) : (
        <div className="profiles-grid">
          {filteredProfiles.map(profile => (
            <ProfileCard
              key={profile.$id || profile.userId}
              profile={profile}
              onInterest={onInterest}
              onView={onView}
            />
          ))}
        </div>
      )}
    </section>
  );
          }
                      
