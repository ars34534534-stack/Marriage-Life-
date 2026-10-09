
import React, { useState } from 'react';
import { createProfile, updateProfile } from '../lib/profile.js';

const initialForm = {
  name: '',
  age: '',
  gender: '',
  city: '',
  height: '',
  cast: '',
  bio: '',
  photoUrl: ''
};

export default function ProfileForm({ userId, existingProfile, onSaved }) {
  const [form, setForm] = useState({
    ...initialForm,
    ...(existingProfile || {})
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function change(field, value) {
    setForm(previous => ({ ...previous, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!userId) throw new Error('Please login first.');

      if (existingProfile?.$id) {
        await updateProfile(existingProfile.$id, form);
      } else {
        await createProfile(userId, form);
      }

      setSuccess('Your profile has been saved!');
      if (onSaved) await onSaved();
    } catch (err) {
      setError(err?.message || 'Could not save your profile.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="profile-card">
      <h2>{existingProfile ? 'Edit Your Profile' : 'Create Your Profile'}</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            value={form.name}
            onChange={e => change('name', e.target.value)}
            required
          />
        </label>

        <label>
          Age
          <input
            type="number"
            min="18"
            max="100"
            value={form.age}
            onChange={e => change('age', e.target.value)}
            required
          />
        </label>

        <label>
          Gender
          <select
            value={form.gender}
            onChange={e => change('gender', e.target.value)}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>

        <label>
          City
          <input
            value={form.city}
            onChange={e => change('city', e.target.value)}
            placeholder="Your city"
            required
          />
        </label>

        <label>
          Height
          <input
            value={form.height}
            onChange={e => change('height', e.target.value)}
            placeholder="e.g. 5 ft 6 in"
          />
        </label>

        <label>
          Caste / برادری
          <input
            value={form.cast}
            onChange={e => change('cast', e.target.value)}
            placeholder="Write your caste or biradari"
          />
        </label>

        <label>
          About You
          <textarea
            value={form.bio}
            onChange={e => change('bio', e.target.value)}
            placeholder="Tell others about yourself"
            rows={4}
          />
        </label>

        {error && <p className="auth-error">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </section>
  );
          }
               
