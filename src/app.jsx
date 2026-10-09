import React, { useState, useEffect } from 'react';
import { account, databases, DB_ID, COLLECTIONS } from './appwrite';
import { ID, Query } from 'appwrite';

export default function App() {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('roman');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const current = await account.get();
      setUser(current);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await account.createEmailPasswordSession(email, password);
      const current = await account.get();
      setUser(current);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '50px', color: '#e91e63'}}>Loading...</div>;

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fff0f5', minHeight: '100vh', padding: '20px', color: '#333' }}>
      <header style={{ backgroundColor: '#e91e63', color: '#fff', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
        <h2>Marriage Life - Matrimonial App</h2>
      </header>

      <div style={{ maxWidth: '400px', margin: '30px auto', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        {!user ? (
          <div>
            <h3 style={{ color: '#e91e63', textAlign: 'center' }}>Login / Signup</h3>
            {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
              <button type="submit" style={{ background: '#e91e63', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#e91e63' }}>Welcome!</h3>
            <p>You are logged in successfully.</p>
            <button onClick={async () => { await account.deleteSession('current'); setUser(null); }} style={{ background: '#c2185b', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
 #e91e63', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{t[lang].myProfile}</button>
              <button onClick={() => setView('premium')} style={{ background: view === 'premium' ? '#e91e63' : '#fff', color: view === 'premium' ? '#fff' : '#e91e63', border: '1px solid #e91e63', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{t[lang].premium}</button>
              {user.email === 'admin@marriagelife.com' && (
                <button onClick={() => setView('admin')} style={{ background: view === 'admin' ? '#c2185b' : '#fff', color: view === 'admin' ? '#fff' : '#c2185b', border: '1px solid #c2185b', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{t[lang].admin}</button>
              )}
            </div>

            {view === 'home' && (
              <div>
                <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                  <select value={filterGender} onChange={(e) => { setFilterGender(e.target.value); fetchProfilesList(); }} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ddd', flex: 1 }}>
                    <option value="">All Genders / تمام اصناف</option>
                    <option value="Male">Male / مرد</option>
                    <option value="Female">Female / خاتون</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {profilesList.map((p) => (
                    <div key={p.$id} style={{ background: '#fff', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                      <h3 style={{ margin: '0 0 5px 0', color: '#e91e63' }}>{p.name}, {p.age}</h3>
                      <p style={{ margin: '3px 0', color: '#555', fontSize: '14px' }}>{p.city}, {p.country} | {p.occupation}</p>
                      <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#666' }}>{p.bio}</p>
                      <button onClick={() => alert('Interest Sent Successfully!')} style={{ marginTop: '10px', background: '#ffebee', color: '#e91e63', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>{t[lang].sendInterest}</button>
                    </div>
                  ))}
                  {profilesList.length === 0 && <p style={{ textAlign: 'center', color: '#777' }}>{t[lang].noProfiles}</p>}
                </div>
              </div>
            )}

            {view === 'profile' && (
              <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h3 style={{ color: '#e91e63', marginTop: 0 }}>{t[lang].myProfile}</h3>
                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                <form onSubmit={saveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input type="text" placeholder="Full Name / پورا نام" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                  <input type="number" placeholder="Age (18+) / عمر (18+)" value={age} onChange={(e) => setAge(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                  <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
                    <option value="Male">Male / مرد</option>
                    <option value="Female">Female / خاتون</option>
                  </select>
                  <input type="text" placeholder="City / شہر" value={city} onChange={(e) => setCity(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                  <input type="text" placeholder="Country / ملک" value={country} onChange={(e) => setCountry(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                  <input type="text" placeholder="Occupation / پیشہ" value={occupation} onChange={(e) => setOccupation(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                  <textarea placeholder="Biography / مختصر تعارف..." value={bio} onChange={(e) => setBio(e.target.value)} rows="3" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}></textarea>
                  <button type="submit" style={{ background: '#e91e63', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>{t[lang].save}</button>
                </form>
              </div>
            )}

            {view === 'premium' && (
              <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <h3 style={{ color: '#e91e63' }}>{t[lang].upgradeTitle}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
                  <div style={{ border: '1px solid #e91e63', padding: '12px', borderRadius: '8px' }}>
                    <h4>7 Days / 7 دن</h4>
                    <p>PKR 490</p>
                    <button onClick={() => alert('Payment request submitted!')} style={{ background: '#e91e63', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Select</button>
                  </div>
                  <div style={{ border: '1px solid #e91e63', padding: '12px', borderRadius: '8px' }}>
                    <h4>15 Days / 15 دن</h4>
                    <p>PKR 750</p>
                    <button onClick={() => alert('Payment request submitted!')} style={{ background: '#e91e63', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Select</button>
                  </div>
                  <div style={{ border: '1px solid #e91e63', padding: '12px', borderRadius: '8px' }}>
                    <h4>30 Days / 30 دن</h4>
                    <p>PKR 1000</p>
                    <button onClick={() => alert('Payment request submitted!')} style={{ background: '#e91e63', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Select</button>
                  </div>
                </div>
              </div>
            )}

            {view === 'admin' && user.email === 'admin@marriagelife.com' && (
              <div style={{ background: '#fff', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ color: '#c2185b', marginTop: 0 }}>{t[lang].adminTitle}</h3>
                <p>Payment Requests Count: {adminPayments.length}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
