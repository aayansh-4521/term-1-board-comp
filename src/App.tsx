import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Leaf, 
  Wind, 
  Thermometer, 
  Waves, 
  Trophy, 
  ArrowRight,
  RefreshCw,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from './lib/utils';

// --- Constants ---

const TARGETS = [
  {
    id: 1,
    title: "1.5°C Limit",
    desc: "Limiting warming to 1.5°C above pre-industrial levels is crucial to avoid the worst impacts.",
    color: "bg-sky-blue"
  },
  {
    id: 2,
    title: "45% Reduction",
    desc: "Reducing global emissions by 45% by 2030 is the pathway to reaching Net Zero by 2050.",
    color: "bg-earth-green"
  },
  {
    id: 3,
    title: "Resilience",
    desc: "Strengthening resilience and adaptive capacity to climate-related hazards and natural disasters.",
    color: "bg-warning-orange"
  },
  {
    id: 4,
    title: "Zero Deforestation",
    desc: "Ending and reversing forest loss by 2030 to protect our planet's most vital carbon sinks.",
    color: "bg-crisis-grey"
  },
  {
    id: 5,
    title: "Climate Literacy",
    desc: "Achieving universal climate education for all students to empower the next generation.",
    color: "bg-sky-blue"
  }
];

const INITIAL_CHECKLIST = [
  { id: '1', label: 'Use public transport or cycle', completed: false },
  { id: '2', label: 'Reduce single-use plastic', completed: false },
  { id: '3', label: 'Plant a tree or maintain a garden', completed: false },
  { id: '4', label: 'Switch off lights when not in use', completed: false },
  { id: '5', label: 'Eat more plant-based meals', completed: false },
  { id: '6', label: 'Educate others about climate change', completed: false },
  { id: '7', label: 'Start a home composting bin', completed: false },
  { id: '8', label: 'Buy seasonal and local produce', completed: false },
  { id: '9', label: 'Carry a reusable water bottle', completed: false },
  { id: '10', label: 'Unplug devices when fully charged', completed: false },
  { id: '11', label: 'Take shorter (5-min) showers', completed: false },
  { id: '12', label: 'Support sustainable fashion brands', completed: false },
];

const QUIZ_QUESTIONS = [
  {
    question: "Which gas is most responsible for global warming?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correct: 1
  },
  {
    question: "What is the target limit for global warming set by the Paris Agreement?",
    options: ["2.5°C", "0.5°C", "1.5°C", "3.0°C"],
    correct: 2
  },
  {
    question: "Which of these is a renewable energy source?",
    options: ["Coal", "Natural Gas", "Solar Energy", "Oil"],
    correct: 2
  },
  {
    question: "What percentage of emissions must be reduced by 2030?",
    options: ["10%", "25%", "45%", "100%"],
    correct: 2
  },
  {
    question: "Which sector is the largest contributor to global greenhouse gas emissions?",
    options: ["Agriculture", "Energy", "Transport", "Waste"],
    correct: 1
  },
  {
    question: "What is the primary cause of ocean acidification?",
    options: ["Plastic pollution", "Oil spills", "Absorption of CO2", "Overfishing"],
    correct: 2
  },
  {
    question: "What does 'Net Zero' mean?",
    options: ["No more CO2 released", "Balancing emissions with removal", "Reducing 50% emissions", "Zero waste"],
    correct: 1
  },
  {
    question: "Which ecosystem absorbs more carbon per square meter than tropical forests?",
    options: ["Deserts", "Mangroves", "Grasslands", "Coral Reefs"],
    correct: 1
  },
  {
    question: "What is the 'Greenhouse Effect'?",
    options: ["Sun heating the earth", "Gases trapping heat", "Plants growing faster", "Ocean cooling"],
    correct: 1
  },
  {
    question: "Which body provides official scientific assessments on climate change?",
    options: ["IPCC", "UNESCO", "WHO", "NASA"],
    correct: 0
  }
];

// --- Components ---

