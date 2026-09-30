document.querySelectorAll('.quiz-form').forEach((form) => {
  const result = form.querySelector('.quiz-result');
  const progress = form.querySelector('.quiz-progress');
  const progressText = form.querySelector('.quiz-progress-text');
  const questions = [...form.querySelectorAll('.quiz-question')];
  const actions = form.querySelector('.quiz-actions');
  const submitButton = actions.querySelector('button[type="submit"]');
  let currentIndex = 0;

  submitButton.remove();

  const navigation = document.createElement('div');
  navigation.className = 'quiz-navigation';

  const previousButton = document.createElement('button');
  previousButton.className = 'quiz-previous';
  previousButton.type = 'button';
  previousButton.textContent = 'Previous';

  const nextButton = document.createElement('button');
  nextButton.className = 'quiz-next';
  nextButton.type = 'button';
  nextButton.textContent = 'Next question';

  navigation.append(previousButton, nextButton);
  form.insertBefore(navigation, actions);

  const feedbackFor = new Map();

  questions.forEach((question, index) => {
    question.hidden = index !== currentIndex;

    const checkButton = document.createElement('button');
    checkButton.className = 'quiz-check-answer';
    checkButton.type = 'button';
    checkButton.textContent = 'Check answer';

    const feedback = document.createElement('output');
    feedback.className = 'quiz-question-feedback';
    feedback.setAttribute('aria-live', 'polite');
    feedbackFor.set(question, feedback);
    question.append(checkButton, feedback);

    checkButton.addEventListener('click', () => {
      const selected = question.querySelector('input:checked');
      if (!selected) {
        feedback.textContent = 'Choose an answer first.';
        return;
      }

      const isCorrect = selected.value === question.dataset.answer;
      question.dataset.checked = 'true';
      question.dataset.result = isCorrect ? 'correct' : 'incorrect';
      feedback.textContent = isCorrect ? 'Correct.' : 'Not quite. Try another answer.';
      result.textContent = '';
      updateProgress();
      updateNavigation();
    });

    question.addEventListener('change', () => {
      delete question.dataset.checked;
      delete question.dataset.result;
      feedback.textContent = '';
      result.textContent = '';
      updateProgress();
      updateNavigation();
    });
  });

  const updateProgress = () => {
    const checked = questions.filter((question) => question.dataset.checked === 'true').length;
    progress.value = checked;
    progressText.textContent = `${checked} of ${questions.length} checked`;
  };

  const updateNavigation = () => {
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = questions[currentIndex].dataset.result !== 'correct';
    nextButton.textContent = currentIndex === questions.length - 1 ? 'Finish test' : 'Next question';
  };

  const showQuestion = () => {
    questions.forEach((question, index) => {
      question.hidden = index !== currentIndex;
    });
    updateNavigation();
  };

  previousButton.addEventListener('click', () => {
    if (currentIndex === 0) return;
    currentIndex -= 1;
    result.textContent = '';
    showQuestion();
  });

  nextButton.addEventListener('click', () => {
    if (questions[currentIndex].dataset.result !== 'correct') return;
    if (currentIndex === questions.length - 1) {
      const score = questions.filter((question) => question.dataset.result === 'correct').length;
      result.textContent = `Test complete: ${score}/${questions.length} correct.`;
      return;
    }

    currentIndex += 1;
    result.textContent = '';
    showQuestion();
  });

  form.addEventListener('submit', (event) => event.preventDefault());

  form.addEventListener('reset', () => {
    requestAnimationFrame(() => {
      questions.forEach((question) => {
        delete question.dataset.checked;
        delete question.dataset.result;
        feedbackFor.get(question).textContent = '';
      });
      currentIndex = 0;
      result.textContent = '';
      updateProgress();
      showQuestion();
    });
  });

  updateProgress();
  showQuestion();
});