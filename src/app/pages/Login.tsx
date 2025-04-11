import { signInWithGoogle } from '../lib/firebaseAuth';

const Login: React.FC = () => {
    return (
        <section className="min-h-screen gradient-background flex items-center justify-center px-4">
            <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center text-white animate-fade-in">
                <div className="text-6xl mb-4">💬</div>
                <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Welcome to ChatRoom</h1>
                <p className="text-lg mb-6 text-white/80">Connect. Chat. Share. Instantly.</p>

                <button
                    onClick={signInWithGoogle}
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-pink-500/50"
                >
                    Sign in with Google 🚀
                </button>
            </div>
        </section>
    );
};

export default Login;
