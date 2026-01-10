// SignUpForm.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import * as profileService from '../../services/profileService'
import { UserContext } from '../../contexts/UserContext';
import './SignUpForm.css'


const SignUpForm = ({ setProfile}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });
  const { setUser } = useContext(UserContext);

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try{const user = await authService.signUp(formData)
    setUser(user);
    const profile = await profileService.getMyProfile();
    if (profile) setProfile(profile);
    navigate('/dashboard')}
    catch(err){console.log(err)}
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="signup-container">
      <div className="signup-card">
        <h1>Sign Up</h1>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              value={username}
              name='username'
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              value={password}
              name='password'
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor='confirm'>Confirm Password:</label>
            <input
              type='password'
              id='confirm'
              value={passwordConf}
              name='passwordConf'
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" disabled={isFormInvalid()}>Sign Up</button>
            <button type="button" onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </div>
    </main>

  );
};

export default SignUpForm;
