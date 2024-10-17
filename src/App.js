import React from 'react';
import { useState } from 'react';

const App = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasseordStrength(newPassword);
};
  const checkPasseordStrength = (password) => {
    let strength = '';
    let error = '';
    const criteria = [
      { regex: /.{8,}/, error: 'at least 8 characters' },
      { regex: /[a-z]/, error: 'lowercase letter' },
      { regex: /[A-Z]/, error: 'uppercase letter' },
      { regex: /[0-9]/, error: 'number' },
      { regex: /[^A-Za-z0-9]/, error: 'special character' },
    ];

    const passedCriteria = criteria.filter((criterion) => criterion.regex.test(password));
    const passedcount = passedCriteria.length;
    if (passedcount === 5) {
      strength = 'Very Strong';
      error = '';
    } else if (passedcount === 4) {
      strength = 'Strong';
      error = `Need ${criteria.filter((criterion) => !criterion.regex.test(password)).map((criterion) => criterion.error).join(', ')}`;
    } else if (passedcount === 3) {
      strength = 'Medium';
      error = `Need ${criteria.filter((criterion) => !criterion.regex.test(password)).map((criterion) => criterion.error).join(', ')}`;
    } else{
      strength = 'Weak';
      error = `Need ${criteria.filter((criterion) => !criterion.regex.test(password)).map((criterion) => criterion.error).join(', ')}`;
    } 
   /*  switch (passedCriteria.length) {
      case 5 :
        strength = 'Very Strong';
        error = '';
        break;
      case 4 :
        strength = 'Strong';
        error = `Need ${criteria.filter((criterion) => !criterion.regex.test(password)).map((criterion) => criterion.error).join(', ')}`;
        break;
      case 3 :
        strength = 'Medium';
        error = `Need ${criteria.filter((criterion) => !criterion.regex.test(password)).map((criterion) => criterion.error).join(', ')}`;
        break;
      default:
        strength = 'Weak';
        error = `Need ${criteria.filter((criterion) => !criterion.regex.test(password)).map((criterion) => criterion.error).join(', ')}`;
        break;
    } */

    setStrength(strength);
    setError(error);
  };
  

  return(
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Password Strength Checker</h2>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your password"
        style={{ padding: '10px', fontSize: '16px', width: '100%' }}
      />
      <div style={{ marginTop: '10px', fontSize: '18px' }}>
        <strong>Password Strength: </strong> {strength}
        </div>
        <div style={{ marginTop: '10px', fontSize: '18px', color:'red' }}>
        {error}
      </div>
    </div>

  );
};

export default App;
