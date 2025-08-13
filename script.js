
// Render quiz based on URL course param and simple client-side grading.
const QUESTIONS = {
  DCA: [
    { q: 'MS Word किस काम आता है?', opts:['इमेज','टेक्स्ट डॉक्यूमेंट','म्यूजिक'], ans:1 },
    { q: 'Copy shortcut?', opts:['Ctrl+V','Ctrl+C','Ctrl+X'], ans:1 }
  ],
  ADCA: [
    { q: 'DBMS का अर्थ?', opts:['Data Base Management System','Drive Base'], ans:0 },
    { q: 'Presentation extension?', opts:['.pptx','.xls'], ans:0 }
  ],
  PY: [
    { q: 'Python creator?', opts:['Guido','Dennis'], ans:0 },
    { q: 'List symbol?', opts:['()','[]'], ans:1 }
  ]
};

function getCourse() {
  const p = new URLSearchParams(window.location.search);
  return p.get('course') || 'DCA';
}

function renderQuiz() {
  const course = getCourse();
  const qs = QUESTIONS[course] || [];
  const container = document.getElementById('quizContainer');
  container.innerHTML = '';
  qs.forEach((q,i)=>{
    const div = document.createElement('div');
    div.innerHTML = '<p><strong>'+(i+1)+'. '+q.q+'</strong></p>' + q.opts.map((o,idx)=>`<label><input type="radio" name="q${i}" value="${idx}"> ${o}</label><br>`).join('');
    container.appendChild(div);
  });
}

function grade() {
  const course = getCourse();
  const qs = QUESTIONS[course] || [];
  let correct=0;
  for(let i=0;i<qs.length;i++){
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    if(sel && Number(sel.value)===qs[i].ans) correct++;
  }
  const score = Math.round((correct/qs.length)*100);
  if(score<60){ alert('You scored '+score+'%. Minimum 60% required.'); return; }
  const name = prompt('Enter your full name for certificate:');
  if(!name) return alert('Name required.');
  localStorage.setItem('studentName', name);
  localStorage.setItem('courseName', course);
  localStorage.setItem('score', String(score));
  // redirect to payment page for UPI payment
  window.location.href = 'payment.html?course='+course;
}

document.getElementById('submitExam')?.addEventListener('click', grade);
renderQuiz();
