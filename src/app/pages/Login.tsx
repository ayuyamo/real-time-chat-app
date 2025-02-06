import { signInWithGoogle } from '../lib/firebaseAuth';

const Login: React.FC = () => {
    return (
        <div>
            <h1>My Firebase App</h1>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
};

export default Login;