const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};


const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsed = JSON.parse(savedData);
    formData = { ...formData, ...parsed };

    if (parsed.email) form.elements.email.value = parsed.email;
    if (parsed.message) form.elements.message.value = parsed.message;
  } catch (error) {
    console.error('Помилка при зчитуванні зі сховища:', error);
  }
}

form.addEventListener('input', e => {
  const { name, value } = e.target;
  formData[name] = value.trim(); 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form data submitted:', formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});