import { signInWithGoogle } from '../lib/firebaseAuth';

const Login: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen gap-10'>
            <h1 className='text-3xl font-bold mb-4 transition-all duration-300 ease-in-out hover:text-shadow-halo'>
                Welcome to My Chat Room!
            </h1>
            <div className='relative inline-flex  group'>
                <div
                    className='absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt'>
                </div>
                <button onClick={signInWithGoogle}
                    className='relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'>
                    <svg className='mr-2 -ml-1 w-4 h-4' aria-hidden='true' focusable='false' data-prefix='fab' data-icon='google' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 488 512'><path fill='currentColor' d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'></path></svg>
                    Sign in with Google
                </button>
            </div>
        </div >
    );
};

export default Login;