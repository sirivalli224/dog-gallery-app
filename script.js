 // Fetch all breeds on page load and fill dropdown
async function loadBreeds() {
  const dropdown = document.getElementById("breedDropdown");
  const res = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await res.json();

  const breeds = Object.keys(data.message);
  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
    dropdown.appendChild(option);
  });
}

async function fetchBreedDogs() {
  const breed = document.getElementById("breedDropdown").value;
  const container = document.getElementById("dogContainer");
  container.innerHTML = "Loading...";

  if (!breed) {
    container.innerHTML = "Please select a breed.";
    return;
  }

  try {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/5`);
    const data = await res.json();

    container.innerHTML = "";
    data.message.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      container.appendChild(img);
    });
  } catch (error) {
    console.error("Error:", error);
    container.innerHTML = "Error loading dogs.";
  }
}

loadBreeds(); // Load breed list when page opens