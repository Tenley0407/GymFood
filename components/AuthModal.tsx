import React, { useState } from 'react';
import { X, Facebook, Apple, MessageSquare, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'SIGN_IN' | 'SIGN_UP'>('SIGN_UP');
  const [showVerification, setShowVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'SIGN_UP') {
      setShowVerification(true);
    } else {
      // Simulate login and close
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2070&auto=format&fit=crop" 
                alt="Healthy Meal Prep" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>
        </div>

        {/* Modal Card */}
        <div className="relative z-10 bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
                <h3 className="font-bold text-xl text-gray-900">Sign in or Sign up</h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-gray-500" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 scrollbar-hide">
                
                {/* Toggle Switch */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-gray-100 p-1.5 rounded-full w-full max-w-[280px]">
                        <button 
                            onClick={() => setMode('SIGN_IN')}
                            className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${mode === 'SIGN_IN' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Sign In
                        </button>
                        <button 
                            onClick={() => setMode('SIGN_UP')}
                            className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${mode === 'SIGN_UP' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'SIGN_UP' && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
                            <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="John Doe" />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                        <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="name@example.com" />
                    </div>

                    <div>
                         <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number</label>
                         <div className="flex">
                            <div className="relative">
                                <select className="appearance-none bg-gray-50 border border-gray-200 text-gray-900 py-3 pl-3 pr-8 rounded-l-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none h-full font-semibold border-r-0 w-[100px]">
                                    <option value="+60">🇲🇾 +60</option>
                                    <option value="+1">🇺🇸 +1</option>
                                    <option value="+65">🇸🇬 +65</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                            <input type="tel" required className="flex-1 px-4 py-3 rounded-r-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-gray-50 focus:bg-white" placeholder="12 345 6789" />
                         </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                        <input 
                            type={showPassword ? "text" : "password"}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-gray-50 focus:bg-white pr-14" 
                            placeholder="At least 10 characters"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[36px] text-gray-500 hover:text-gray-700 font-semibold text-xs px-2 py-1"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <div className="text-xs text-gray-500 mt-2 leading-relaxed">
                        By tapping “Sign Up” or “Continue with...”, you agree to MacroMate's <a href="#" className="text-red-600 hover:underline">Terms</a> and <a href="#" className="text-red-600 hover:underline">Privacy Policy</a>.
                    </div>

                    <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-200 transition-transform active:scale-[0.99] mt-2">
                        {mode === 'SIGN_UP' ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-white text-gray-500 font-medium">or</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-3 bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold py-3 rounded-xl transition-colors relative shadow-sm">
                        <div className="bg-white p-1 rounded-full absolute left-1.5 h-9 w-9 flex items-center justify-center">
                             <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        </div>
                        <span className="ml-6">Continue with Google</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold py-3 rounded-xl transition-colors relative shadow-sm">
                        <Facebook className="w-6 h-6 absolute left-3" fill="white" />
                        <span className="ml-6">Continue with Facebook</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-colors relative shadow-sm">
                        <Apple className="w-6 h-6 absolute left-3" fill="white" />
                        <span className="ml-6">Continue with Apple</span>
                    </button>
                </div>
            </div>

            {/* Verification Overlay */}
            {showVerification && (
                <div className="absolute inset-0 bg-white/98 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-8 animate-in fade-in slide-in-from-bottom-8 duration-300">
                    <div className="bg-red-50 p-4 rounded-full mb-6 relative">
                        <MessageSquare className="w-10 h-10 text-red-600" />
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                            <CheckCircle2 className="w-6 h-6 text-green-500" fill="white" />
                        </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Phone Verification</h3>
                    <p className="text-gray-500 text-center mb-10 leading-relaxed">
                        We've sent a 6-digit verification code to <br/>
                        <span className="font-bold text-gray-800 text-lg">+60 12-345 6789</span>
                    </p>

                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Enter 6-digit code</label>
                    <input 
                        type="text" 
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="000000"
                        className="text-center text-4xl tracking-[0.4em] font-bold w-full max-w-[280px] bg-gray-50 border border-gray-200 rounded-xl focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none py-3 mb-8 transition-all text-gray-800 placeholder-gray-200"
                        maxLength={6}
                        autoFocus
                    />

                    <div className="text-sm text-gray-500 mb-8">
                        Didn't receive code? <button className="text-red-600 font-bold hover:underline ml-1">Resend Code (24s)</button>
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                        <button 
                            onClick={() => {
                                setShowVerification(false);
                                onClose();
                            }}
                            className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-200 transition-all active:scale-[0.98]"
                        >
                            Submit
                        </button>
                        <button 
                            onClick={() => setShowVerification(false)}
                            className="w-full py-4 rounded-xl text-gray-500 font-bold hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};
