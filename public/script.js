document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/dictionary.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('dictionary-container');
            data.message.words.forEach(word => {
                const wordDiv = document.createElement('div');
                wordDiv.classList.add('word-item');
                
                const wordTitle = document.createElement('p');
                wordTitle.innerHTML = `<strong>Mi'gmaq Word:</strong> ${word.word}`;
                wordDiv.appendChild(wordTitle);
                
                const wordType = document.createElement('p');
                wordType.innerHTML = `<strong>Part of speech:</strong> ${word.type}`;
                wordDiv.appendChild(wordType);
                
                const wordDefinitions = document.createElement('p');
                wordDefinitions.innerHTML = `<strong>Definition:</strong> ${word.definitions.join(', ')}`;
                wordDiv.appendChild(wordDefinitions);
                
                const wordTranslations = document.createElement('p');
                wordTranslations.innerHTML = `<strong>Usage:</strong> ${word.translations.join(', ')}`;
                wordDiv.appendChild(wordTranslations);
                
                // for use later.
                /*const wordUsagesTitle = document.createElement('p');
                wordUsagesTitle.innerHTML = `<strong>Example:</strong>`;
                wordDiv.appendChild(wordUsagesTitle);*/

                word.usages.forEach(usage => {
                    const usageTranslation = document.createElement('p');
                    usageTranslation.innerHTML = `<strong>Mi'gmag Translation:</strong> ${usage.translation}`;
                    wordDiv.appendChild(usageTranslation);

                    const usageEnglish = document.createElement('p');
                    usageEnglish.innerHTML = `<strong>English Translation:</strong> ${usage.english}`;
                    wordDiv.appendChild(usageEnglish);
                });
                
                container.appendChild(wordDiv);
            });
        })
        .catch(error => console.error('Error fetching dictionary:', error));
});
