import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, BarChart2, User, ChevronRight, Lock, CheckCircle, Menu, X, LogOut, Medal } from 'lucide-react';
import { UNITS } from './constants';
import { Unit, Lesson, LessonType, UserProgress, UserProfile } from './types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { evaluateSpeaking } from './services/geminiService';

// --- Helper Data for Leaderboard ---
const MOCK_LEADERBOARD = [
  { name: 'Nguyen Van An', className: '9A', xp: 2150 },
  { name: 'Tran Thi Bao', className: '9B', xp: 1980 },
  { name: 'Le Hoang Nam', className: '9A', xp: 1850 },
  { name: 'Pham Minh Anh', className: '9C', xp: 1720 },
  { name: 'Doan Thu Ha', className: '9A', xp: 1600 },
];

// --- Sub-components ---

// 1. Login Screen
const LoginScreen = ({ onLogin }: { onLogin: (name: string, className: string) => void }) => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('9A');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name, className);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🎓</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">Welcome Back!</h1>
          <p className="text-gray-500 mt-2">Global Success 9 English App</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
              placeholder="Enter your name (e.g. Nguyen Van A)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Class</label>
            <select
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none bg-white"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            >
              {['9A', '9B', '9C', '9D', '9E'].map(c => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1"
          >
            Start Learning 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

// 2. Sidebar
const Sidebar = ({ activeTab, setActiveTab, mobileOpen, setMobileOpen, user, onLogout }: any) => {
  const menuItems = [
    { id: 'dashboard', icon: BookOpen, label: 'Learning Path' },
    { id: 'leaderboard', icon: Trophy, label: 'Class Leaderboard' },
    { id: 'progress', icon: BarChart2, label: 'My Progress' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const sidebarClass = `fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
    mobileOpen ? 'translate-x-0' : '-translate-x-full'
  } md:relative md:translate-x-0 flex flex-col`;

  return (
    <div className={sidebarClass}>
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <span className="bg-primary text-white p-1 rounded">GS</span> English 9
        </h1>
        <button onClick={() => setMobileOpen(false)} className="md:hidden">
          <X size={24} />
        </button>
      </div>

      {/* User Info in Sidebar */}
      <div className="px-6 mb-6">
        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
            {user?.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-gray-800 text-sm truncate">{user?.name}</p>
            <p className="text-xs text-gray-500">Class {user?.className}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setMobileOpen(false);
            }}
            className={`w-full flex items-center px-6 py-4 text-left transition-colors ${
              activeTab === item.id
                ? 'bg-indigo-50 text-primary border-r-4 border-primary'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <item.icon className="mr-3" size={20} />
            <span className="font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-6">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition font-bold text-sm"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

// 3. Leaderboard View
const LeaderboardView = ({ user, currentXP }: { user: UserProfile, currentXP: number }) => {
  // Merge current user with mock data for display
  const allStudents = [
    ...MOCK_LEADERBOARD,
    { name: user.name, className: user.className, xp: currentXP, isUser: true }
  ];

  // Remove duplicates if user exists in mock (simulated simple logic) and sort
  const uniqueStudents = Array.from(new Map(allStudents.map(item => [item.name, item])).values());
  const sortedStudents = uniqueStudents.sort((a, b) => b.xp - a.xp);

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800">Class Leaderboard 🏆</h1>
        <p className="text-gray-500 mt-2">Top students in Class {user.className}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Rank</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Student</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Class</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sortedStudents.map((student, index) => {
                const rank = index + 1;
                const isCurrentUser = (student as any).isUser;
                return (
                  <tr 
                    key={index} 
                    className={`transition-colors ${isCurrentUser ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {rank === 1 && <Medal className="text-yellow-400 mr-2" size={24} />}
                        {rank === 2 && <Medal className="text-gray-400 mr-2" size={24} />}
                        {rank === 3 && <Medal className="text-amber-600 mr-2" size={24} />}
                        <span className={`font-bold ${rank <= 3 ? 'text-gray-800' : 'text-gray-500'}`}>#{rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 text-sm ${isCurrentUser ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                          {student.name.charAt(0)}
                        </div>
                        <span className={`font-medium ${isCurrentUser ? 'text-indigo-700 font-bold' : 'text-gray-900'}`}>
                          {student.name} {isCurrentUser && '(You)'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.className}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-indigo-600">
                      {student.xp.toLocaleString()} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 4. Vocabulary Lesson
const VocabView = ({ content, onComplete }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const word = content.vocabulary[currentIndex];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const nextCard = () => {
    setFlipped(false);
    if (currentIndex < content.vocabulary.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto py-10">
      <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden h-96 relative perspective-1000">
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d flex flex-col items-center justify-center p-8 text-center ${flipped ? 'rotate-y-180' : ''}`} onClick={() => setFlipped(!flipped)}>
            
            {!flipped ? (
              // Front
              <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden">
                <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full mb-4 font-bold">{word.partOfSpeech}</span>
                <h2 className="text-5xl font-extrabold text-gray-800 mb-6">{word.word}</h2>
                <button 
                  onClick={(e) => { e.stopPropagation(); speak(word.word); }}
                  className="p-3 bg-indigo-50 rounded-full hover:bg-indigo-100 transition text-primary"
                >
                  🔊 Listen
                </button>
                <p className="mt-8 text-gray-400 text-sm">Tap to flip</p>
              </div>
            ) : (
               // Back
              <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
                <h3 className="text-2xl text-secondary font-bold mb-2">{word.meaning}</h3>
                <div className="w-16 h-1 bg-gray-100 rounded mb-4"></div>
                <p className="text-gray-600 italic text-lg mb-6">"{word.example}"</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); speak(word.example); }}
                  className="text-sm text-primary underline"
                >
                  Listen to example
                </button>
              </div>
            )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between w-full items-center">
        <div className="text-gray-500 font-semibold">Word {currentIndex + 1} of {content.vocabulary.length}</div>
        <button 
          onClick={nextCard}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg flex items-center gap-2"
        >
          {currentIndex === content.vocabulary.length - 1 ? 'Finish' : 'Next Word'} <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

// 5. Quiz/Grammar View
const QuizView = ({ content, onComplete }: any) => {
  const questions = content.quiz || content.listening?.questions || [];
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const handleCheck = () => {
    if (!selected) return;
    const correct = questions[currentQ].correctAnswer === selected;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setIsCorrect(null);
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  if (questions.length === 0) return <div>No questions available.</div>;

  const q = questions[currentQ];

  return (
    <div className="max-w-2xl mx-auto py-8">
      {content.listening && (
         <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
           <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-blue-500 rounded-full text-white"><BookOpen size={16}/></div>
             <h3 className="font-bold text-blue-800">Transcript (Listening Practice)</h3>
           </div>
           <p className="text-blue-900 text-sm leading-relaxed">{content.listening.audioScript}</p>
           <button 
             onClick={() => {
                const u = new SpeechSynthesisUtterance(content.listening.audioScript);
                u.lang = 'en-US';
                window.speechSynthesis.speak(u);
             }}
             className="mt-3 text-xs bg-white border border-blue-200 px-3 py-1 rounded shadow-sm text-blue-600 font-bold"
           >
             ▶ Play Audio
           </button>
         </div>
      )}

      {content.grammarRule && (
        <div className="mb-6 bg-amber-50 p-6 rounded-xl border border-amber-100">
           <h3 className="font-bold text-amber-800 text-lg mb-2">Grammar Rule</h3>
           <p className="text-gray-700 whitespace-pre-line">{content.grammarRule}</p>
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{currentQ + 1}. {q.question}</h3>
        <div className="space-y-3">
          {q.options.map((opt: string) => (
            <button
              key={opt}
              onClick={() => !isCorrect && setSelected(opt)}
              disabled={isCorrect !== null}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all font-medium ${
                selected === opt 
                  ? (isCorrect === null ? 'border-primary bg-indigo-50 text-primary' : (isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700'))
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        
        {selected && isCorrect === null && (
          <button onClick={handleCheck} className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-indigo-700">
            Check Answer
          </button>
        )}

        {isCorrect !== null && (
          <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="font-bold mb-2">{isCorrect ? 'Correct! 🎉' : 'Incorrect 😔'}</p>
            {!isCorrect && <p>The correct answer is: <strong>{q.correctAnswer}</strong></p>}
            <button onClick={handleNext} className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl font-bold">
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 6. Speaking View
const SpeakingView = ({ content, onComplete }: any) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<{score: number, feedback: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser. Try Chrome.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecording(true);
    setTranscript('');
    setFeedback(null);

    recognition.start();

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      setIsRecording(false);
    };
  };

  const handleEvaluate = async () => {
    setLoading(true);
    const result = await evaluateSpeaking(content.speaking.topic, transcript);
    setFeedback(result);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-accent">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Speaking Topic</h2>
        <h3 className="text-xl text-primary font-bold mb-4">{content.speaking.topic}</h3>
        <p className="text-gray-600 mb-6">{content.speaking.description}</p>
        
        <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-200">
           <p className="text-xs font-bold text-gray-500 uppercase mb-2">Sample Response</p>
           <p className="text-gray-700 italic">"{content.speaking.sampleResponse}"</p>
           <button onClick={() => {
              const u = new SpeechSynthesisUtterance(content.speaking.sampleResponse);
              u.lang = 'en-US';
              window.speechSynthesis.speak(u);
           }} className="mt-2 text-xs text-primary font-bold">🔊 Listen to sample</button>
        </div>

        <div className="flex flex-col items-center justify-center py-6">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all ${isRecording ? 'bg-red-500 animate-pulse ring-4 ring-red-200' : 'bg-primary hover:bg-indigo-700'}`} onClick={isRecording ? undefined : startRecording}>
             <span className="text-4xl">🎙️</span>
          </div>
          <p className="mt-4 text-gray-500 font-medium">{isRecording ? 'Listening...' : 'Tap to Record'}</p>
        </div>

        {transcript && (
          <div className="mt-6">
            <p className="font-bold text-gray-700 mb-2">Your Answer:</p>
            <div className="p-4 bg-gray-100 rounded-lg text-gray-800 border border-gray-200">
              "{transcript}"
            </div>
            {!feedback && !loading && (
              <button onClick={handleEvaluate} className="w-full mt-4 bg-secondary text-white py-3 rounded-xl font-bold shadow-md hover:bg-emerald-600">
                Analyze with AI
              </button>
            )}
            {loading && <p className="text-center mt-4 text-gray-500">Analyzing pronunciation and grammar...</p>}
          </div>
        )}

        {feedback && (
          <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100 animate-fade-in">
             <div className="flex justify-between items-center mb-4">
               <h4 className="font-bold text-indigo-900">AI Feedback</h4>
               <span className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full font-bold text-sm">Score: {feedback.score}/100</span>
             </div>
             <p className="text-indigo-800 mb-6">{feedback.feedback}</p>
             <button onClick={onComplete} className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow hover:bg-indigo-700">
               Complete Lesson
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  
  // Progress State
  const [progress, setProgress] = useState<UserProgress>({
    totalXP: 0,
    completedLessons: [],
    completedUnits: [],
    streakDays: 1,
    badges: []
  });

  // Load User & Progress from LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('gs9_user');
    const savedProgress = localStorage.getItem('gs9_progress');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save Progress whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('gs9_progress', JSON.stringify(progress));
    }
  }, [progress, user]);

  const handleLogin = (name: string, className: string) => {
    const newUser = { name, className };
    setUser(newUser);
    localStorage.setItem('gs9_user', JSON.stringify(newUser));
    // Check if there was saved progress for this specific user flow (simplified here to just global)
    // In a real app, you'd key progress by user ID.
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gs9_user');
    setActiveTab('dashboard');
    setSelectedUnit(null);
    setSelectedLesson(null);
  };

  const handleCompleteLesson = (score?: number) => {
    if (selectedLesson) {
      setProgress(prev => {
        // Prevent duplicate XP for same lesson if desired, but for fun we add it
        // Or check if included
        const isNew = !prev.completedLessons.includes(selectedLesson.id);
        return {
          ...prev,
          totalXP: prev.totalXP + selectedLesson.xpReward,
          completedLessons: isNew ? [...prev.completedLessons, selectedLesson.id] : prev.completedLessons
        }
      });
      setSelectedLesson(null); // Go back to unit view
    }
  };

  // --- Render Views ---

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (selectedLesson) {
      return (
        <div className="h-full flex flex-col">
          <button 
            onClick={() => setSelectedLesson(null)} 
            className="mb-4 text-gray-500 hover:text-primary font-bold flex items-center w-fit"
          >
            ← Back to Unit
          </button>
          <div className="flex-1 overflow-y-auto pb-20">
             <h1 className="text-3xl font-bold text-center mb-2">{selectedLesson.title}</h1>
             <div className="w-20 h-1 bg-accent mx-auto rounded mb-8"></div>
             
             {selectedLesson.type === LessonType.VOCABULARY && <VocabView content={selectedLesson.content} onComplete={handleCompleteLesson} />}
             {(selectedLesson.type === LessonType.GRAMMAR || selectedLesson.type === LessonType.PRONUNCIATION || selectedLesson.type === LessonType.LISTENING || selectedLesson.type === LessonType.QUIZ) && 
                <QuizView content={selectedLesson.content} onComplete={handleCompleteLesson} />
             }
             {selectedLesson.type === LessonType.SPEAKING && <SpeakingView content={selectedLesson.content} onComplete={handleCompleteLesson} />}
          </div>
        </div>
      );
    }

    if (selectedUnit) {
      return (
        <div>
           <button onClick={() => setSelectedUnit(null)} className="mb-6 text-gray-500 hover:text-primary font-bold flex items-center">
            ← Back to Dashboard
          </button>
          <div className="bg-gradient-to-r from-primary to-indigo-500 p-8 rounded-3xl text-white shadow-lg mb-8">
            <span className="text-indigo-200 font-bold uppercase tracking-widest text-sm">Unit {selectedUnit.number}</span>
            <h1 className="text-4xl font-extrabold mt-2 mb-4">{selectedUnit.title}</h1>
            <p className="text-indigo-100 text-lg max-w-2xl">{selectedUnit.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedUnit.lessons.map((lesson, idx) => {
               const isLocked = idx > 0 && !progress.completedLessons.includes(selectedUnit.lessons[idx-1].id);
               // Unlock all for demo
               const actuallyLocked = false; 
               const isCompleted = progress.completedLessons.includes(lesson.id);

               return (
                 <button 
                  key={lesson.id}
                  disabled={actuallyLocked}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`group relative p-6 rounded-2xl border-2 text-left transition-all ${
                    isCompleted 
                      ? 'bg-green-50 border-green-200' 
                      : (actuallyLocked ? 'bg-gray-100 border-transparent opacity-70 cursor-not-allowed' : 'bg-white border-transparent hover:border-indigo-200 shadow-sm hover:shadow-md')
                  }`}
                 >
                   <div className="flex justify-between items-start mb-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                       lesson.type === LessonType.VOCABULARY ? 'bg-purple-100 text-purple-600' :
                       lesson.type === LessonType.GRAMMAR ? 'bg-blue-100 text-blue-600' :
                       lesson.type === LessonType.SPEAKING ? 'bg-orange-100 text-orange-600' : 
                       'bg-gray-100 text-gray-600'
                     }`}>
                       {lesson.type}
                     </span>
                     {isCompleted ? <CheckCircle size={20} className="text-green-500" /> : <span className="text-gray-300 font-bold">+{lesson.xpReward} XP</span>}
                   </div>
                   <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{lesson.title}</h3>
                   {actuallyLocked && <Lock className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" size={32} />}
                 </button>
               );
            })}
          </div>
        </div>
      );
    }

    if (activeTab === 'dashboard') {
      return (
        <div className="pb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800">Hello, {user.name}! 👋</h1>
              <p className="text-gray-500 mt-2">Ready to continue your Global Success journey?</p>
            </div>
            <div className="hidden md:flex gap-4">
               <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Streak</p>
                    <p className="font-bold text-gray-800">{progress.streakDays} Days</p>
                  </div>
               </div>
               <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Total XP</p>
                    <p className="font-bold text-gray-800">{progress.totalXP}</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
             {UNITS.map((unit) => (
               <div key={unit.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow">
                 <div className="w-full md:w-32 h-32 bg-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl font-extrabold text-indigo-300">#{unit.number}</span>
                 </div>
                 <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{unit.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{unit.description}</p>
                    <div className="flex gap-3 mt-auto">
                      <button 
                        onClick={() => setSelectedUnit(unit)}
                        className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 transition"
                      >
                        Start Unit
                      </button>
                    </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'leaderboard') {
      return <LeaderboardView user={user} currentXP={progress.totalXP} />;
    }

    if (activeTab === 'progress') {
        const data = [
            { name: 'Mon', xp: 400 },
            { name: 'Tue', xp: 300 },
            { name: 'Wed', xp: 200 },
            { name: 'Thu', xp: 278 },
            { name: 'Fri', xp: 189 },
            { name: 'Sat', xp: 239 },
            { name: 'Sun', xp: 349 },
        ];
        return (
            <div className="h-full flex flex-col">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8">My Progress</h1>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 h-80">
                    <h3 className="font-bold text-gray-700 mb-4">Weekly XP Activity</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: '#EEF2FF'}} />
                            <Bar dataKey="xp" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="bg-white p-4 rounded-2xl text-center border border-gray-100">
                      <div className="text-3xl mb-2">🏆</div>
                      <div className="font-bold text-gray-800">Rank #12</div>
                      <div className="text-xs text-gray-500">Class Leaderboard</div>
                   </div>
                   <div className="bg-white p-4 rounded-2xl text-center border border-gray-100">
                      <div className="text-3xl mb-2">🎯</div>
                      <div className="font-bold text-gray-800">85%</div>
                      <div className="text-xs text-gray-500">Avg. Quiz Score</div>
                   </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center h-full text-gray-400 font-bold text-xl">
            Profile Settings Coming Soon...
        </div>
    )
  };

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab: string) => {
            setActiveTab(tab);
            setSelectedUnit(null);
            setSelectedLesson(null);
        }}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        user={user}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="md:hidden bg-white p-4 shadow-sm flex items-center justify-between z-20">
          <h1 className="font-bold text-primary">GS English 9</h1>
          <button onClick={() => setMobileOpen(true)}>
             <Menu />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
           {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
