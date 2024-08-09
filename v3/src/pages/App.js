import './App.css';
import { useEffect } from 'react';
import { useGlobalState } from '../globalState';

export default function App() {
  const [globalState, ] = useGlobalState()

  useEffect(() => {
    document.title = globalState.meta.title
  })
  return (
    <main className="container mx-auto p-4">
        <section className="text-center my-8">
            <h2 className="text-4xl font-bold mb-4">Welcome to Aurora Inns</h2>
            <p className="text-lg">Your cozy neighborhood pub with the best drinks and food in town.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-2xl font-bold mb-2">Our Menu</h3>
                <p>Explore our wide range of drinks and delicious food.</p>
                <a href="https://thejmc.net/ididntexpectthat.mp4" className="text-green-700 hover:underline">View Menu</a>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-2xl font-bold mb-2">Upcoming Events</h3>
                <p>Join us for live music, trivia nights, and more.</p>
                <a href="https://thejmc.net/tisbutascratch.mp4" className="text-green-700 hover:underline">See Events</a>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
                <p>Have questions? Get in touch with us.</p>
                <a href="https://thejmc.net/importantvoicememo.mp3" className="text-green-700 hover:underline">Contact</a>
            </div>
        </section>
    </main>
  );
}
