import './App.css';
import { getEmail } from "../user"
import { useGlobalState } from '../globalState';


export default function Dashboard() {
    const [globalState, ] = useGlobalState()
  return (
    <div className="App">
      <p className='text-3xl font-bold'>Profile Page</p>
      <hr />
    <p>Your Email Address is {getEmail(globalState)}</p>
    </div>
  );
}
