import React, { useState, useEffect } from 'react';
import { account, databases, storage, DB_ID, COLLECTIONS } from './appwrite';
import { ID, Query } from 'appwrite';

export default function App() {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('roman'); // 'roman', 'ur', 'en', 'ar'
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('home'); // home, profile, requests, admin, premium
  
  // Auth Form States
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Profile Form States
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [occupation, setOccupation] = useState('');
  const [bio, setBio] = useState('');

  // Profiles List & Filters
  const [profilesList, setProfilesList] = useState([]);
  const [filterGender, setFilterGender] = useState('');

  // Admin State
  const [adminPayments, setAdminPayments] = useState([]);

  // Multi-Language Dictionary
  const t = {
    roman: {
      title: 'Marriage Life - Rishta App',
      login: 'Login Karein',
      signup: 'Naya Account Banayein',
      email: 'Email Address',
      password: 'Password',
      logout: 'Logout',
      profiles: 'Rishtay Talash Karein',
      myProfile: 'Meri Profile',
      requests: 'Darkhwastein (Requests)',
      admin: 'Admin Panel',
      premium: 'Premium Packages',
      save: 'Profile Mehfooz Karein',
      ageCheck: 'Aap ki umar kam az kam 18 saal honi chahiye.',
      noProfiles: 'Koi profile nahi mili.',
      sendInterest: 'Dilchaspi (Interest) Bhejin',
      upgradeTitle: 'Premium Member Banein',
      adminTitle: 'Secure Admin Dashboard',
    },
    ur: {
      title: 'شادی لائف - رشتہ ڈاٹ کام',
      login: 'لاگ ان کریں',
      signup: 'نیا اکاؤنٹ بنائیں',
      email: 'ای میل ایڈریس',
      password: 'پاسورڈ',
      logout: 'لاگ آؤٹ',
      profiles: 'رشتے تلاش کریں',
      myProfile: 'میری پروفائل',
      requests: 'درخواستیں',
      admin: 'ایڈمن پینل',
      premium: 'پریمیم پیکجز',
      save: 'پروفائل محفوظ کریں',
      ageCheck: 'آپ کی عمر کم از کم 18 سال ہونی چاہئے۔',
      noProfiles: 'کوئی پروفائل نہیں ملی۔',
      sendInterest: 'رشتہ کی درخواست بھیجیں',
      upgradeTitle: 'پریمیم میں اپ گریڈ کریں',
      adminTitle: 'محفوظ ایڈمن ڈیش بورڈ',
    },
    en: {
      title: 'Marriage Life Matrimonial',
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email Address',
      password: 'Password',
      logout: 'Logout',
      profiles: 'Find Profiles',
      myProfile: 'My Profile',
      requests: 'Requests',
      admin: 'Admin Panel',
      premium: 'Premium Packages',
      save: 'Save Profile',
      ageCheck: 'You must be at least 18 years old to register.',
      noProfiles: 'No profiles found.',
      sendInterest: 'Send Interest',
      upgradeTitle: 'Upgrade to Premium',
      adminTitle: 'Secure Admin Dashboard',
    },
    ar: {
      title: 'حياة الزواج - تطبيق الزواج',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب جديد',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      logout: 'تسجيل الخروج',
      profiles: 'البحث عن ملفات',
      myProfile: 'ملفي الشخصي',
      requests: 'الطلبات',
      admin: 'لوحة التحكم',
      premium: 'الباقات المميزة',
      save: 'حفظ الملف الشخصي',
      ageCheck: 'يجب أن يكون عمرك 18 عاماً على الأقل.',
      noProfiles: 'لم يتم العثور على ملفات شخصية.',
      sendInterest: 'إرسال اهتمام',
      upgradeTitle: 'الترقية إلى الباقة المميزة',
      adminTitle: 'لوحة تحكم المسؤول',
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const current = await account.get();
      setUser(current);
      fetchProfile(current.$id);
      fetchProfilesList();
      if (current.email === 'admin@marriagelife.com') {
        fetchAdminData();
      }
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
      if (isLogin) {
        await account.createEmailPasswordSession(email, password);
      } else {
        await account.create(ID.unique(), email, password);
        await account.createEmailPasswordSession(email, password);
      }
      await checkUser();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await account.deleteSession('current');
    setUser(null);
    setProfile(null);
  };

  const fetchProfile = async (userId) => {
    try {
      const res = await databases.listDocuments(DB_ID, COLLECTIONS.PROFILES, [
        Query.equal('userId', userId)
      ]);
      if (res.documents.length > 0) {
        setProfile(res.documents[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProfilesList = async () => {
    try {
      let queries = [];
      if (filterGender) queries.push(Query.equal('gender', filterGender));
      const res = await databases.listDocuments(DB_ID, COLLECTIONS.PROFILES, queries);
      setProfilesList(res.documents);
    } catch (err) {
      console.error(err);
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    if (age < 18) {
      setError(t[lang].ageCheck);
      return;
    }
    try {
      const data = { userId: user.$id, name, age: Number(age), gender, city, country, occupation, bio };
      if (profile) {
        await databases.updateDocument(DB_ID, COLLECTIONS.PROFILES, profile.$id, data);
      } else {
        await databases.createDocument(DB_ID, COLLECTIONS.PROFILES, ID.unique(), data);
      }
      fetchProfile(user.$id);
      alert('Success!');
      setView('home');
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchAdminData = async () => {
    try {
      const pRes = await databases.listDocuments(DB_ID, COLLECTIONS.PAYMENTS);
      setAdminPayments(pRes.documents);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '50px', color: '#e91e63'}}>Loading...</div>;

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fff0f5', minHeight: '100vh', color: '#333', paddingBottom: '40px', direction: lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr' }}>
      
      {/* Header */}
      <header style={{ backgroundColor: '#e91e63', color: '#fff', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>{t[lang].title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ background: '#fff', color: '#e91e63', border: 'none', padding: '5px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
            <option value="roman">Roman Urdu</option>
            <option value="ur">اردو</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>

          {user && (
            <button onClick={handleLogout} style={{ background: '#c2185b', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}>
              {t[lang].logout}
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '0 15px' }}>
        {!user ? (
          <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(233,30,99,0.15)' }}>
            <h3 style={{ color: '#e91e63', textAlign: 'center', marginTop: 0 }}>{isLogin ? t[lang].login : t[lang].signup}</h3>
            {error && <p style={{ color: 'red', fontSize: '14px', background: '#ffebee', padding: '8px', borderRadius: '4px' }}>{error}</p>}
            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="email" placeholder={t[lang].email} value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
              <input type="password" placeholder={t[lang].password} value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
              <button type="submit" style={{ background: '#e91e63', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
                {isLogin ? t[lang].login : t[lang].signup}
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#666', cursor: 'pointer' }} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Account nahi hai? Sign Up karein" : "Pehle se account hai? Login"}
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '5px' }}>
              <button onClick={() => setView('home')} style={{ background: view === 'home' ? '#e91e63' : '#fff', color: view === 'home' ? '#fff' : '#e91e63', border: '1px solid #e91e63', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{t[lang].profiles}</button>
              <button onClick={() => setView('profile')} style={{ background: view === 'profile' ? '#e91e63' : '#fff', color: view === 'profile' ? '#fff' : '#e91e63', border: '1px solid #e91e63', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{t[lang].myProfile}</button>
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
