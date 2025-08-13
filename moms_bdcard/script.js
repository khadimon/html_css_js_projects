// Firebase configuration - commented out
/*
const firebaseConfig = {
    apiKey: "AIzaSyDkhY22XgcjZ2v2Zg4hn9S8JHby2LcTsU8",
    authDomain: "mom-s-birthday-9be05.firebaseapp.com",
    databaseURL: "https://mom-s-birthday-9be05-default-rtdb.firebaseio.com",
    projectId: "mom-s-birthday-9be05",
    storageBucket: "mom-s-birthday-9be05.firebasestorage.app",
    messagingSenderId: "802483484519",
    appId: "1:802483484519:web:e2daef5e95e280165b61c2",
    measurementId: "G-ZG9SHW3644"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
*/

document.addEventListener('DOMContentLoaded', function() {
    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    const wishList = document.querySelector('.wish-list');
    const savedWishesList = document.querySelector('.saved-wishes');
    
    // Clear any existing wishes
    wishList.innerHTML = '';
    savedWishesList.innerHTML = '';
    localStorage.removeItem('momWishes');

    function updateLanguage(lang) {
        // Hide all language elements
        document.querySelectorAll('.title-en, .title-ru, .quote-en, .quote-ru, .gratitude-en, .gratitude-ru').forEach(el => {
            el.style.display = 'none';
        });
        
        // Show selected language elements
        document.querySelectorAll(`.title-${lang}, .quote-${lang}, .gratitude-${lang}`).forEach(el => {
            el.style.display = 'block';
        });
        
        // Update active button
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });

        // Update HTML lang attribute for placeholder switching
        document.documentElement.setAttribute('lang', lang);

        // Update wishes title and save button
        if (lang === 'ru') {
            document.querySelector('.wishes-title').textContent = 'Мамины Пожелания на Год 2025✨';
            document.querySelector('.save-wishes').textContent = 'Сохранить Пожелания';
            document.querySelector('.saved-wishes-title').textContent = 'Сохраненные Пожелания ❤️';
        } else {
            document.querySelector('.wishes-title').textContent = "Mom's Wishes for Year 2025✨";
            document.querySelector('.save-wishes').textContent = 'Save Wishes';
            document.querySelector('.saved-wishes-title').textContent = 'Saved Wishes ❤️';
        }
    }
    
    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            updateLanguage(lang);
        });
    });
    
    // Save wishes functionality
    function saveWishes() {
        const newWish = wishList.innerHTML;
        if (newWish.trim() === '') return;
        
        /* Firebase code commented out
        // Save to Firebase
        const timestamp = new Date().toISOString();
        database.ref('wishes').push({
            wish: newWish,
            timestamp: timestamp,
            language: document.querySelector('.lang-btn.active').dataset.lang
        });
        */
        
        // Get existing wishes or initialize empty array
        const existingWishes = JSON.parse(localStorage.getItem('momWishes') || '[]');
        existingWishes.push(newWish);
        localStorage.setItem('momWishes', JSON.stringify(existingWishes));
        
        // Update saved wishes display
        savedWishesList.innerHTML = existingWishes
            .map(wish => `<div class="wish-bubble">${wish}</div>`)
            .join('');
        savedWishesList.style.display = 'block';
        
        // Clear input
        wishList.innerHTML = '';
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'save-notification';
        const isRussian = document.querySelector('.lang-btn.active').dataset.lang === 'ru';
        notification.textContent = isRussian ? '✨ Сохранено! ❤️' : '✨ Saved! ❤️';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Handle Enter key
    wishList.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            saveWishes();
        }
    });
    
    document.querySelector('.save-wishes').addEventListener('click', saveWishes);
    
    /* Firebase listener commented out
    database.ref('wishes').on('value', (snapshot) => {
        const wishes = snapshot.val();
        if (wishes) {
            const wishesArray = Object.values(wishes);
            savedWishesList.innerHTML = wishesArray
                .map(wishData => `<div class="wish-bubble">${wishData.wish}</div>`)
                .join('');
            savedWishesList.style.display = 'block';
        }
    });
    */
    
    // Initialize with English
    updateLanguage('en');
}); 