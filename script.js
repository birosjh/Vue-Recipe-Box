window.onload = function() {
  Vue.component('menu-list', {
    props: [
      "recipes",
      "meals",
      "extraclasses"
    ],
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
    data: function() {
      return {
        filterControlsVisible: false,
        mealFilterGroups: [ ],
      }
    },
    template:
    `<div class="recipe-list" :class="extraclasses" v-cloak>
      <aside class="menu">
        <ul class="menu-list">
          <li @click="toggleFilterControls" id="filter-list-item">
            <i class="fa fa-chevron-down"></i>
            What Kinda Recipe?
            <div id="filter-controls" v-show="filterControlsVisible">
              <p class="control">
                <label class="checkbox" v-for="meal in meals">
                  <input type="checkbox" :value='meal' v-model="mealFilterGroups">
                  {{ meal }}
                </label>
              </p>
            </div>
          </li>
          <li v-for="recipe in filteredRecipes" @click="selectRecipe(recipe)"><a>{{ recipe.name }}</a></li>
        </ul>
      </aside>
    </div>`,
    methods: {
      toggleFilterControls: function() {
        this.filterControlsVisible = !this.filterControlsVisible;
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
      },
      selectRecipe: function(recipe){
        this.$emit('recipe-selected', recipe);
      }
    }
  })


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
      editing: false,
      selectedRecipeName: "",
      selectedRecipeIngredients: [ ],
      selectedRecipeInstructions: "",
      selectedRecipeGroups: [ ]
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
          this.clearNewRecipeWindow();
          this.closeNewRecipeWindow();
        }
      },
      updateRecipeWindow: function(recipeObject){
        this.newRecipeName = recipeObject.name;
        this.newRecipeIngredients = recipeObject.ingredients.join(",");
        this.newRecipeInstructions = recipeObject.instructions;
        this.newRecipeGroups = recipeObject.groups;
      },
      clearNewRecipeWindow: function () {
        var clearObject = {
          name: "",
          ingredients: [],
          instructions: "",
          groups: [ ]
        }
        this.updateRecipeWindow(clearObject)
      },
      toggleRecipeList: function () {
        this.recipeListVisible = !this.recipeListVisible;
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
        if(this.editing){
          this.editing = !this.editing;
        }
        this.clearNewRecipeWindow();
        this.modalOnOff = "modal ";
      },
      findRecipeIndexByName: function(name) {
        var indexOfRecipe = this.recipes.findIndex(recipe => recipe.name === name)
        console.log(indexOfRecipe);
        return indexOfRecipe;
      },
      editRecipe: function(name) {
        this.editing = !this.editing;

        var recipeIndex = this.findRecipeIndexByName(name);
        var recipeToEdit = this.recipes[recipeIndex];

        this.showNewRecipeWindow();
        this.updateRecipeWindow(recipeToEdit);
      },
      saveRecipeEdit: function() {
        console.log("delete!");
      },
      deleteRecipe: function() {
        console.log("delete!");
      }
    }
  })

Vue.config.devtools = true;

}
