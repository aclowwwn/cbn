import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Printer, 
  Save, 
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Sparkles,
  User,
  Heart,
  Target,
  History
} from 'lucide-react';
import { 
  AppData, 
  InterestAnswers, 
  SpiritualGiftsAnswers, 
  PersonalStyleAnswers, 
  PassionAnswers, 
  OpportunitiesAnswers, 
  SpiritualExperienceAnswers 
} from './types';
import { 
  INTEREST_QUESTIONS, 
  SPIRITUAL_GIFTS_QUESTIONS, 
  PERSONAL_STYLE_ORGANIZE, 
  PERSONAL_STYLE_ENERGIZE, 
  PASSION_QUESTIONS, 
  OPPORTUNITIES_QUESTIONS, 
  SPIRITUAL_EXPERIENCE_QUESTIONS 
} from './constants';

const STORAGE_KEY = 'colegiul_biblic_neemia_data_2026';

const INITIAL_DATA: AppData = {
  interests: {
    mentors: '', family: '', friends: '', school: '', church: '', location: '', opportunities: '', talents: ''
  },
  spiritualGifts: {},
  personalStyle: {
    organize: Array(7).fill(3),
    energize: Array(7).fill(3)
  },
  passion: {
    pastProblems: '', objectives: '', endOfLife: '', forOthers: '', peopleToHelp: '', causes: '', positiveExperiences: '', calling: ''
  },
  opportunities: {
    personalProblems: '', personalOpportunities: '', familyProblems: '', familyOpportunities: '', friendsProblems: '', friendsOpportunities: '', churchProblems: '', churchOpportunities: '', communityProblems: '', communityOpportunities: '', equipmentNeeded: ''
  },
  spiritualExperience: {
    savedFrom: '', notYetLord: '', guiltPaid: '', painRemoved: '', burdensTaken: '', discouragementToCourage: '', sufferingAlleviated: '', savedFor: '', generalExperiences: '', howExperiencesHelp: ''
  },
  currentStep: 0
};

