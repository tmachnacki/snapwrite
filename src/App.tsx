import './globals.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './_auth/forms/AuthLayout';
import { SigninForm } from './_auth/forms/SigninForm';
import { SignupForm } from './_auth/forms/SignupForm';
import { RootLayout } from './_root/RootLayout';
import { Explore, Home, Profile, Saves } from './_root/pages';

import { Toaster } from '@/components/ui/sonner';
import { useAuthStore } from './store/authStore';

import { Loader2 } from 'lucide-react';

const App = () => {
  const authUser = useAuthStore((state) => state.user)

  return (
    <main className={`flex h-screen max-h-screen bg-slate-50 dark:bg-slate-950`}>
      {/* toaster */}
      <Toaster richColors closeButton loadingIcon={<Loader2 className='w-4 h-4' />} position='top-right' />

      <Routes>
        {/* protected */}
        <Route element={authUser ? <RootLayout /> : <Navigate to={"/sign-in"} />}>
          <Route index element={<Home />} />
          <Route path='/users/:username' element={<Profile/>} />
          <Route path='/saved' element={<Saves />} />
          <Route path='/explore' element={<Explore />} />
        </Route>

        {/* public */}
        <Route element={authUser ? <Navigate to="/" /> : <AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
      </Routes>
    </main>
  )
}

export { App };