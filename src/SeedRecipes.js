import { v4 as uuid } from 'uuid'
const SeedRecipes = [
    {
        recipeTitle: "Crock Pot Teriyaki Pulled Pork",
        id: uuid(),
        favorite: true,
        servings: 8,
        catagories: ["crock pot", "pork", "easy"],
        timing: {prepTime:{prepHr: 0, prepMin: 5}, cookTime:{cookHr: 8, cookMin: 0}}, 
        ingredients: [
            {ingredient: "pork shoulder butt roast", qty: "3", measure: "lb", description: ""},
            {ingredient: "teriyaki sauce", qty: "1", measure: "c", description: ""},
            {ingredient: "honey", qty: "1/3", measure: "c", description: ""},
            {ingredient: "apple cider vinegar", qty: "1/3", measure: "c", description: ""},
            {ingredient: "garlic powder", qty: "2", measure: "tsp", description: ""},
            {ingredient: "black pepper", qty: "1", measure: "tsp", description: ""},
            {ingredient: "crushed red pepper flakes", qty: "1", measure: "tsp", description: ""},
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
        id: uuid(),
        favorite: false,
        servings: 4,
        catagories: ["shrimp", "pork", "soup", "chowder"],
        timing: {prepTime:{prepHr: 0, prepMin: 10}, cookTime:{cookHr: 0, cookMin: 30}}, 
        ingredients: [
            {ingredient: "chorizo", qty: "4", measure: "oz", description:"Spanish dry-cured chorizo preferred" },
            {ingredient: "large shrimp", qty: "1", measure: "lb", description:"peeled and deveined"},
            {ingredient: "yellow onion", qty: "1/2", measure: "", description:" diced"},
            {ingredient: "carrot", qty: "1", measure: "", description:"peeled and diced"},
            {ingredient: "garlic clove", qty: "2", measure: "", description:"minced"},
            {ingredient: "russet potato", qty: "1", measure: "", description:"peeled and diced"},
            {ingredient: "canned diced tomatoes", qty: "15", measure: "oz", description:""},
            {ingredient: "frozen corn", qty: "1", measure: "c", description:"no need to defrost"},
            {ingredient: "olive oil", qty: "1", measure: "tbsp", description:""},
            {ingredient: "chicken stock", qty: "4", measure: "c", description:""},
            {ingredient: "half and half", qty: "1", measure: "c", description:""},
            {ingredient: "paprika", qty: "2", measure: "tsp", description:"spanish smoked paprika preferred"},
            {ingredient: "kosher salt", qty: "1/2", measure: "tsp", description:""},
            {ingredient: "black pepper", qty: "1/4", measure: "tsp", description:""},
            {ingredient: "Fresh parsley", qty: "", measure: "", description:"for garnish"},
            {ingredient: "Baguette toasts", qty: "", measure: "", description:"for dipping"},
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
        id: uuid(),
        favorite: false,
        servings: 8,
        catagories: ["burger", "bison"],
        timing: {prepTime:{prepHr: 0, prepMin: 15}, cookTime:{cookHr: 1, cookMin: 10}},
        ingredients: [
            {ingredient: "ground bison", qty: "2", measure: "lb", description: ""},
            {ingredient: "worcestershire sauce", qty: "1", measure: "tbsp", description: ""},
            {ingredient: "shallot", qty: "1/2", measure: "", description: "finely chopped"},
            {ingredient: "garlic clove", qty: "2", measure: "", description: "minced"},
            {ingredient: "kosher salt", qty: "1 1/2", measure: "tsp", description: ""},
            {ingredient: "black pepper", qty: "1/2", measure: "tsp", description: ""},
            {ingredient: "coriander", qty: "1/2", measure: "tsp", description: ""},
            {ingredient: "ground mustard", qty: "1/2", measure: "tsp", description: ""},
            {ingredient: "butter", qty: "2", measure: "tbsp", description: ""},
            {ingredient: "large onions", qty: "2", measure: "tbsp", description: "thinly sliced"},
            {ingredient: "sliced white cheddar cheese", qty: "8", measure: "", description: ""},
            {ingredient: "hamburger buns", qty: "8", measure: "", description: ""},
            {ingredient: "romaine lettuce", qty: "", measure: "", description: " for serving"},
            {ingredient: "mayonnaise", qty: "1/2", measure: "c", description: ""},
            {ingredient: "dijon mustard", qty: "1", measure: "tbsp", description: ""},
            {ingredient: "dried oregano", qty: "1/2", measure: "tsp", description: ""}
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
        id: uuid(),
        favorite: true,
        servings: 2,
        catagories: ["easy", "copycat", "wings", "chicken"],
        timing: {prepTime:{prepHr: 0, prepMin: 25}, cookTime:{cookHr: 0, cookMin: 10}}, 
        ingredients: [
            {ingredient: "chicken wings", qty: "1", measure: "dozen", description: ""},
            {ingredient: "kosher salt", qty: "", measure: "", description: ""},
            {ingredient: "butter", qty: "2", measure: "tbsp", description: ""},
            {ingredient: "wing sauce", qty: "", measure: "", description: "enough to cover amount of wings"},
            {ingredient: "canola oil", qty: "", measure: "", description: "enough to fully submerge wings in"}
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