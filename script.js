window.onload = function() {

  const app = new Vue({
    el: '#app',
    data: {
      recipes: [ { "name" : "Apple Pie",
                   "open" : false,
                   "ingredients" : [
                   "Apples",
                   "Crust",
                   "Sugar",
                   "Bacon",
                   "More Bacon"
                   ],
                   "instructions" : "Bacon ipsum dolor amet chuck boudin pastrami ground round, pork loin fatback short ribs. Cupim meatball prosciutto chuck sirloin filet mignon ribeye, fatback leberkas hamburger landjaeger turducken shank corned beef bacon. Kevin meatball meatloaf, fatback shank beef pork chop t-bone picanha bacon jowl pork boudin ribeye rump. Boudin bacon andouille, short loin tail spare ribs leberkas picanha tri-tip biltong salami doner. Rump venison doner, picanha drumstick ham hock filet mignon short ribs pig. Filet mignon rump drumstick, ham meatball jerky pig.",
                   "groups" : [
                     "breakfast",
                     "lunch",
                     "dinner",
                     "snack"
                    ]
                  },
                 { "name" : "Pear Pie",
                   "open" : false,
                   "ingredients" : [
                   "Pears",
                   "Crust",
                   "Sugar",
                   "Bacon",
                   "More Bacon"],
                   "instructions" : "Bacon ipsum dolor amet chuck boudin pastrami ground round, pork loin fatback short ribs. Cupim meatball prosciutto chuck sirloin filet mignon ribeye, fatback leberkas hamburger landjaeger turducken shank corned beef bacon. Kevin meatball meatloaf, fatback shank beef pork chop t-bone picanha bacon jowl pork boudin ribeye rump. Boudin bacon andouille, short loin tail spare ribs leberkas picanha tri-tip biltong salami doner. Rump venison doner, picanha drumstick ham hock filet mignon short ribs pig. Filet mignon rump drumstick, ham meatball jerky pig.",
                   "groups" : [ "lunch" ]
                  },
                  { "name" : "Thing that is not Apple Pie",
                    "open" : false,
                    "ingredients" : [
                    "Starfruit",
                    "Crust",
                    "Sugar",
                    "Bacon",
                    "More Bacon"],
                    "instructions" : "Bacon ipsum dolor amet chuck boudin pastrami ground round, pork loin fatback short ribs. Cupim meatball prosciutto chuck sirloin filet mignon ribeye, fatback leberkas hamburger landjaeger turducken shank corned beef bacon. Kevin meatball meatloaf, fatback shank beef pork chop t-bone picanha bacon jowl pork boudin ribeye rump. Boudin bacon andouille, short loin tail spare ribs leberkas picanha tri-tip biltong salami doner. Rump venison doner, picanha drumstick ham hock filet mignon short ribs pig. Filet mignon rump drumstick, ham meatball jerky pig.",
                    "groups" : [
                      "breakfast" ,
                      "snack"
                     ]
                   }
      ],
      meals: [ "breakfast", "lunch", "dinner", "snack" ],
      mealFilterGroups: [ ],
      modalOnOff: "modal ",
      recipeListVisible: false,
      filterControlsVisible: false,
      newRecipeName: "",
      newRecipeIngredients: "",
      newRecipeInstructions: "",
      newRecipeGroups: [ ],
      selectedRecipeName: "",
      selectedRecipeIngredients: [ ],
      selectedRecipeInstructions: "",
      selectedRecipeGroups: [ ]
    },
    computed: {
      filteredRecipes: function() {
        if(this.mealFilterGroups.length !== 0){
          return this.getFilteredMeals();
        }
        else {
          return this.recipes;
        }
      }
    },
    created: function () {
      this.selectRecipe(this.recipes[0]);
    },
    methods: {
      addRecipe: function () {
        var ingredientsArray;
        if(this.newRecipeName !== "" && this.newRecipeIngredients !== "" && this.newRecipeInstructions !== ""){
          ingredientsArray = this.newRecipeIngredients.split(",");
          this.recipes.push({ "name" : this.newRecipeName,
                              "open" : false,
                              "ingredients" : ingredientsArray,
                              "instructions" : this.newRecipeInstructions,
                              "groups" : this.newRecipeGroups
                            });
          this.clearRecipeWindow();
          this.closeNewRecipeWindow();
        }
      },
      clearRecipeWindow: function () {
        this.newRecipeName = "";
        this.newRecipeIngredients = "";
        this.newRecipeInstructions = "";
        this.newRecipeGroups = [ ];
      },
      toggleRecipeList: function () {
        this.recipeListVisible = !this.recipeListVisible;
      },
      toggleFilterControls: function() {
        this.filterControlsVisible = !this.filterControlsVisible;
      },
      selectRecipe: function (recipe) {
        this.selectedRecipeName = recipe.name;
        this.selectedRecipeIngredients = recipe.ingredients;
        this.selectedRecipeInstructions = recipe.instructions;
        this.selectedRecipeGroups = recipe.groups;
      },
      showNewRecipeWindow: function () {
        this.modalOnOff = this.modalOnOff + "is-active";
      },
      closeNewRecipeWindow: function () {
        this.modalOnOff = "modal ";
      },
      getFilteredMeals: function() {
        var mealGroups = this.mealFilterGroups;
        var recipes = this.recipes;
        var sortedRecipes = [];
        for(var recipe in recipes){
          for(group in mealGroups){
            if(recipes[recipe].groups.indexOf(mealGroups[group]) >= 0 ){
              sortedRecipes.push(recipes[recipe]);
              break;
            }
          }
        }
        return sortedRecipes;
      }
    }
  })

Vue.config.devtools = true;

}
