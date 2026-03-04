const loadLessons = () => {
    fetch ("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((res) => res.json())   //promise of json data
    .then((json) => displayLessons(json.data));
}


// button function
const displayLessons = (lessons) => {
    // 1 get the container & empty
    const levelContainer = document.getElementById ("level-container");
    levelContainer.innerHTML = "";
    // 2 get into every lessons
    for(const lesson of lessons){
        // 2.1 create element
        console.log(lesson);
        const btnDiv = document.createElement ("div");
        btnDiv.innerHTML =`
        <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord (${lesson.level_no})" 
        class="btn btn-outline btn-primary lesson-btn" href="">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no} </button>
        `;
        
        // 2.2 append into container
        levelContainer.append (btnDiv)
    }
}



// button color remove function
const removeActive = () =>{
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};


const loadLevelWord = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch (url)
    .then ((res) => res.json())
    .then ((data) => {
      removeActive();    // remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`)
      // console.log(clickBtn);
      clickBtn.classList.add("active") // add active button
      displayLevelWords(data.data);
    })
}



// card Function
const displayLevelWords = (words) =>{
    // 1 get the container & empty
    const wordContainer = document.getElementById ("word-container");
    wordContainer.innerHTML = "";

    if(words.length === 0){
        wordContainer.innerHTML = `
          <div class="text-center col-span-full space-y-5 bg-white p-5">
            <div><i class="fa-solid text-7xl fa-triangle-exclamation"></i></div>
            <p class="text-xs">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="font-bold text-2xl">নেক্সট Lesson এ যান</h1>
          </div>
        </div>
        `
        return;
    }


    // 2 get into every lessons
    for(const word of words) {
        // 2.1 create element
        console.log(word);
        const card = document.createElement ("div");
        card.innerHTML = `
                  <div class=" bg-base-100 rounded-xl w-full shadow-sm py-5 px-4 space-x-4">
            <div class="card-body items-center">
              <h2 class="card-title">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
              <p>Meaning /Pronounciation</p>
              <h2 class="card-title">"${word.meaning ? word.meaning :  "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</h2>
            </div>
            <div class="flex justify-between p-5">
              <button onclick = "my_modal_5.showModal()" class="btn bg-slate-300 hover:bg-sky-500"><i class="fa-solid fa-circle-exclamation"></i></button>
              <button class="btn bg-slate-300 hover:bg-sky-500"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
        `;
        // 2.2 append into container
        wordContainer.append(card)
    };
}
loadLessons ();