import { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');


  // For memorisation 
  const passwordGenerator = useCallback(() => {
    let newPassword = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '~!@#$%^&*_-+=`|(){}[]:;<>,.?/';

    for (let i = 0; i < length; i++) {
      let randomCharIdx = Math.floor(Math.random() * str.length + 1);

      newPassword += str.charAt(randomCharIdx);
    }

    setPassword(newPassword);
  }, [numberAllowed, charAllowed, length, setPassword]);

  // any updates in dependencies, it re render that function(like passwordGenerator)
  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed, charAllowed, length]);

  return (
    <>
    <div className='parent'>

      <div className="title">
        <h1>Password Generator</h1>
      </div>
      <div className="child">
        <div className="input">
          <input
            className="length"
            type="text"
            placeholder="password"
            value={password}
            readOnly
          />
          <button className='btn-copy'>Copy</button>
        </div>
        <div className="set-values">
          <div>
            <input
              type="range"
              value={length}
              min={8}
              max={99}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={numberAllowed} onChange={() => {
              setNumberAllowed((prev) => !prev)
            }} /> <label>Number</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={charAllowed} onChange={() => {
              setCharAllowed((prev) => !prev)
            }} /> <label>Character</label>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    </>
  );
}

export default App;
