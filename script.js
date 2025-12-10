/* --- 1. Theme Switcher (Зміна теми) --- */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Перевіряємо, чи є збережена тема в LocalStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Анімація кнопки
    themeToggle.style.transform = 'scale(0.8)';
    setTimeout(() => themeToggle.style.transform = 'scale(1)', 200);

    // Зберігаємо вибір користувача
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

/* --- 2. Typewriter Effect (Ефект друку) --- */
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Поточний індекс слова
        const current = this.wordIndex % this.words.length;
        // Повне слово
        const fullTxt = this.words[current];

        // Перевірка: друкуємо чи видаляємо
        if (this.isDeleting) {
            // Видаляємо символ
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Додаємо символ
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Вставка в HTML
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Швидкість друку
        let typeSpeed = 200;
        if (this.isDeleting) {
            typeSpeed /= 2; // Видаляємо швидше
        }

        // Якщо слово повністю надруковано
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait; // Пауза перед видаленням
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++; // Перехід до наступного слова
            typeSpeed = 500; // Пауза перед початком нового
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Ініціалізація ефекту друку при завантаженні
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    
    new TypeWriter(txtElement, words, wait);
}

/* --- 3. Mobile Burger Menu --- */
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
});