export default function App() {
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('sdg13_checklist');
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
  });

  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('sdg13_checklist', JSON.stringify(checklist));
  }, [checklist]);

  const progressPercent = useMemo(() => {
    const completed = checklist.filter((item: any) => item.completed).length;
    return Math.round((completed / checklist.length) * 100);
  }, [checklist]);

  const toggleCheck = (id: string) => {
    setChecklist((prev: any) => 
      prev.map((item: any) => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleQuizAnswer = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === QUIZ_QUESTIONS[quizStep].correct) {
      setQuizScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(s => s + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      if (quizScore >= QUIZ_QUESTIONS.length - 1) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2E7D32', '#0288D1', '#F57C00']
        });
      }
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setQuizFinished(false);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-sky-blue text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-earth-green rounded-full blur-3xl" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1 
            className="text-6xl md:text-8xl bubbly-heading drop-shadow-lg mb-6 leading-tight"
            whileHover={{ scale: 1.05 }}
          >
            SDG 13:<br/>CLIMATE ACTION
          </motion.h1>
          <p className="text-xl md:text-2xl font-display font-medium max-w-2xl mx-auto opacity-90">
            Take urgent action to combat climate change and its impacts. 
            The earth is in our hands!
          </p>
          <motion.div 
            className="mt-10 inline-flex"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#explore" className="bg-white text-sky-blue px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-earth-green hover:text-white transition-colors flex items-center gap-2">
              Explore Now <ArrowRight size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Animated clouds/leafs floaters */}
        <div className="absolute bottom-10 inset-x-0 flex justify-center gap-4 opacity-30">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 3 + i, 
                repeat: Infinity,
                delay: i * 0.5
              }}
            >
              <Leaf className="text-white" size={40} />
            </motion.div>
          ))}
        </div>
      </header>

      {/* --- SPLIT EARTH SECTION --- */}
      <section id="explore" className="flex flex-col md:flex-row h-auto md:h-screen">
        {/* THE CRISIS */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex-1 bg-crisis-grey text-white p-12 flex flex-col justify-center gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1594156544547-22a61aa078f6?auto=format&fit=crop&q=80&w=1000" 
              alt="Drought"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-5xl font-bubbly text-warning-orange mb-6">THE CRISIS</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <li className="flex items-start gap-4">
                <Thermometer className="text-warning-orange mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-bold font-display">Extreme Heat</h3>
                  <p className="text-sm opacity-80">Rising temperatures cause heatwaves, droughts, and desertification.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Waves className="text-warning-orange mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-bold font-display">Rising Oceans</h3>
                  <p className="text-sm opacity-80">Melting ice caps cause sea levels to rise, flooding coastal cities.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Leaf className="text-warning-orange mt-1 shrink-0 rotate-180" size={24} />
                <div>
                  <h3 className="text-lg font-bold font-display">Species Loss</h3>
                  <p className="text-sm opacity-80">Habitats are changing too fast for species to survive.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Waves className="text-warning-orange mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-bold font-display">Acidic Oceans</h3>
                  <p className="text-sm opacity-80">Absorbed CO2 makes oceans acidic, killing coral reefs.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* THE SOLUTION */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex-1 bg-earth-green text-white p-12 flex flex-col justify-center gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1466611653911-95282fc3656b?auto=format&fit=crop&q=80&w=1000" 
              alt="Renewable Energy"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-5xl font-bubbly text-sky-blue mb-6">THE SOLUTION</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <li className="flex items-start gap-4">
                <Wind className="text-sky-blue mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-bold font-display">Clean Energy</h3>
                  <p className="text-sm opacity-80">Solar and wind power are replacing fossil fuels globally.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Leaf className="text-sky-blue mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-bold font-display">Green Cities</h3>
                  <p className="text-sm opacity-80">Planting urban forests and rooftops to cool down cities.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-sky-blue mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-bold font-display">Circular Economy</h3>
                  <p className="text-sm opacity-80">Reducing, reusing, and recycling to eliminate waste pollution.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Wind className="text-sky-blue mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-bold font-display">EV Future</h3>
                  <p className="text-sm opacity-80">Switching to electric vehicles to stop transport emissions.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>Section
      </section>

      {/* --- TARGETS SECTION --- */}
      <section className="py-24 px-6 bg-zinc-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bubbly text-earth-green mb-4">2026 Climate Targets</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">The roadmap to a sustainable future is clear. These are our collective global goals for 2026 and beyond.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {TARGETS.map((target, i) => (
              <motion.div
                key={target.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "p-6 rounded-3xl text-white shadow-xl hover:scale-105 transition-transform cursor-default relative overflow-hidden group h-full flex flex-col",
                  target.color
                )}
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-xl font-bubbly mb-3 relative z-10 leading-tight">{target.title}</h3>
                <p className="text-sm opacity-90 relative z-10 leading-relaxed flex-1">{target.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BENTO GRID FACTS --- */}
      <section className="py-24 px-6 bg-zinc-900 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bubbly text-warning-orange mb-4">Climate Stats</h2>
            <p className="text-zinc-400">Deep dive into the numbers that define our planet's health.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4 h-[1000px] md:h-[600px]">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 md:row-span-2 bg-earth-green rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden"
            >
              <Leaf className="absolute -top-10 -right-10 text-white/10 w-64 h-64" />
              <h3 className="text-4xl font-bubbly mb-2">420 ppm</h3>
              <p className="text-xl font-display font-medium opacity-80">Atmospheric CO2 levels are at their highest in millions of years.</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-sky-blue rounded-3xl p-6 flex flex-col items-center justify-center text-center"
            >
              <Waves className="mb-4" size={48} />
              <h4 className="font-bubbly text-xl">20 cm</h4>
              <p className="text-sm opacity-80">Sea level rise since 1880.</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-warning-orange rounded-3xl p-6 flex flex-col items-center justify-center text-center"
            >
              <Thermometer className="mb-4" size={48} />
              <h4 className="font-bubbly text-xl">1.1°C</h4>
              <p className="text-sm opacity-80">Current global warming.</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 bg-crisis-grey rounded-3xl p-8 flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <Play className="text-sky-blue" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Every Second</h4>
                <p className="text-sm opacity-70">An area of forest the size of a football field is lost.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 bg-zinc-800 rounded-3xl p-8 border border-white/5 flex flex-col justify-center"
            >
              <p className="text-2xl font-display font-medium italic">"Climate change is not a problem for the future, it is a problem for right now."</p>
              <p className="text-earth-green font-bold mt-4">— UN Secretary-General</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- VIDEO SECTION --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-bubbly text-sky-blue mb-6">Learn More</h2>
              <p className="text-lg text-zinc-600 leading-relaxed mb-8">
                Watch this inspiring video to understand how small actions by students like you can lead to massive global changes in the fight against climate change.
              </p>
              <div className="bg-earth-green/10 border-l-4 border-earth-green p-6 rounded-r-2xl">
                <p className="italic text-earth-green font-medium">"The greatest threat to our planet is the belief that someone else will save it."</p>
                <p className="text-earth-green font-bold mt-2">— Robert Swan</p>
              </div>
            </div>
            
            <div className="flex-1 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 border-4 border-sky-blue group relative">
              <iframe 
                src="https://www.youtube.com/embed/jhoa3OHivN8" 
                title="Climate Action Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE SECTION --- */}
      <section className="py-24 px-6 bg-sky-blue/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Checklist & Tracker */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-sky-blue/10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bubbly text-earth-green">My Action List</h3>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Progress</span>
                  <span className="text-3xl font-bubbly text-sky-blue">{progressPercent}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-4 bg-zinc-100 rounded-full mb-8 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-earth-green rounded-full shadow-[0_0_10px_rgba(46,125,50,0.5)]"
                />
              </div>

              <div className="space-y-4">
                {checklist.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl transition-all border text-left",
                      item.completed 
                        ? "bg-earth-green/10 border-earth-green text-earth-green" 
                        : "bg-white border-zinc-200 text-zinc-600 hover:border-sky-blue"
                    )}
                  >
                    {item.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    <span className={cn("font-medium", item.completed && "line-through opacity-70")}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {progressPercent === 100 && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-8 p-6 bg-warning-orange/10 rounded-2xl flex items-center gap-4 text-warning-orange"
                >
                  <Trophy size={40} className="shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg">Climate Hero!</h4>
                    <p className="text-sm opacity-80">You've completed all actions. Keep leading the way for a better planet!</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Quiz Section */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-sky-blue/10 flex flex-col">
            <h3 className="text-3xl font-bubbly text-warning-orange mb-8">Climate Quiz</h3>
            
            <div className="flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                {!quizFinished ? (
                  <motion.div
                    key={quizStep}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="mb-6">
                      <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Question {quizStep + 1} of {QUIZ_QUESTIONS.length}</span>
                      <p className="text-2xl font-bold font-display mt-2 text-zinc-800">
                        {QUIZ_QUESTIONS[quizStep].question}
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => (
                        <button
                          key={idx}
                          disabled={selectedOption !== null}
                          onClick={() => handleQuizAnswer(idx)}
                          className={cn(
                            "w-full p-4 rounded-2xl border-2 text-left font-medium transition-all",
                            selectedOption === null 
                              ? "border-zinc-100 hover:border-sky-blue hover:bg-sky-blue/5"
                              : idx === QUIZ_QUESTIONS[quizStep].correct
                                ? "border-earth-green bg-earth-green/10 text-earth-green"
                                : selectedOption === idx
                                  ? "border-red-500 bg-red-50 text-red-600"
                                  : "border-zinc-100 opacity-50"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {selectedOption !== null && idx === QUIZ_QUESTIONS[quizStep].correct && <CheckCircle2 size={20} />}
                          </div>
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={selectedOption === null}
                      onClick={nextQuestion}
                      className={cn(
                        "mt-auto w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                        selectedOption === null
                          ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                          : "bg-warning-orange text-white hover:scale-[1.02]"
                      )}
                    >
                      {quizStep < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'} <ArrowRight size={20} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-32 h-32 bg-earth-green/10 rounded-full flex items-center justify-center mb-6 text-earth-green">
                      <Trophy size={64} />
                    </div>
                    <h4 className="text-4xl font-bubbly text-earth-green mb-2">Quiz Complete!</h4>
                    <p className="text-xl text-zinc-600 mb-8 font-medium">
                      You scored <span className="text-sky-blue font-bold">{quizScore} out of {QUIZ_QUESTIONS.length}</span>
                    </p>
                    
                    <button
                      onClick={resetQuiz}
                      className="bg-sky-blue text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-earth-green transition-colors shadow-lg"
                    >
                      <RefreshCw size={20} /> Try Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-crisis-grey text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-sky-blue rounded-xl flex items-center justify-center">
              <Leaf size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bubbly text-sky-blue">SDG 13</h2>
              <p className="text-xs uppercase tracking-widest opacity-60">School Project 2026</p>
            </div>
          </div>
          
          <div className="flex gap-8 text-sm opacity-60">
            <a href="#" className="hover:text-warning-orange transition-colors">Project Info</a>
            <a href="#" className="hover:text-warning-orange transition-colors">Resources</a>
            <a href="#" className="hover:text-warning-orange transition-colors">Contact</a>
          </div>

          <p className="text-sm opacity-40">© 2026 Climate Action Team. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
