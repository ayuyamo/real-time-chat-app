// import { signInWithGoogle } from '../lib/firebaseAuth';

// const Login: React.FC = () => {
//     return (
//         <div className='flex flex-col items-center justify-center h-screen gap-10'>
//             <h1 className='text-3xl font-bold mb-4 transition-all duration-300 ease-in-out hover:text-shadow-halo'>
//                 Welcome to My Chat Room!
//             </h1>
//             <div className='relative inline-flex  group'>
//                 <div
//                     className='absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt'>
//                 </div>
//                 <button onClick={signInWithGoogle}
//                     className='relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'>
//                     <svg className='mr-2 -ml-1 w-4 h-4' aria-hidden='true' focusable='false' data-prefix='fab' data-icon='google' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 488 512'><path fill='currentColor' d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'></path></svg>
//                     Sign in with Google
//                 </button>
//             </div>
//         </div >
//     );
// };

// export default Login;

// new loginpage interface
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
