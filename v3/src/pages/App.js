import { useEffect } from 'react';
import './App.css';
import { useGlobalState } from '../globalState';

export default function App() {
  const [globalState, ] = useGlobalState()

  console.log(process.env.REACT_APP_CLIENT_ID)

  useEffect(() => {
    document.title = globalState.meta.title
  })
  return (
    <div className="App">
      <p>This is the Main Page</p>
    </div>
  );
}
