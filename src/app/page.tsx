import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/login');
  // The redirect function handles the navigation, so no explicit return is needed here.
  // However, to satisfy linters or strict type checking that expect a JSX element,
  // you might return null or a loading indicator if the redirect were conditional.
  // For an unconditional redirect like this, it's fine.
}
