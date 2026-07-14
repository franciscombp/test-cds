export const CDS_QUESTIONS = [
  {
    id: 1,
    question: "Yo duermo bien",
    reverse: true
  },
  {
    id: 2,
    question: "Me siento triste"
  },
  {
    id: 3,
    question: "Me gusta hacer cosas con otros"
  },
  {
    id: 4,
    question: "Tengo pesadillas"
  },
  {
    id: 5,
    question: "Como bien"
  },
  {
    id: 6,
    question: "Cuando tengo la oportunidad, me divierto"
  },
  {
    id: 7,
    question: "Creo que soy feo"
  },
  {
    id: 8,
    question: "Me doy el trabajo de limpiarme bien"
  },
  {
    id: 9,
    question: "Tengo que obligarme a hacer las cosas"
  },
  {
    id: 10,
    question: "Platico bien con otros"
  },
  {
    id: 11,
    question: "Me siento feliz"
  },
  {
    id: 12,
    question: "Mi familia está decepcionada de mí"
  },
  {
    id: 13,
    question: "Me siento protegido(a)"
  },
  {
    id: 14,
    question: "Me siento asustado(a)"
  },
  {
    id: 15,
    question: "Las cosas que ocurren no me importan"
  },
  {
    id: 16,
    question: "Tengo miedo"
  },
  {
    id: 17,
    question: "Soy una persona buena"
  },
  {
    id: 18,
    question: "Me canso fácilmente"
  }
];

export const RESPONSE_OPTIONS = [
  { value: 0, label: "Nunca" },
  { value: 1, label: "A veces" },
  { value: 2, label: "Frecuentemente" },
  { value: 3, label: "Siempre" }
];

export function calculateCDSScore(answers) {
  let score = 0;

  CDS_QUESTIONS.forEach(question => {
    const answer = answers[question.id] ?? 0;

    // Invertir puntuación para preguntas invertidas (síntomas positivos)
    if (question.reverse) {
      score += (3 - answer);
    } else {
      score += answer;
    }
  });

  return score;
}

export function getInterpretation(score) {
  if (score <= 15) {
    return {
      category: "Sin depresión",
      color: "bg-green-100 text-green-900",
      description: "El niño/a no presenta síntomas significativos de depresión."
    };
  } else if (score <= 25) {
    return {
      category: "Depresión leve",
      color: "bg-yellow-100 text-yellow-900",
      description: "El niño/a presenta síntomas leves de depresión. Se recomienda seguimiento."
    };
  } else if (score <= 40) {
    return {
      category: "Depresión moderada",
      color: "bg-orange-100 text-orange-900",
      description: "El niño/a presenta síntomas moderados de depresión. Se recomienda intervención profesional."
    };
  } else {
    return {
      category: "Depresión severa",
      color: "bg-red-100 text-red-900",
      description: "El niño/a presenta síntomas severos de depresión. Requiere atención profesional inmediata."
    };
  }
}
