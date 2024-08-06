import { useEffect, useState } from 'react';
import './App.css';
import { useGlobalState } from '../globalState';
import LoadingSpinner from '../components/loadingSpinner';

export default function Dashboard() {
  const [globalState, ] = useGlobalState()
  const [catURL, setCatURL] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  async function getCat() {
    setIsLoading(true)
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }
        const data = await response.json();
        const url = data[0].url;
        console.log(url)
        setCatURL(url);
    } catch (error) {
        console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    document.title = `${globalState.meta.title} - Dashboard`;
  });


  useEffect(() => {
    getCat()
  }, [])
  
  return (
    <div className="App">
      <p className='text-3xl font-bold'>Dashboard</p>
      <hr />
      <button 
      type="button" 
      className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2"
      onClick={getCat}
      >New Cat</button>
      <div className="mx-auto h-80 w-80 pt-2">
        {isLoading ? <LoadingSpinner /> : <img className='object-contain' src={catURL} alt="CATTO!" />}
      </div>
    </div>
  );
}
