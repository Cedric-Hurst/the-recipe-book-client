const SeedRecipes = [
    {
        recipeTitle: "Crock Pot Teriyaki Pulled Pork",
        id: 1,
        favorite: true,
        servings: 8,
        timing: {prep: 5, cook: 480}, // mins convert to hours if >=60
        ingredients: [
            {name: "pork shoulder butt roast", qty: "3", measure: "lb", des: ""},
            {name: "teriyaki sauce", qty: "1", measure: "cup", des: ""},
            {name: "honey", qty: "1/3", measure: "cup", des: ""},
            {name: "apple cider vinegar", qty: "1/3", measure: "cup", des: ""},
            {name: "garlic powder", qty: "2", measure: "tsp", des: ""},
            {name: "black pepper", qty: "1", measure: "tsp", des: ""},
            {name: "crushed red pepper flakes", qty: "1", measure: "tsp", des: ""},
        ],
        instructions: [
            "Place pork roast in slow cooker",
            "Add all ingredients",
            "Cover and cook on LOW for 8 to 10 hours or HIGH for 5 to 6 hours.",
            "Shred with 2 forks"
        ],
        notes:[]
    },
    {
        recipeTitle: "Shrimp and Chorizo Chowder",
        id: 2,
        favorite: false,
        servings: 4,
        timing: {prep: 10, cook: 30}, 
        ingredients: [
            {name: "chorizo", qty: "4", measure: "oz", des:"Spanish dry-cured chorizo preferred" },
            {name: "large shrimp", qty: "1", measure: "lb", des:"peeled and deveined"},
            {name: "yellow onion", qty: "1/2", measure: "", des:" diced"},
            {name: "carrot", qty: "1", measure: "", des:"peeled and diced"},
            {name: "garlic clove", qty: "2", measure: "", des:"minced"},
            {name: "russet potato", qty: "1", measure: "", des:"peeled and diced"},
            {name: "canned diced tomatoes", qty: "15", measure: "oz", des:""},
            {name: "frozen corn", qty: "1", measure: "cup", des:"no need to defrost"},
            {name: "olive oil", qty: "1", measure: "tbsp", des:""},
            {name: "chicken stock", qty: "4", measure: "cup", des:""},
            {name: "half and half", qty: "1", measure: "cup", des:""},
            {name: "paprika", qty: "2", measure: "tsp", des:"spanish smoked paprika preferred"},
            {name: "kosher salt", qty: "1/2", measure: "tsp", des:""},
            {name: "black pepper", qty: "1/4", measure: "tsp", des:""},
            {name: "Fresh parsley", qty: "", measure: "", des:"for garnish"},
            {name: "Baguette toasts", qty: "", measure: "", des:"for dipping"},
        ],
        instructions: [
            "In a large pot over medium heat, add olive oil and cubed chorizo. Cook for a few minutes until the chorizo is browning slightly and starting to render some fat. Remove the chorizo from the pot with a slotted spoon so it doesn't burn.",
            "Add onions, carrot, and garlic to the pot. Cook, stirring occasionally, until the vegetables soften slightly, 3-4 minutes. Then add potato, paprika, salt, and pepper. Stir to combine. Add the diced tomatoes and chicken stock and bring soup to a slight simmer. Return chorizo to the pot. Simmer for 15-20 minutes until potatoes are tender.",
            "When potatoes are tender, turn heat very low so the soup is on the lowest of simmers. Stir in the frozen corn and half and half. At the very end add the peeled shrimp and poach for 2-3 minutes until they are opaque and pink and just cooked through.",
            "Serve the chowder in big bowls with a side of toasted baguette and garnished with parsley."
        ],
        notes:[]
    },
    {
        recipeTitle: "Bison burger",
        id: 3,
        favorite: false,
        servings: 8,
        timing: {prep: 15, cook: 70},
        ingredients: [
            {name: "ground bison", qty: "2", measure: "lb", des: ""},
            {name: "worcestershire sauce", qty: "1", measure: "tbsp", des: ""},
            {name: "shallot", qty: "1/2", measure: "", des: "finely chopped"},
            {name: "garlic clove", qty: "2", measure: "", des: "minced"},
            {name: "kosher salt", qty: "1 1/2", measure: "tsp", des: ""},
            {name: "black pepper", qty: "1/2", measure: "tsp", des: ""},
            {name: "coriander", qty: "1/2", measure: "tsp", des: ""},
            {name: "ground mustard", qty: "1/2", measure: "tsp", des: ""},
            {name: "butter", qty: "2", measure: "tbsp", des: ""},
            {name: "large onions", qty: "2", measure: "tbsp", des: "thinly sliced"},
            {name: "sliced white cheddar cheese", qty: "8", measure: "", des: ""},
            {name: "hamburger buns", qty: "8", measure: "", des: ""},
            {name: "romaine lettuce", qty: "", measure: "", des: " for serving"},
            {name: "mayonnaise", qty: "1/2", measure: "cup", des: ""},
            {name: "dijon mustard", qty: "1", measure: "tbsp", des: ""},
            {name: "dried oregano", qty: "1/2", measure: "tsp", des: ""}
        ],
        instructions: [
            "In a large bowl, combine bison, Worcestershire sauce, shallot, garlic, salt, pepper, coriander, and ground mustard. Form into 8 patties that are slightly larger than your hamburger buns. Let sit at room temp for 30 minutes",
            "In a large skillet over medium heat, melt butter. Add onions and cook, stirring occasionally, until golden, 20 minutes. Remove from skillet and place on a plate and tent with foil to keep warm.",
            "Return skillet to heat and cook patties for 3 minutes, flip, add cheese and cook for 3 more minutes for medium. Work in batches as necessary. Place patties on a cutting board and let rest 5 minutes.",
            "In a small bowl, combine mayonnaise, Dijon mustard, and oregano. Spread mixture on bottom buns, top with romaine, burgers, caramelized onions, and top buns."
        ],
        notes:[]
    },
    {
        recipeTitle: "Easy copycat Bdubs wings",
        id: 4,
        favorite: true,
        servings: 2,
        timing: {prep: 25, cook: 10}, 
        ingredients: [
            {name: "chicken wings", qty: "1", measure: "dozen", des: ""},
            {name: "kosher salt", qty: "", measure: "", des: ""},
            {name: "butter", qty: "2", measure: "tbsp", des: ""},
            {name: "wing sauce", qty: "", measure: "", des: "enough to cover amount of wings"},
            {name: "canola oil", qty: "", measure: "", des: "enough to fully submerge wings in"}
        ],
        instructions: [
            "Liberally salt wings with kosher salt and let stand for about 1 hour.",
            "Heat oil to 350 degrees, add wings in batches of 3 to 4 depending on size of pan, reduce and increase oil temperature as cooking.",
            "Cook wings for 10 mins, check temperature of wings, should maintain 165 degrees for at least 10 seconds.",
            "melt butter in pan, then add wing sauce and mix.",
            "when ready to serve wings, toss wings in pan then serve immediately. waiting too long to serve may cause wings to become soggy."
        ],
        notes:[]
    },
]
export default SeedRecipes;