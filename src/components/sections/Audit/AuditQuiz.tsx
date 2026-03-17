import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Zap, Target, BarChart3, Smartphone } from "lucide-react";
import "./AuditQuiz.css";

const questions = [
  {
    id: 1,
    question: "¿Tu web tarda más de 3 segundos en cargar?",
    icon: <Zap className="quiz-icon-inner" />,
    options: [
      { text: "Sí, es algo lenta", value: 0 },
      { text: "No, vuela", value: 1 },
      { text: "No lo sé", value: 0 },
    ],
  },
  {
    id: 2,
    question: "¿Se ve y funciona perfecta en todos los móviles?",
    icon: <Smartphone className="quiz-icon-inner" />,
    options: [
      { text: "Sí, totalmente", value: 1 },
      { text: "No, da fallos", value: 0 },
      { text: "A veces se corta", value: 0.5 },
    ],
  },
  {
    id: 3,
    question: "¿Recibes contactos de clientes cada semana?",
    icon: <Target className="quiz-icon-inner" />,
    options: [
      { text: "Sí, de forma constante", value: 1 },
      { text: "Casi nunca", value: 0 },
      { text: "Podría ser mejor", value: 0.5 },
    ],
  },
  {
    id: 4,
    question: "¿Sabes exactamente cuánta gente entra y qué hace?",
    icon: <BarChart3 className="quiz-icon-inner" />,
    options: [
      { text: "Tengo analíticas pro", value: 1 },
      { text: "Ni idea", value: 0 },
      { text: "Solo lo básico", value: 0.5 },
    ],
  },
];

export default function AuditQuiz() {
  const [step, setStep] = useState(0); // 0 is start, 1-4 questions, 5 result
  const [score, setScore] = useState(0);

  const handleAnswer = (value: number) => {
    setScore((prev) => prev + value);
    setStep((prev) => prev + 1);
  };

  const resetQuiz = () => {
    setStep(0);
    setScore(0);
  };

  const getResult = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return {
      title: "Tu web tiene potencial",
      desc: "Estás por encima de la media, pero podemos exprimir ese 20% final para doblar conversiones.",
      label: "Excelente"
    };
    if (percentage >= 50) return {
      title: "Tienes fugas de dinero",
      desc: "Tu web funciona pero estás perdiendo clientes por detalles técnicos. Necesitas una limpieza.",
      label: "Mejorable"
    };
    return {
      title: "Situación Crítica",
      desc: "Tu web está trabajando en tu contra. Necesitas una transformación urgente para no perder más ventas.",
      label: "Urgente"
    };
  };

  return (
    <div className="audit-quiz-container soft-glass">
      {step >= 1 && step <= questions.length && (
        <div className="quiz-progress">
          <motion.div 
            className="quiz-progress-bar" 
            initial={{ width: "0%" }}
            animate={{ width: `${(step / questions.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      )}
      
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="quiz-step"
          >
            <h3>¿Qué tan saludable es tu presencia digital?</h3>
            <p>Responde 4 preguntas y obtén un diagnóstico instantáneo.</p>
            <button onClick={() => setStep(1)} className="quiz-btn-start">
              Empezar Test <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {step >= 1 && step <= questions.length && (
          <motion.div
            key={`q-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            className="quiz-step"
          >
            <div className="quiz-icon-wrapper">
              {questions[step - 1].icon}
            </div>
            <h3>{questions[step - 1].question}</h3>
            <div className="quiz-options">
              {questions[step - 1].options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(opt.value)}
                  className="quiz-option-btn"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step > questions.length && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="quiz-step result-step"
          >
            <div className="result-badge">{getResult().label}</div>
            <h3>{getResult().title}</h3>
            <p>{getResult().desc}</p>
            
            <div className="quiz-actions">
              <a href="#contacto" className="quiz-btn-cta">
                Reservar Auditoría Gratis
              </a>
              <button onClick={resetQuiz} className="quiz-btn-retry">
                <RotateCcw size={16} /> Repetir
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
