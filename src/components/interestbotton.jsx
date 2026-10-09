
import React, { useState } from 'react';
import { sendInterest } from '../lib/interests.js';

export default function InterestButton({
  senderId,
  receiverId,
  onSent
}) {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSend(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendInterest({
        senderId,
        receiverId,
        message: message.trim()
      });

      setSuccess(true);
      setShowMessage(false);

      if (onSent) await onSent();
    } catch (err) {
      setError(err?.message || 'Could not send interest.');
    } finally {
      setLoading(false);
    }
  }

  if (!senderId || !receiverId || senderId === receiverId) {
    return null;
  }

  if (success) {
    return <p className="success-message">Interest sent successfully! ❤️</p>;
  }

  return (
    <div className="interest-action">
      {!showMessage ? (
        <button type="button" onClick={() => setShowMessage(true)}>
          Send Interest ❤️
        </button>
      ) : (
        <form onSubmit={handleSend}>
          <label>
            Optional message
            <textarea
              value={message}
              onChange={event => setMessage(event.target.value)}
              placeholder="Write a respectful message..."
              maxLength={300}
              rows={3}
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Confirm Interest'}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => setShowMessage(false)}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
  }
      
