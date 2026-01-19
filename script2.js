const questions = [
  {
    question: "Qu’est-ce que l’Intelligence Artificielle (IA) ?",
    answers: [
      { text: "Un langage de programmation", correct: false },
      { text: "Une base de données intelligente", correct: false },
      { text: "La capacité d’une machine à imiter l’intelligence humaine", correct: true },
      { text: "Un système d’exploitation", correct: false }
    ]
  },
  {
    question: "Le Machine Learning est :",
    answers: [
      { text: "Une alternative à l’IA", correct: false },
      { text: "Une sous-branche de l’IA", correct: true },
      { text: "Un langage mathématique", correct: false },
      { text: "Un type de base de données", correct: false }
    ]
  },
  {
    question: "Quel type d’apprentissage utilise des données étiquetées ?",
    answers: [
      { text: "Apprentissage non supervisé", correct: false },
      { text: "Apprentissage par renforcement", correct: false },
      { text: "Apprentissage supervisé", correct: true },
      { text: "Apprentissage profond", correct: false }
    ]
}, 
{   
    question: "Quel type d’apprentissage utilise des données étiquetées ?", 
    answers:[ {text:"Apprentissage non supervisé", corredct:false},
         {text:"Apprentissage par renforcement", correct:false}, {text:"Apprentissage supervisé", correct:true}, {text:"Apprentissage profond", correct:false}, ] },
          {question: "Quel algorithme est couramment utilisé pour la classification ?", answers:[ {text:"K-means", correct:false}, {text:"Arbre de décision", correct:true}, {text:"PCA", correct:false}, {text:"Apriori", correct:false}, ] }, 
          {question: "À quoi sert une fonction de coût (loss function) ?", answers:[ {text:"Accélérer l’apprentissage", correct:false}, {text:"Mesurer la précision du modèle", correct:false}, {text:". Mesurer l’erreur du modèle", correct:true}, {text:"Visualiser les données", correct:false}, ] },
    {question: "Qu’est-ce qu’un jeu de données d’entraînement ?", answers:[ {text:"Un ensemble de données pour tester le modèle", correct:false}, {text:"Un ensemble de données pour entraîner le modèle", correct:true}, {text:"Un ensemble de résultats finaux", correct:false}, {text:"Un ensemble de données non utilisées", correct:false}, ] },
    {question: "Quel problème survient lorsque le modèle apprend trop bien les données d’entraînement ?", answers:[ {text:"Underfitting", correct:false}, {text:"Clustering", correct:false}, {text:"Overfitting", correct:true}, {text:"Normalisation", correct:false}, ] },
    {question: "Quel problème survient lorsque le modèle apprend trop bien les données d’entraînement ?", answers:[ {text:"Underfitting", correct:false}, {text:"Clustering", correct:false}, {text:"Overfitting", correct:true}, {text:"Normalisation", correct:false}, ] },
    {question: "Quel algorithme est utilisé pour le regroupement (clustering) ?", answers:[ {text:"K-means", correct:true}, {text:"Régression linéaire", correct:false}, {text:"Naive Bayes", correct:false}, {text:"SVM", correct:false}, ] }, 
    {question: "Quel est le rôle d’un jeu de données de test ?", answers:[ {text:"Entraîner le modèle", correct:false}, {text:"Améliorer les données", correct:false}, {text:"Évaluer la performance du modèle", correct:true}, {text:"Nettoyer les données", correct:false}, ] },
    {question: "Le Deep Learning est basé principalement sur :", answers:[ {text:"Les arbres de décision", correct:false}, {text:"Les réseaux de neurones artificiels", correct:true}, {text:"Les bases de données relationnelles", correct:false}, {text:"Les algorithmes génétiques", correct:false}, ] }, ];



const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("quiz-btn");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
 } else {
  questionElement.innerHTML = "Quiz terminé 🎉";
  resetState();
  nextButton.style.display = "none";
  showResults();
}

});

startQuiz();

function showResults() {
  const resultBox = document.getElementById("result-box");
  resultBox.style.display = "block";

  let html = `<h3>Résultat final : ${score}/${questions.length}</h3>`;
  html += `<ul>`;

  questions.forEach((q, index) => {
    const correctAnswer = q.answers.find(a => a.correct).text;
    html += `
      <li>
        <strong>Q${index + 1} :</strong> ${q.question}<br>
        <span class="correct-answer">✔ Réponse correcte : ${correctAnswer}</span>
      </li>
    `;
  });

  html += `</ul>`;
  resultBox.innerHTML = html;
}


const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      if (filter === 'all' || card.classList.contains(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});


const slides = document.querySelectorAll('.card-slider .slide');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if(i === index) slide.classList.add('active');
  });
}

// Next button
nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// Prev button
prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// Optional: auto-slide every 5s
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

// Initialize
showSlide(currentSlide);
