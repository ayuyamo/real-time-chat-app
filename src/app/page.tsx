'use client'; // use client-side code
import { signInWithGoogle } from "./components/firebaseAuth";
import { useAuth } from "./components/useAuth";

export default function HomePage() {
  const user = useAuth(); // get the current user

  if (user) return <div>Loading...</div>;

  return (
    <div>
      <h1>My Firebase App</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}
