import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      nav('/login');
    } catch (err) {
      setMsg(err.response?.data.message || 'Error registering');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <p className="error">{msg}</p>
      <form onSubmit={onSubmit}>
        <input required placeholder="Name" value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} />
        <input type="email" required placeholder="Email" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})} />
        <input type="password" required placeholder="Password" value={form.password}
          onChange={e => setForm({...form, password: e.target.value})} />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
