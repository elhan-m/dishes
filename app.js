const root = document.querySelector(".root");
const btns = document.querySelectorAll("button");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=";

const getMeals = (letter = "b") => {
    fetch(url + letter)
        .then((res) => res.json())
        .then((data) => {
            if (data.meals === null) {
                root.innerHTML = "No meals";
            } else {
                showMeals(data.meals);
            }
        });
};
getMeals();

const searchMeals = (query) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.meals === null) {
                root.innerHTML = "No meals found";
            } else {
                showMeals(data.meals);
            }
        });
};

function showMeals(arr) {
    root.innerHTML = "";
    for (const obj of arr) {
        root.innerHTML += `
        <div class="card" onclick="getMealById(${obj.idMeal})">
        <img src=${obj.strMealThumb} />
        <h4>${obj.strMeal}</h4>
        </div>`;
    }
}

btns.forEach((btn) => {
    btn.onclick = () => {
        getMeals(btn.innerText);
    };
});

searchBtn.onclick = () => {
    const query = searchInput.value.trim();
    if (query) {
        searchMeals(query);
    }
};

function getMealById(id) {
    console.log(id);
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.meals[0]);
            showSingleMeal(data.meals[0]);
            const meal = data.meals[0];
            let ingredients = [];

            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`].length > 0) {
                    console.log(meal[`strIngredient${i}`]);
                    ingredients.push(meal[`strIngredient${i}`]);
                }
            }
            showIngrs(ingredients);
            console.log(ingredients);
        });
}

function showSingleMeal(obj) {
    root.innerHTML = `
    <div>
    <h1>${obj.strMeal}</h1>
    <img src=${obj.strMealThumb}>
    <iframe width="560" height="315" src=${obj.strYoutube.replace('/watch?v=', '/embed/')} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <p>${obj.strInstructions}</p>
    </div>`;
}

function showIngrs(arr) {
    const ul = document.createElement("ul");
    root.appendChild(ul);
    for (const el of arr) {
        ul.innerHTML += `<li>
    <img src="https://www.themealdb.com/images/ingredients/${el}-Small.png" />
    <h2>${el}</h2>
    </li>`;
    }
}