export default function App() {
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const updateInterests = (field: keyof InterestAnswers, value: string) => {
    setData(prev => ({
      ...prev,
      interests: { ...prev.interests, [field]: value }
    }));
  };

  const updateSpiritualGift = (index: number, value: number) => {
    setData(prev => ({
      ...prev,
      spiritualGifts: { ...prev.spiritualGifts, [index]: value }
    }));
  };

  const updatePersonalStyle = (type: 'organize' | 'energize', index: number, value: number) => {
    setData(prev => {
      const newList = [...prev.personalStyle[type]];
      newList[index] = value;
      return {
        ...prev,
        personalStyle: { ...prev.personalStyle, [type]: newList }
      };
    });
  };

  const updatePassion = (field: keyof PassionAnswers, value: string) => {
    setData(prev => ({
      ...prev,
      passion: { ...prev.passion, [field]: value }
    }));
  };

  const updateOpportunities = (field: keyof OpportunitiesAnswers, value: string) => {
    setData(prev => ({
      ...prev,
      opportunities: { ...prev.opportunities, [field]: value }
    }));
  };

  const updateSpiritualExperience = (field: keyof SpiritualExperienceAnswers, value: string) => {
    setData(prev => ({
      ...prev,
      spiritualExperience: { ...prev.spiritualExperience, [field]: value }
    }));
  };

  const nextStep = () => {
    if (data.currentStep < 7) {
      setData(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (data.currentStep > 0) {
      setData(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
      window.scrollTo(0, 0);
    }
  };

  const resetData = () => {
    if (confirm("Sigur dorești să ștergi toate datele și să reîncepi?")) {
      setData(INITIAL_DATA);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    { title: "Introducere", icon: <BookOpen className="w-6 h-6" /> },
    { title: "Experiența spirituală", icon: <History className="w-6 h-6" /> },
    { title: "Evaluarea intereselor", icon: <BookOpen className="w-6 h-6" /> },
    { title: "Oportunitățile mele", icon: <Target className="w-6 h-6" /> },
    { title: "Pasiune și energie", icon: <Heart className="w-6 h-6" /> },
    { title: "Stilul Personal", icon: <User className="w-6 h-6" /> },
    { title: "Darurile Spirituale", icon: <Sparkles className="w-6 h-6" /> },
    { title: "Finalizare", icon: <CheckCircle2 className="w-6 h-6" /> },
  ];

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] font-serif selection:bg-[#5A5A40] selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-[#e5e5e0] py-8 px-4 text-center sticky top-0 z-10 print:hidden">
        <h1 className="text-2xl md:text-3xl font-bold text-[#5A5A40] tracking-tight">
          Colegiul Biblic Neemia
        </h1>
        <p className="text-sm uppercase tracking-widest mt-2 opacity-70">
          Principiile slujirii creștine 2026
        </p>
        
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mt-8 relative">
          <div className="h-1 bg-[#e5e5e0] w-full rounded-full">
            <motion.div 
              className="h-full bg-[#5A5A40] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(Math.max(0, data.currentStep) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-4">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center transition-opacity duration-300 ${idx === data.currentStep ? 'opacity-100' : 'opacity-30'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${idx <= data.currentStep ? 'bg-[#5A5A40] text-white' : 'bg-[#e5e5e0]'}`}>
                  {idx === 0 ? 'H' : idx === 7 ? 'F' : idx}
                </div>
                <span className="hidden md:block text-[10px] mt-1 font-sans font-semibold uppercase tracking-tighter">
                  {step.title.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-6 pb-32 print:p-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={data.currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-[#e5e5e0] print:shadow-none print:border-none print:p-0"
          >
            {/* Step Content */}
            {data.currentStep === 0 && (
              <section className="text-center py-8">
                <div className="bg-[#f5f5f0] w-20 h-20 rounded-full flex items-center justify-center text-[#5A5A40] mx-auto mb-8">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-6 italic">Bun venit la Evaluarea Slujirii</h2>
                <div className="space-y-6 text-lg opacity-80 max-w-2xl mx-auto mb-12 leading-relaxed">
                  <p>
                    Această evaluare este concepută pentru a te ajuta să descoperi modul unic în care Dumnezeu te-a echipat pentru slujire.
                  </p>
                  <p>
                    Vom trece împreună prin 6 etape esențiale: experiența ta spirituală, interesele, oportunitățile de slujire, pasiunile, stilul personal și darurile spirituale.
                  </p>
                  <p className="font-sans text-sm font-bold uppercase tracking-widest text-[#5A5A40]">
                    Ești gata să începi călătoria?
                  </p>
                </div>
                <button
                  onClick={nextStep}
                  className="bg-[#5A5A40] text-white py-4 px-12 rounded-2xl font-bold font-sans hover:bg-[#4a4a35] transition-all shadow-lg shadow-[#5A5A40]/20 text-lg"
                >
                  Începe Testul
                </button>
              </section>
            )}

            {data.currentStep === 1 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#f5f5f0] p-3 rounded-2xl text-[#5A5A40]">
                    {steps[1].icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold italic">Evaluarea experienței spirituale</h2>
                    <p className="text-sm opacity-60">Fișă de lucru</p>
                  </div>
                </div>
                <div className="space-y-8">
                  {SPIRITUAL_EXPERIENCE_QUESTIONS.map((q) => (
                    <div key={q.id}>
                      <label className="block text-lg mb-3 font-medium">{q.label}</label>
                      <textarea
                        className="w-full bg-[#f9f9f7] border border-[#e5e5e0] rounded-2xl p-4 focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent transition-all outline-none min-h-[100px] font-sans"
                        value={data.spiritualExperience[q.id as keyof SpiritualExperienceAnswers]}
                        onChange={(e) => updateSpiritualExperience(q.id as keyof SpiritualExperienceAnswers, e.target.value)}
                        placeholder="Răspunsul tău aici..."
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.currentStep === 2 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#f5f5f0] p-3 rounded-2xl text-[#5A5A40]">
                    {steps[2].icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold italic">Evaluarea intereselor</h2>
                    <p className="text-sm opacity-60">Fișă de lucru</p>
                  </div>
                </div>
                <blockquote className="border-l-4 border-[#5A5A40] pl-6 py-2 mb-8 italic text-lg opacity-80">
                  "Coloseni 3:23-24 Orice faceţi, să faceţi din toată inima, ca pentru Domnul, nu ca pentru oameni, ca unii care ştiţi că veţi primi de la Domnul răsplata moştenirii. Voi slujiţi Domnului Hristos."
                </blockquote>
                <p className="mb-8 font-sans text-sm uppercase tracking-wider font-bold opacity-70">Cu toții avem interese variate dintr-o multitudine de motive.</p>
                <div className="space-y-8">
                  {INTEREST_QUESTIONS.map((q) => (
                    <div key={q.id}>
                      <label className="block text-lg mb-3 font-medium">{q.label}</label>
                      <textarea
                        className="w-full bg-[#f9f9f7] border border-[#e5e5e0] rounded-2xl p-4 focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent transition-all outline-none min-h-[100px] font-sans"
                        value={data.interests[q.id as keyof InterestAnswers]}
                        onChange={(e) => updateInterests(q.id as keyof InterestAnswers, e.target.value)}
                        placeholder="Răspunsul tău aici..."
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.currentStep === 3 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#f5f5f0] p-3 rounded-2xl text-[#5A5A40]">
                    {steps[3].icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold italic">Oportunitățile mele</h2>
                    <p className="text-sm opacity-60">Fișă de lucru</p>
                  </div>
                </div>
                <div className="space-y-8">
                  {OPPORTUNITIES_QUESTIONS.map((q) => (
                    <div key={q.id}>
                      <label className="block text-lg mb-3 font-medium">{q.label}</label>
                      <textarea
                        className="w-full bg-[#f9f9f7] border border-[#e5e5e0] rounded-2xl p-4 focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent transition-all outline-none min-h-[100px] font-sans"
                        value={data.opportunities[q.id as keyof OpportunitiesAnswers]}
                        onChange={(e) => updateOpportunities(q.id as keyof OpportunitiesAnswers, e.target.value)}
                        placeholder="Răspunsul tău aici..."
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.currentStep === 4 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#f5f5f0] p-3 rounded-2xl text-[#5A5A40]">
                    {steps[4].icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold italic">Pasiune și energie</h2>
                    <p className="text-sm opacity-60">Fișă de lucru</p>
                  </div>
                </div>
                <div className="space-y-8">
                  {PASSION_QUESTIONS.map((q) => (
                    <div key={q.id}>
                      <label className="block text-lg mb-3 font-medium">{q.label}</label>
                      <textarea
                        className="w-full bg-[#f9f9f7] border border-[#e5e5e0] rounded-2xl p-4 focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent transition-all outline-none min-h-[100px] font-sans"
                        value={data.passion[q.id as keyof PassionAnswers]}
                        onChange={(e) => updatePassion(q.id as keyof PassionAnswers, e.target.value)}
                        placeholder="Răspunsul tău aici..."
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.currentStep === 5 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#f5f5f0] p-3 rounded-2xl text-[#5A5A40]">
                    {steps[5].icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold italic">Evaluarea stilului personal</h2>
                    <p className="text-sm opacity-60">Identificarea înclinației naturale</p>
                  </div>
                </div>
                
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-bold mb-6 border-b pb-2 border-[#5A5A40]/20">Cum te organizezi?</h3>
                    <div className="space-y-8">
                      {PERSONAL_STYLE_ORGANIZE.map((item, idx) => (
                        <div key={idx} className="space-y-4">
                          <div className="flex justify-between text-sm font-bold uppercase tracking-wider opacity-60 font-sans">
                            <span>{item.left}</span>
                            <span>{item.right}</span>
                          </div>
                          <div className="flex justify-between items-center gap-2">
                            {[1, 2, 3, 4, 5].map((val) => (
                              <button
                                key={val}
                                onClick={() => updatePersonalStyle('organize', idx, val)}
                                className={`flex-1 h-12 rounded-xl font-bold font-sans transition-all border ${
                                  data.personalStyle.organize[idx] === val 
                                    ? 'bg-[#5A5A40] text-white border-[#5A5A40]' 
                                    : 'bg-white text-[#5A5A40] border-[#e5e5e0] hover:border-[#5A5A40]'
                                }`}
                              >
                                {val}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-6 border-b pb-2 border-[#5A5A40]/20">Cum te energizezi? (focalizezi)</h3>
                    <div className="space-y-8">
                      {PERSONAL_STYLE_ENERGIZE.map((item, idx) => (
                        <div key={idx} className="space-y-4">
                          <div className="flex justify-between text-sm font-bold uppercase tracking-wider opacity-60 font-sans">
                            <span>{item.left}</span>
                            <span>{item.right}</span>
                          </div>
                          <div className="flex justify-between items-center gap-2">
                            {[1, 2, 3, 4, 5].map((val) => (
                              <button
                                key={val}
                                onClick={() => updatePersonalStyle('energize', idx, val)}
                                className={`flex-1 h-12 rounded-xl font-bold font-sans transition-all border ${
                                  data.personalStyle.energize[idx] === val 
                                    ? 'bg-[#5A5A40] text-white border-[#5A5A40]' 
                                    : 'bg-white text-[#5A5A40] border-[#e5e5e0] hover:border-[#5A5A40]'
                                }`}
                              >
                                {val}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {data.currentStep === 6 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#f5f5f0] p-3 rounded-2xl text-[#5A5A40]">
                    {steps[6].icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold italic">Chestionarul Darurilor Spirituale</h2>
                    <p className="text-sm opacity-60">Etapa 1: Evaluare</p>
                  </div>
                </div>
                <div className="bg-[#f5f5f0] p-6 rounded-2xl mb-8 font-sans text-sm">
                  <p className="font-bold mb-2">Instrucțiuni:</p>
                  <p>Citiți și răspundeți la fiecare întrebare marcând răspunsul care corespunde adevărului din viața Dvs.:</p>
                  <div className="flex gap-4 mt-4 flex-wrap">
                    <span className="bg-white px-3 py-1 rounded-full border border-[#e5e5e0]"><strong>3</strong> - Frecvent</span>
                    <span className="bg-white px-3 py-1 rounded-full border border-[#e5e5e0]"><strong>2</strong> - Uneori</span>
                    <span className="bg-white px-3 py-1 rounded-full border border-[#e5e5e0]"><strong>1</strong> - Rar</span>
                    <span className="bg-white px-3 py-1 rounded-full border border-[#e5e5e0]"><strong>0</strong> - Niciodată</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {SPIRITUAL_GIFTS_QUESTIONS.map((q, idx) => (
                    <div key={idx} className="p-6 rounded-2xl border border-[#e5e5e0] hover:bg-[#f9f9f7] transition-colors">
                      <p className="text-lg mb-4"><span className="opacity-40 mr-2">{idx + 1}.</span> {q}</p>
                      <div className="flex justify-between items-center gap-2 max-w-md">
                        {[3, 2, 1, 0].map((val) => (
                          <button
                            key={val}
                            onClick={() => updateSpiritualGift(idx + 1, val)}
                            className={`flex-1 py-3 rounded-xl font-bold font-sans transition-all border ${
                              data.spiritualGifts[idx + 1] === val 
                                ? 'bg-[#5A5A40] text-white border-[#5A5A40]' 
                                : 'bg-white text-[#5A5A40] border-[#e5e5e0] hover:border-[#5A5A40]'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.currentStep === 7 && (
              <section className="text-center py-12">
                <div className="bg-[#f5f5f0] w-24 h-24 rounded-full flex items-center justify-center text-[#5A5A40] mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold mb-4 italic">Felicitări!</h2>
                <p className="text-lg opacity-70 mb-12 max-w-md mx-auto">
                  Ai completat toate etapele evaluării. Acum poți vizualiza și printa rezumatul răspunsurilor tale.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <button
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-2 bg-[#5A5A40] text-white py-4 px-8 rounded-2xl font-bold font-sans hover:bg-[#4a4a35] transition-all shadow-lg shadow-[#5A5A40]/20"
                  >
                    <Printer className="w-5 h-5" />
                    Printează PDF
                  </button>
                  <button
                    onClick={resetData}
                    className="flex items-center justify-center gap-2 bg-white text-[#5A5A40] border-2 border-[#5A5A40] py-4 px-8 rounded-2xl font-bold font-sans hover:bg-[#f5f5f0] transition-all"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reîncepe
                  </button>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-[#e5e5e0] py-6 px-4 z-10 print:hidden">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={data.currentStep === 0}
            className={`flex items-center gap-2 py-3 px-6 rounded-2xl font-bold font-sans transition-all ${
              data.currentStep === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#f5f5f0] text-[#5A5A40]'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Înapoi
          </button>

          <div className="hidden md:flex gap-2">
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === data.currentStep ? 'w-8 bg-[#5A5A40]' : 'bg-[#e5e5e0]'}`}
              />
            ))}
          </div>

          {data.currentStep < 7 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 bg-[#5A5A40] text-white py-3 px-8 rounded-2xl font-bold font-sans hover:bg-[#4a4a35] transition-all shadow-lg shadow-[#5A5A40]/20"
            >
              Înainte
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-[120px]" /> /* Spacer */
          )}
        </div>
      </footer>

      {/* Print-only Summary Section */}
      <div className="hidden print:block p-8 bg-white text-black font-serif">
        <div className="text-center mb-12 border-b-2 border-black pb-8">
          <h1 className="text-4xl font-bold">Colegiul Biblic Neemia</h1>
          <h2 className="text-2xl mt-2">Principiile slujirii creștine 2026</h2>
          <p className="text-lg italic mt-4">Rezumatul Evaluării Personale</p>
        </div>

        <div className="space-y-12">
          {/* Spiritual Experience Summary */}
          <section>
            <h3 className="text-2xl font-bold border-b border-black mb-4">1. Experiența spirituală</h3>
            <div className="space-y-4">
              {SPIRITUAL_EXPERIENCE_QUESTIONS.map(q => (
                <div key={q.id}>
                  <p className="font-bold">{q.label}</p>
                  <p className="pl-4 italic">{data.spiritualExperience[q.id as keyof SpiritualExperienceAnswers] || 'Niciun răspuns'}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Interests Summary */}
          <section className="page-break-before">
            <h3 className="text-2xl font-bold border-b border-black mb-4">2. Evaluarea intereselor</h3>
            <div className="space-y-4">
              {INTEREST_QUESTIONS.map(q => (
                <div key={q.id}>
                  <p className="font-bold">{q.label}</p>
                  <p className="pl-4 italic">{data.interests[q.id as keyof InterestAnswers] || 'Niciun răspuns'}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Opportunities Summary */}
          <section className="page-break-before">
            <h3 className="text-2xl font-bold border-b border-black mb-4">3. Oportunitățile mele</h3>
            <div className="space-y-4">
              {OPPORTUNITIES_QUESTIONS.map(q => (
                <div key={q.id}>
                  <p className="font-bold">{q.label}</p>
                  <p className="pl-4 italic">{data.opportunities[q.id as keyof OpportunitiesAnswers] || 'Niciun răspuns'}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Passion Summary */}
          <section className="page-break-before">
            <h3 className="text-2xl font-bold border-b border-black mb-4">4. Pasiune și energie</h3>
            <div className="space-y-4">
              {PASSION_QUESTIONS.map(q => (
                <div key={q.id}>
                  <p className="font-bold">{q.label}</p>
                  <p className="pl-4 italic">{data.passion[q.id as keyof PassionAnswers] || 'Niciun răspuns'}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Personal Style Summary */}
          <section className="page-break-before">
            <h3 className="text-2xl font-bold border-b border-black mb-4">5. Stilul Personal</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-2">Organizare (Scala O):</h4>
                {PERSONAL_STYLE_ORGANIZE.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm border-b border-gray-100 pb-1">
                    <span>{item.left} / {item.right}</span>
                    <span className="font-bold">{data.personalStyle.organize[idx]}</span>
                  </div>
                ))}
                <div className="mt-4 p-2 bg-gray-100 flex justify-between font-bold">
                  <span>TOTAL O:</span>
                  <span>{data.personalStyle.organize.reduce((a, b) => a + b, 0)}</span>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">Energizare (Scala E):</h4>
                {PERSONAL_STYLE_ENERGIZE.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm border-b border-gray-100 pb-1">
                    <span>{item.left} / {item.right}</span>
                    <span className="font-bold">{data.personalStyle.energize[idx]}</span>
                  </div>
                ))}
                <div className="mt-4 p-2 bg-gray-100 flex justify-between font-bold">
                  <span>TOTAL E:</span>
                  <span>{data.personalStyle.energize.reduce((a, b) => a + b, 0)}</span>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 border border-dashed border-black text-center italic">
              Poziția ta pe diagramă este dată de intersecția celor două linii: O={data.personalStyle.organize.reduce((a, b) => a + b, 0)} și E={data.personalStyle.energize.reduce((a, b) => a + b, 0)}.
            </div>
          </section>

          {/* Spiritual Gifts Summary */}
          <section className="page-break-before">
            <h3 className="text-2xl font-bold border-b border-black mb-4">6. Darurile Spirituale</h3>
            
            <div className="mb-8">
              <h4 className="font-bold mb-4 italic">Rezumat Scoruri pe Categorii:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Cunoaștere", q: [1, 4, 18, 39, 57] },
                  { name: "Discernământ", q: [20, 26, 35, 55, 67] },
                  { name: "Dărnicia", q: [2, 22, 25, 48, 70] },
                  { name: "Ajutorare", q: [3, 34, 41, 59, 64] },
                  { name: "Povățuire/Sfătuire", q: [5, 9, 12, 23, 28] },
                  { name: "Conducere", q: [6, 16, 50, 61, 75] },
                  { name: "Evanghelizare", q: [7, 14, 29, 31, 46] },
                  { name: "Păstorire", q: [8, 38, 53, 66, 72] },
                  { name: "Mila", q: [10, 27, 45, 49, 65] },
                  { name: "Proorocie", q: [11, 40, 52, 58, 69] },
                  { name: "Slujire", q: [13, 24, 30, 51, 60] },
                  { name: "Administrare", q: [15, 21, 36, 43, 68] },
                  { name: "Învățare", q: [33, 54, 56, 71, 74] },
                  { name: "Credința", q: [17, 19, 32, 42, 73] },
                  { name: "Înțelepciune", q: [37, 44, 47, 62, 63] },
                ].map((gift, i) => {
                  const total = gift.q.reduce((acc, curr) => acc + (data.spiritualGifts[curr] || 0), 0);
                  return (
                    <div key={i} className="flex justify-between border-b border-gray-200 pb-1">
                      <span>{gift.name}</span>
                      <span className="font-bold">{total}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <h4 className="font-bold mb-4 italic">Toate răspunsurile (0-3):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-[10px]">
              {SPIRITUAL_GIFTS_QUESTIONS.map((q, idx) => (
                <div key={idx} className="flex justify-between border-b border-gray-100 pb-0.5">
                  <span className="opacity-70 mr-2 truncate max-w-[250px]">{idx + 1}. {q}</span>
                  <span className="font-bold">{data.spiritualGifts[idx + 1] ?? '-'}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-24 text-center text-sm italic border-t border-black pt-8">
          Document generat la data de {new Date().toLocaleDateString('ro-RO')}
        </div>
      </div>

      <style>{`
        @media print {
          .page-break-before {
            page-break-before: always;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}
