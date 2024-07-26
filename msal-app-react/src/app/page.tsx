'use server'
import NavBar from '../components/navbar.js';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation'


export default async function Dashboard() {
  const { data, error } = await createClient().auth.getUser()
  if (error || !data?.user) { redirect("/login") }
  return (
    <>
      <NavBar active={"Dashboard"} isAuth={"no"}/>
      <div className="container mx-auto pt-4">
        <p className="text-4xl font-black">Aurora Inns</p>
        <hr />
        <p>Welcome to Aurora Inns Administrative Portal</p>
        <p>This is the Landing Page, please use a tab in the top bar to navigate to an Administrative Page</p>
      </div>
    </>

  );
}
