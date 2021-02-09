// event handler for searching item 
const foodContainer = document.getElementById("foodBox");
const detail = document.getElementById('details');
document.getElementById("search_meal").addEventListener("click", () => {
  const input = document.getElementById("input_meal").value;
  detail.style.display = "none";
  foodContainer.innerHTML = "";
  getMealData(input);
});

// Fetching meal data from API
const getMealData = (inputMeal) => {
  if(inputMeal === "" || inputMeal == " " || inputMeal === undefined){
    alert('invalid search');
    return;
  }
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(data.meals === null){
        alert('No food items found');
      }else{
        foodBlock(data.meals);
      }
    } 
)};
// makingc individulal food item 
const foodBlock = (meals) => {
  meals.forEach((meal) => {
    console.log(meal.strMeal);
    const foodCard = document.createElement('div');
    foodCard.className = 'col';
    foodCard.innerHTML = `
    <div class="card">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center">${meal.strMeal}</h5>
      </div>
    </div>
        `;
        foodContainer.appendChild(foodCard);
        foodCard.addEventListener('click', () =>{
          showIndividual(meal);
        })
  });

};
// showIndividual food data 
const showIndividual = (meal) =>{
  const ingredientsList = document.getElementById('ingredientsList');
  const itemTitle = document.getElementById('foodTitle');
  const itemImage = document.getElementById('foodImage');
  itemTitle.innerText = meal.strMeal;
  itemImage.setAttribute('src', meal.strMealThumb);
  ingredientsList.innerHTML = "";
  detail.style.display = "block";
  document.documentElement.scrollTop = 0;
  for (let item = 0; item < 20; item++) {
    const ingredient = "strIngredient" + (item+1);
    const measure = "strMeasure" + (item+1);
    if(meal[ingredient]){
        const singleItem = document.createElement('p');
        singleItem.innerText = `${meal[ingredient]} ${meal[measure]}`;
        ingredientsList.appendChild(singleItem);
    }
}
}
