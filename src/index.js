document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const votesInput = document.getElementById("votes");
    let currentCharacter = null;

    // Fetch characters and display in character bar
    fetch(baseUrl)
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.addEventListener("click", () => displayCharacterDetails(character));
                characterBar.appendChild(span);
            });
        });

    // Display character details
    function displayCharacterDetails(character) {
        currentCharacter = character;
        nameElement.textContent = character.name;
        imageElement.src = character.image;
        imageElement.alt = character.name;
        voteCount.textContent = character.votes;
    }

    // Handle vote submission
    votesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!currentCharacter) return;
        
        const newVotes = parseInt(votesInput.value) || 0;
        currentCharacter.votes += newVotes;
        voteCount.textContent = currentCharacter.votes;
        votesInput.value = "";
    });
});
