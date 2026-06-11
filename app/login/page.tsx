import { redirect } from 'next/navigation';

// /login is no longer needed — landing page handles all auth flows
export default function LoginPage() {
  redirect('/');
}
