import { useEffect, useState } from 'react';
import './App.css';
import { useGlobalState } from '../globalState';

export default function Dashboard() {
  const [globalState, ] = useGlobalState()
  const [catURL, setCatURL] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.title = `${globalState.meta.title} - Dashboard`;

    async function getCat() {
      if (!isLoading) {
        return
      }
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

    getCat()
  }, [])
  return (
    <div className="App">
      <p>This is the Dashboard</p>
      <div className="mx-auto h-80 w-80">
        <img src={catURL} alt="CATTO!" />
      </div>
    </div>
  );
}
