import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Initial Preset Recipes for Foodie App
const INITIAL_RECIPES = [
  {
    id: '1',
    name: 'Fluffy Blueberry Pancakes',
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=80',
    prepTime: '20 mins',
    servings: '4 servings',
    calories: '350 kcal',
    difficulty: 'Easy',
    isFavorite: true,
    isUserCreated: false,
    ingredients: [
      '1 1/2 cups all-purpose flour',
      '3 1/2 teaspoons baking powder',
      '1 tablespoon white sugar',
      '1 1/4 cups milk',
      '1 fresh egg',
      '3 tablespoons melted butter',
      '1 cup fresh blueberries',
      'Pure maple syrup for serving',
    ],
    instructions: [
      'Sift flour, baking powder, and sugar together in a large bowl.',
      'Pour milk, egg, and melted butter into the center of the dry ingredients and whisk until smooth.',
      'Gently fold in the fresh blueberries.',
      'Heat a lightly oiled griddle or frying pan over medium-high heat.',
      'Pour batter onto the griddle, using approximately 1/4 cup for each pancake.',
      'Brown on both sides and serve hot with warm maple syrup.',
    ],
  },
  {
    id: '2',
    name: 'Classic Avocado Toast',
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    prepTime: '10 mins',
    servings: '2 servings',
    calories: '240 kcal',
    difficulty: 'Easy',
    isFavorite: true,
    isUserCreated: false,
    ingredients: [
      '2 slices artisan sourdough bread',
      '1 ripe Haas avocado',
      '1/2 lemon, juiced',
      'Pinch of red pepper chili flakes',
      'Extra virgin olive oil',
      'Sea salt and freshly ground black pepper',
    ],
    instructions: [
      'Toast sourdough slices in a toaster or lightly fry in olive oil until golden and crisp.',
      'Cut avocado in half, remove pit, and scoop flesh into a small bowl.',
      'Mash coarsely with lemon juice, sea salt, and black pepper.',
      'Spread avocado generously on toasted bread.',
      'Drizzle with olive oil and sprinkle chili flakes before serving.',
    ],
  },
  {
    id: '3',
    name: 'Italian Margherita Pizza',
    category: 'Italian',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=80',
    prepTime: '30 mins',
    servings: '3 servings',
    calories: '580 kcal',
    difficulty: 'Medium',
    isFavorite: true,
    isUserCreated: false,
    ingredients: [
      '1 ball artisan pizza dough',
      '1/2 cup San Marzano tomato sauce',
      '150g fresh mozzarella cheese, sliced',
      'Handful of fresh basil leaves',
      '2 tbsp extra virgin olive oil',
      'Sea salt to taste',
    ],
    instructions: [
      'Preheat oven and pizza stone to 475°F (245°C).',
      'Stretch pizza dough on a floured surface into a 12-inch round circle.',
      'Spread San Marzano tomato sauce evenly over dough, leaving a 1/2-inch border.',
      'Arrange fresh mozzarella slices across the sauce.',
      'Bake for 12-15 minutes until crust is browned and cheese is bubbling.',
      'Garnish with fresh basil leaves and a drizzle of olive oil before slicing.',
    ],
  },
  {
    id: '4',
    name: 'Spaghetti Carbonara',
    category: 'Italian',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=80',
    prepTime: '20 mins',
    servings: '4 servings',
    calories: '610 kcal',
    difficulty: 'Medium',
    isFavorite: false,
    isUserCreated: false,
    ingredients: [
      '400g spaghetti pasta',
      '150g guanciale or pancetta, diced',
      '4 large egg yolks + 1 whole egg',
      '100g freshly grated Pecorino Romano cheese',
      'Freshly cracked black pepper',
      'Salt for boiling water',
    ],
    instructions: [
      'Bring a large pot of salted water to boil and cook spaghetti until al dente.',
      'In a skillet, crisp the pancetta or guanciale over medium heat until golden.',
      'In a bowl, whisk eggs, egg yolks, grated Pecorino, and abundant black pepper.',
      'Drain pasta, reserving 1/2 cup of hot pasta water.',
      'Toss pasta into skillet with pancetta off the heat.',
      'Pour egg mixture over pasta while stirring rapidly to create a glossy, creamy sauce.',
    ],
  },
  {
    id: '5',
    name: 'Grilled Chicken Caesar Salad',
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=80',
    prepTime: '25 mins',
    servings: '2 servings',
    calories: '420 kcal',
    difficulty: 'Medium',
    isFavorite: false,
    isUserCreated: false,
    ingredients: [
      '2 chicken breasts, grilled and sliced',
      '1 large head romaine lettuce, chopped',
      '1/2 cup garlic herb croutons',
      '1/3 cup grated Parmesan cheese',
      '1/4 cup creamy Caesar dressing',
      'Lemon wedges and black pepper',
    ],
    instructions: [
      'Season chicken breasts with olive oil, salt, and pepper; grill for 6 mins per side.',
      'Let chicken rest for 5 minutes, then slice into thin strips.',
      'Wash and chop crisp romaine lettuce, tossing it into a chilled bowl.',
      'Toss lettuce with creamy Caesar dressing until coated.',
      'Top with sliced chicken, crispy croutons, and grated Parmesan cheese.',
    ],
  },
  {
    id: '6',
    name: 'Spicy Beef Tacos',
    category: 'Mexican',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&auto=format&fit=crop&q=80',
    prepTime: '25 mins',
    servings: '4 servings',
    calories: '490 kcal',
    difficulty: 'Easy',
    isFavorite: false,
    isUserCreated: false,
    ingredients: [
      '500g lean ground beef',
      '1 packet Mexican taco seasoning',
      '8 corn tortillas or taco shells',
      '1 cup shredded cheddar cheese',
      '1 cup diced tomatoes and onions',
      'Sour cream and fresh cilantro',
    ],
    instructions: [
      'Brown ground beef in a skillet over medium heat, draining excess fat.',
      'Stir in taco seasoning and 1/3 cup water; simmer for 5 minutes.',
      'Warm tortillas in a dry pan or microwave.',
      'Fill tortillas with seasoned beef.',
      'Top with shredded cheese, salsa, sour cream, and fresh cilantro.',
    ],
  },
  {
    id: '7',
    name: 'Creamy Tomato Basil Soup',
    category: 'Soups',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    prepTime: '30 mins',
    servings: '4 servings',
    calories: '220 kcal',
    difficulty: 'Easy',
    isFavorite: false,
    isUserCreated: false,
    ingredients: [
      '1 kg ripe Roma tomatoes',
      '1 medium yellow onion, diced',
      '4 garlic cloves, minced',
      '2 cups vegetable broth',
      '1/2 cup heavy cream or coconut milk',
      '1/4 cup fresh basil leaves',
      'Salt and black pepper',
    ],
    instructions: [
      'Sauté diced onion and garlic in olive oil until fragrant and translucent.',
      'Add chopped tomatoes and vegetable broth; bring to a boil.',
      'Reduce heat and simmer uncovered for 20 minutes.',
      'Blend soup until silky smooth using an immersion blender.',
      'Stir in heavy cream and fresh basil; season with salt and pepper.',
    ],
  },
  {
    id: '8',
    name: 'Fresh Acai Smoothie Bowl',
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop&q=80',
    prepTime: '15 mins',
    servings: '2 servings',
    calories: '290 kcal',
    difficulty: 'Easy',
    isFavorite: false,
    isUserCreated: false,
    ingredients: [
      '2 frozen acai puree packets',
      '1 ripe frozen banana',
      '1/2 cup almond milk',
      '1/2 cup fresh strawberries and blueberries',
      '2 tbsp organic granola',
      '1 tbsp chia seeds and toasted coconut flakes',
    ],
    instructions: [
      'Add frozen acai, frozen banana, and almond milk to a high-speed blender.',
      'Blend on low until thick and smooth (sorbet-like consistency).',
      'Scoop into breakfast bowls.',
      'Arrange sliced strawberries, blueberries, granola, and chia seeds on top.',
    ],
  },
  {
    id: '9',
    name: 'Warm Chocolate Lava Cake',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    prepTime: '25 mins',
    servings: '2 servings',
    calories: '460 kcal',
    difficulty: 'Hard',
    isFavorite: false,
    isUserCreated: false,
    ingredients: [
      '100g high-grade bittersweet dark chocolate',
      '1/2 cup unsalted butter',
      '2 eggs + 2 egg yolks',
      '1/4 cup granulated sugar',
      '2 tbsp all-purpose flour',
      'Vanilla ice cream for serving',
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Butter and dust two ramekins with cocoa powder.',
      'Melt chocolate and butter together in a microwave-safe bowl.',
      'Whisk eggs, yolks, and sugar in a bowl until pale and thick.',
      'Fold melted chocolate and flour into egg mixture gently.',
      'Divide batter between ramekins and bake for 12-13 minutes.',
      'Invert onto plates and serve immediately with vanilla ice cream.',
    ],
  },
  {
    id: '10',
    name: 'Japanese Chicken Teriyaki',
    category: 'Asian',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
    prepTime: '30 mins',
    servings: '3 servings',
    calories: '510 kcal',
    difficulty: 'Medium',
    isFavorite: false,
    isUserCreated: false,
    ingredients: [
      '500g boneless chicken thighs, cubed',
      '1/4 cup soy sauce',
      '2 tbsp mirin or rice vinegar',
      '2 tbsp honey or brown sugar',
      '1 tbsp grated fresh ginger',
      'Sesame seeds and green onions for garnish',
      'Steamed white jasmine rice',
    ],
    instructions: [
      'Whisk soy sauce, mirin, honey, and minced ginger to prepare teriyaki sauce.',
      'Sear chicken in a hot skillet with sesame oil until golden brown on both sides.',
      'Pour teriyaki sauce into skillet and reduce to low heat.',
      'Simmer for 8-10 minutes until sauce reduces to a glossy glaze coating the chicken.',
      'Serve over warm jasmine rice, sprinkled with sesame seeds and scallions.',
    ],
  },
  {
    id: '11',
    name: 'Iced Caramel Macchiato',
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=80',
    prepTime: '10 mins',
    servings: '1 serving',
    calories: '180 kcal',
    difficulty: 'Easy',
    isFavorite: false,
    isUserCreated: false,
    ingredients: [
      '2 shots freshly brewed espresso',
      '3/4 cup whole milk or oat milk',
      '1 cup ice cubes',
      '2 tbsp vanilla syrup',
      'Caramel drizzle sauce',
    ],
    instructions: [
      'Add vanilla syrup to the bottom of a tall glass.',
      'Fill glass with ice cubes and pour milk over ice.',
      'Slowly pour freshly brewed espresso over milk for layered presentation.',
      'Top generously with rich caramel drizzle and serve with a straw.',
    ],
  },
  {
    id: '12',
    name: 'Gourmet Beef Cheeseburger',
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    prepTime: '30 mins',
    servings: '2 servings',
    calories: '680 kcal',
    difficulty: 'Medium',
    isFavorite: false,
    isUserCreated: false,
    ingredients: [
      '400g ground chuck beef',
      '2 brioche burger buns',
      '2 slices aged cheddar cheese',
      'Crispy bacon strips',
      'Lettuce, sliced tomatoes, and red onion',
      'House special burger sauce',
    ],
    instructions: [
      'Form beef into two thick patties; season generously with salt and pepper.',
      'Grill patties on high heat for 4 minutes per side; add cheddar cheese to melt.',
      'Toast brioche buns lightly on the grill.',
      'Spread house burger sauce on top and bottom buns.',
      'Assemble with burger patty, crispy bacon, tomato, lettuce, and onions.',
    ],
  },
  {
    id: '13',
    name: 'Rosemary Garlic Ribeye Steak',
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    prepTime: '35 mins',
    servings: '2 servings',
    calories: '720 kcal',
    difficulty: 'Hard',
    isFavorite: false,
    isUserCreated: false,
    ingredients: [
      '2 prime ribeye steaks (1.5 inch thick)',
      '3 tbsp unsalted butter',
      '4 garlic cloves, crushed',
      '3 sprigs fresh rosemary',
      'Coarse sea salt and cracked black peppercorns',
    ],
    instructions: [
      'Bring steaks to room temperature 30 minutes before cooking.',
      'Heat cast iron skillet over high heat until smoking hot.',
      'Sear steaks 3-4 minutes per side until a deep caramelized crust forms.',
      'Add butter, garlic cloves, and rosemary sprigs to the skillet.',
      'Baste steaks continuously with bubbling herb butter for 2 minutes.',
      'Rest steaks on a cutting board for 8 minutes before slicing.',
    ],
  },
  // Pre-populated user created recipes in "My Food" section
  {
    id: '101',
    name: "Grandma's Secret Apple Pie",
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&auto=format&fit=crop&q=80',
    prepTime: '50 mins',
    servings: '8 servings',
    calories: '380 kcal',
    difficulty: 'Medium',
    isFavorite: true,
    isUserCreated: true,
    ingredients: [
      '6 large Granny Smith apples, peeled and sliced',
      '2 unbaked pie crusts',
      '3/4 cup granulated sugar',
      '2 tbsp all-purpose flour',
      '1 tsp ground cinnamon',
      '1/4 tsp ground nutmeg',
      '2 tbsp butter, diced',
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Toss sliced apples with sugar, flour, cinnamon, and nutmeg in a large bowl.',
      'Line a 9-inch pie plate with bottom crust and fill with apple mixture.',
      'Dot with diced butter and cover with top crust, crimping edges.',
      'Cut slits in top crust for steam and bake for 45-50 minutes until golden.',
      'Cool completely before slicing.',
    ],
  },
  {
    id: '102',
    name: 'Crispy Garlic Parmesan Wings',
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&auto=format&fit=crop&q=80',
    prepTime: '40 mins',
    servings: '4 servings',
    calories: '520 kcal',
    difficulty: 'Easy',
    isFavorite: false,
    isUserCreated: true,
    ingredients: [
      '1 kg chicken wings, split at joints',
      '1 tbsp baking powder (for extra crispiness)',
      '1/2 cup grated Parmesan cheese',
      '4 garlic cloves, finely minced',
      '1/4 cup melted butter',
      '2 tbsp chopped fresh parsley',
      'Salt and pepper',
    ],
    instructions: [
      'Pat chicken wings dry with paper towels; toss with baking powder, salt, and pepper.',
      'Bake at 425°F (220°C) for 35-40 minutes on a wire rack until ultra-crispy.',
      'In a large bowl, whisk melted butter, minced garlic, Parmesan, and fresh parsley.',
      'Toss hot crispy wings in the garlic parmesan butter sauce until thoroughly coated.',
      'Serve warm with creamy ranch or blue cheese dip.',
    ],
  },
];

// Horizontal Category list (At least 10 categories + 'My Food' option)
const CATEGORIES = [
  { id: 'all', name: 'All', icon: 'restaurant' },
  { id: 'Breakfast', name: 'Breakfast', icon: 'cafe' },
  { id: 'Lunch', name: 'Lunch', icon: 'pizza' },
  { id: 'Dinner', name: 'Dinner', icon: 'flame' },
  { id: 'Desserts', name: 'Desserts', icon: 'ice-cream' },
  { id: 'Salads', name: 'Salads', icon: 'leaf' },
  { id: 'Soups', name: 'Soups', icon: 'nutrition' },
  { id: 'Beverages', name: 'Beverages', icon: 'wine' },
  { id: 'Vegan', name: 'Vegan', icon: 'flower' },
  { id: 'Italian', name: 'Italian', icon: 'sparkles' },
  { id: 'Mexican', name: 'Mexican', icon: 'bonfire' },
  { id: 'Asian', name: 'Asian', icon: 'fish' },
  { id: 'My Food', name: 'My Food', icon: 'book' },
];

// Sample images for quick one-click image selection in Add Recipe
const SAMPLE_IMAGES = [
  { label: '🍕 Pizza', url: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=80' },
  { label: '🍔 Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80' },
  { label: '🍝 Pasta', url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=80' },
  { label: '🥗 Salad', url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=80' },
  { label: '🍰 Dessert', url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80' },
  { label: '🥞 Pancakes', url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=80' },
];

export default function App() {
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Modals state
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Form states for Add Recipe
  const [formName, setFormName] = useState('');
  const [formImage, setFormImage] = useState(SAMPLE_IMAGES[0].url);
  const [formCategory, setFormCategory] = useState('Dinner');
  const [formPrepTime, setFormPrepTime] = useState('25 mins');
  const [formServings, setFormServings] = useState('4 servings');
  const [formCalories, setFormCalories] = useState('420 kcal');
  const [formDifficulty, setFormDifficulty] = useState('Medium');
  const [formIngredients, setFormIngredients] = useState('Olive oil, Garlic, Salt, Pepper, Fresh herbs');
  const [formInstructions, setFormInstructions] = useState('1. Prepare all ingredients\n2. Cook in pan for 15 mins\n3. Serve warm and enjoy');

  // Toggle favorite status
  const toggleFavorite = (recipeId) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r))
    );
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  // Open Add Recipe Modal
  const handleOpenAddModal = () => {
    setFormName('');
    setFormImage(SAMPLE_IMAGES[0].url);
    setFormCategory('Dinner');
    setFormPrepTime('25 mins');
    setFormServings('4 servings');
    setFormCalories('420 kcal');
    setFormDifficulty('Medium');
    setFormIngredients('1 tbsp olive oil\n2 garlic cloves\nSalt and pepper to taste');
    setFormInstructions('1. Prep ingredients\n2. Cook over medium heat\n3. Garnish and serve');
    setIsAddModalVisible(true);
  };

  // Save New Recipe
  const handleSaveRecipe = () => {
    if (!formName.trim()) {
      Alert.alert('Required Field', 'Please enter a recipe name.');
      return;
    }

    const ingredientsArr = formIngredients
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const instructionsArr = formInstructions
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const newRecipe = {
      id: Date.now().toString(),
      name: formName.trim(),
      category: formCategory,
      image: formImage.trim() || SAMPLE_IMAGES[0].url,
      prepTime: formPrepTime || '20 mins',
      servings: formServings || '4 servings',
      calories: formCalories || '350 kcal',
      difficulty: formDifficulty || 'Easy',
      isFavorite: false,
      isUserCreated: true,
      ingredients: ingredientsArr.length > 0 ? ingredientsArr : ['Fresh seasonal ingredients'],
      instructions: instructionsArr.length > 0 ? instructionsArr : ['Combine ingredients and cook well.'],
    };

    setRecipes([newRecipe, ...recipes]);
    setIsAddModalVisible(false);
    setSelectedCategory('My Food');
    setShowFavoritesOnly(false);
    Alert.alert('Success 🎉', `"${newRecipe.name}" added to My Recipes!`);
  };

  // Open Edit Modal
  const handleOpenEditModal = (recipe) => {
    setEditingRecipe(recipe);
    setFormName(recipe.name);
    setFormImage(recipe.image);
    setFormCategory(recipe.category);
    setFormPrepTime(recipe.prepTime);
    setFormServings(recipe.servings);
    setFormCalories(recipe.calories);
    setFormDifficulty(recipe.difficulty);
    setFormIngredients(recipe.ingredients.join('\n'));
    setFormInstructions(recipe.instructions.join('\n'));
    setIsEditModalVisible(true);
  };

  // Save Edited Recipe
  const handleUpdateRecipe = () => {
    if (!formName.trim()) {
      Alert.alert('Required Field', 'Recipe name cannot be empty.');
      return;
    }

    const ingredientsArr = formIngredients
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const instructionsArr = formInstructions
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const updated = {
      ...editingRecipe,
      name: formName.trim(),
      category: formCategory,
      image: formImage.trim() || SAMPLE_IMAGES[0].url,
      prepTime: formPrepTime,
      servings: formServings,
      calories: formCalories,
      difficulty: formDifficulty,
      ingredients: ingredientsArr,
      instructions: instructionsArr,
    };

    setRecipes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    if (selectedRecipe && selectedRecipe.id === updated.id) {
      setSelectedRecipe(updated);
    }
    setIsEditModalVisible(false);
    Alert.alert('Updated ✅', `"${updated.name}" has been updated.`);
  };

  // Delete Recipe
  const handleDeleteRecipe = (recipeId, recipeName) => {
    const doDelete = () => {
      setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
      if (selectedRecipe && selectedRecipe.id === recipeId) {
        setSelectedRecipe(null);
      }
      Alert.alert('Deleted', `"${recipeName}" was removed.`);
    };

    if (Platform.OS === 'web') {
      if (window.confirm(`Are you sure you want to delete "${recipeName}"?`)) {
        doDelete();
      }
    } else {
      Alert.alert(
        'Delete Recipe',
        `Are you sure you want to delete "${recipeName}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: doDelete },
        ]
      );
    }
  };

  // Filter recipes based on current selection
  const filteredRecipes = recipes.filter((recipe) => {
    // If favorites mode is on
    if (showFavoritesOnly && !recipe.isFavorite) return false;

    // Category filter
    if (selectedCategory === 'My Food') {
      if (!recipe.isUserCreated) return false;
    } else if (selectedCategory !== 'All') {
      if (recipe.category !== selectedCategory) return false;
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchName = recipe.name.toLowerCase().includes(query);
      const matchCategory = recipe.category.toLowerCase().includes(query);
      return matchName || matchCategory;
    }

    return true;
  });

  const favoritesCount = recipes.filter((r) => r.isFavorite).length;
  const myFoodCount = recipes.filter((r) => r.isUserCreated).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF5F5" />

      {/* TOP HEADER */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Text style={styles.logoIcon}>🍳</Text>
          <View>
            <Text style={styles.logoTitle}>Foodie</Text>
            <Text style={styles.logoSubtitle}>Browse & Cook Delicious Meals</Text>
          </View>
        </View>

        {/* Action icons */}
        <View style={styles.headerActions}>
          {/* Favorites Button with Badge */}
          <TouchableOpacity
            style={[styles.headerBtn, showFavoritesOnly && styles.headerBtnActive]}
            onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showFavoritesOnly ? 'heart' : 'heart-outline'}
              size={22}
              color={showFavoritesOnly ? '#FF4757' : '#333'}
            />
            {favoritesCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{favoritesCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Quick Add Recipe Button */}
          <TouchableOpacity
            style={styles.addQuickBtn}
            onPress={handleOpenAddModal}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color="#FFF" />
            <Text style={styles.addQuickBtnText}>New</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes, ingredients, categories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* HORIZONTAL CATEGORIES BAR (10+ Categories + 'My Food' Option) */}
      <View style={styles.categoriesSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name && !showFavoritesOnly;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryPill,
                  isSelected && styles.categoryPillSelected,
                  cat.name === 'My Food' && styles.myFoodPill,
                  cat.name === 'My Food' && isSelected && styles.myFoodPillSelected,
                ]}
                onPress={() => {
                  setSelectedCategory(cat.name);
                  setShowFavoritesOnly(false);
                }}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={cat.icon}
                  size={15}
                  color={
                    isSelected
                      ? '#FFF'
                      : cat.name === 'My Food'
                      ? '#E67E22'
                      : '#555'
                  }
                  style={styles.categoryIcon}
                />
                <Text
                  style={[
                    styles.categoryPillText,
                    isSelected && styles.categoryPillTextSelected,
                    cat.name === 'My Food' && !isSelected && { color: '#E67E22', fontWeight: 'bold' },
                  ]}
                >
                  {cat.name}
                  {cat.name === 'My Food' ? ` (${myFoodCount})` : ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ACTIVE FILTER BANNER / STATUS */}
      {showFavoritesOnly ? (
        <View style={styles.banner}>
          <Ionicons name="heart" size={18} color="#FF4757" />
          <Text style={styles.bannerText}>Showing Favorite Recipes ({filteredRecipes.length})</Text>
          <TouchableOpacity onPress={() => setShowFavoritesOnly(false)}>
            <Text style={styles.bannerAction}>Show All</Text>
          </TouchableOpacity>
        </View>
      ) : selectedCategory === 'My Food' ? (
        <View style={styles.myFoodBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.myFoodBannerTitle}>👨‍🍳 My Food - Personal Recipes</Text>
            <Text style={styles.myFoodBannerSubtitle}>Create, edit and manage your own recipes</Text>
          </View>
          <TouchableOpacity style={styles.addRecipeBannerBtn} onPress={handleOpenAddModal}>
            <Ionicons name="add-circle" size={18} color="#FFF" />
            <Text style={styles.addRecipeBannerBtnText}>Add Recipe</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* MAIN RECIPE FEED */}
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name={showFavoritesOnly ? 'heart-dislike-outline' : 'restaurant-outline'}
              size={54}
              color="#CCC"
            />
            <Text style={styles.emptyTitle}>No Recipes Found</Text>
            <Text style={styles.emptySubtitle}>
              {showFavoritesOnly
                ? 'You haven’t added any recipes to Favorites yet. Tap the heart icon ❤️ on any recipe to save it!'
                : selectedCategory === 'My Food'
                ? 'You have not added any personal recipes yet. Click "+ Add New Recipe" to start cooking!'
                : 'Try selecting another category or searching with different keywords.'}
            </Text>
            {selectedCategory === 'My Food' && (
              <TouchableOpacity style={styles.emptyAddBtn} onPress={handleOpenAddModal}>
                <Ionicons name="add" size={18} color="#FFF" />
                <Text style={styles.emptyAddBtnText}>Add Your First Recipe</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeCard}
            onPress={() => setSelectedRecipe(item)}
            activeOpacity={0.9}
          >
            {/* Card Image */}
            <View style={styles.cardImageContainer}>
              <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
              {/* Category Badge */}
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{item.category}</Text>
              </View>
              {/* Heart Favorite Button */}
              <TouchableOpacity
                style={styles.favoriteBtn}
                onPress={() => toggleFavorite(item.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.isFavorite ? 'heart' : 'heart-outline'}
                  size={22}
                  color={item.isFavorite ? '#FF4757' : '#FFF'}
                />
              </TouchableOpacity>
            </View>

            {/* Card Info */}
            <View style={styles.cardBody}>
              <Text style={styles.recipeTitle}>{item.name}</Text>

              {/* Recipe Meta Info: Prep Time, Servings, Calories, Difficulty */}
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={14} color="#666" />
                  <Text style={styles.metaText}>{item.prepTime}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="people-outline" size={14} color="#666" />
                  <Text style={styles.metaText}>{item.servings}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="flame-outline" size={14} color="#E67E22" />
                  <Text style={styles.metaText}>{item.calories}</Text>
                </View>
                <View style={[styles.difficultyBadge, styles[`diff_${item.difficulty}`]]}>
                  <Text style={styles.difficultyText}>{item.difficulty}</Text>
                </View>
              </View>

              {/* My Recipes section Edit and Delete functional buttons */}
              {item.isUserCreated && (
                <View style={styles.userActionsRow}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => handleOpenEditModal(item)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="create-outline" size={16} color="#2980B9" />
                    <Text style={styles.editBtnText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteRecipe(item.id, item.name)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={16} color="#E74C3C" />
                    <Text style={styles.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />

      {/* ======================================================== */}
      {/* RECIPE DETAIL MODAL (Displays Full Recipe Details + Back Button) */}
      {/* ======================================================== */}
      <Modal
        visible={selectedRecipe !== null}
        animationType="slide"
        onRequestClose={() => setSelectedRecipe(null)}
      >
        {selectedRecipe && (
          <SafeAreaView style={styles.detailContainer}>
            {/* Top Detail Navigation Bar with Functional Back Button */}
            <View style={styles.detailHeaderBar}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setSelectedRecipe(null)}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color="#333" />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>

              <Text style={styles.detailHeaderTitle} numberOfLines={1}>
                {selectedRecipe.name}
              </Text>

              <TouchableOpacity
                style={styles.detailFavoriteBtn}
                onPress={() => toggleFavorite(selectedRecipe.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={selectedRecipe.isFavorite ? 'heart' : 'heart-outline'}
                  size={26}
                  color={selectedRecipe.isFavorite ? '#FF4757' : '#333'}
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailScroll}>
              {/* Large Hero Image */}
              <Image source={{ uri: selectedRecipe.image }} style={styles.detailHeroImage} />

              <View style={styles.detailContent}>
                {/* Title & Category */}
                <View style={styles.detailTitleRow}>
                  <Text style={styles.detailTitle}>{selectedRecipe.name}</Text>
                  <View style={styles.detailCategoryPill}>
                    <Text style={styles.detailCategoryPillText}>{selectedRecipe.category}</Text>
                  </View>
                </View>

                {/* 6 Key Properties Grid: Prep Time, Servings, Calories, Difficulty */}
                <View style={styles.infoGrid}>
                  <View style={styles.infoBox}>
                    <Ionicons name="time-outline" size={22} color="#FF6B6B" />
                    <Text style={styles.infoLabel}>Prep Time</Text>
                    <Text style={styles.infoValue}>{selectedRecipe.prepTime}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Ionicons name="people-outline" size={22} color="#4ECDC4" />
                    <Text style={styles.infoLabel}>Servings</Text>
                    <Text style={styles.infoValue}>{selectedRecipe.servings}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Ionicons name="flame-outline" size={22} color="#F39C12" />
                    <Text style={styles.infoLabel}>Calories</Text>
                    <Text style={styles.infoValue}>{selectedRecipe.calories}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Ionicons name="speedometer-outline" size={22} color="#9B59B6" />
                    <Text style={styles.infoLabel}>Difficulty</Text>
                    <Text style={styles.infoValue}>{selectedRecipe.difficulty}</Text>
                  </View>
                </View>

                {/* INGREDIENTS LIST */}
                <View style={styles.sectionCard}>
                  <View style={styles.sectionHeaderRow}>
                    <Ionicons name="nutrition-outline" size={22} color="#FF6B6B" />
                    <Text style={styles.sectionTitle}>Ingredients</Text>
                  </View>
                  {selectedRecipe.ingredients.map((item, index) => (
                    <View key={index} style={styles.ingredientRow}>
                      <Ionicons name="checkmark-circle" size={18} color="#2ECC71" style={{ marginRight: 8 }} />
                      <Text style={styles.ingredientText}>{item}</Text>
                    </View>
                  ))}
                </View>

                {/* STEP-BY-STEP INSTRUCTIONS */}
                <View style={styles.sectionCard}>
                  <View style={styles.sectionHeaderRow}>
                    <Ionicons name="restaurant-outline" size={22} color="#FF6B6B" />
                    <Text style={styles.sectionTitle}>Step-by-Step Instructions</Text>
                  </View>
                  {selectedRecipe.instructions.map((step, index) => (
                    <View key={index} style={styles.instructionStep}>
                      <View style={styles.stepNumberBadge}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.instructionText}>{step}</Text>
                    </View>
                  ))}
                </View>

                {/* If it's a user recipe, provide edit/delete inside detail view too */}
                {selectedRecipe.isUserCreated && (
                  <View style={styles.detailUserActions}>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.editActionBtn]}
                      onPress={() => {
                        handleOpenEditModal(selectedRecipe);
                      }}
                    >
                      <Ionicons name="create-outline" size={18} color="#FFF" />
                      <Text style={styles.actionBtnText}>Edit Recipe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.deleteActionBtn]}
                      onPress={() => {
                        handleDeleteRecipe(selectedRecipe.id, selectedRecipe.name);
                      }}
                    >
                      <Ionicons name="trash-outline" size={18} color="#FFF" />
                      <Text style={styles.actionBtnText}>Delete Recipe</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>

      {/* ======================================================== */}
      {/* ADD NEW RECIPE MODAL (Task 8: Inputs + Save Recipe Button) */}
      {/* ======================================================== */}
      <Modal visible={isAddModalVisible} animationType="slide" onRequestClose={() => setIsAddModalVisible(false)}>
        <SafeAreaView style={styles.modalSafeContainer}>
          {/* Modal Header with Back Button */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setIsAddModalVisible(false)}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color="#333" />
              <Text style={styles.backButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Add New Recipe</Text>
            <View style={{ width: 60 }} />
          </View>

          <ScrollView contentContainerStyle={styles.formScroll} showsVerticalScrollIndicator={false}>
            {/* Recipe Name */}
            <Text style={styles.fieldLabel}>Recipe Name *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Crispy Honey Garlic Chicken"
              value={formName}
              onChangeText={setFormName}
              placeholderTextColor="#999"
            />

            {/* Category Selector */}
            <Text style={styles.fieldLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillRow}>
              {CATEGORIES.filter((c) => c.name !== 'All' && c.name !== 'My Food').map((c) => (
                <TouchableOpacity
                  key={c.id}
                  style={[styles.formPill, formCategory === c.name && styles.formPillActive]}
                  onPress={() => setFormCategory(c.name)}
                >
                  <Text style={[styles.formPillText, formCategory === c.name && styles.formPillTextActive]}>
                    {c.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Image Upload / URL & Quick Presets */}
            <Text style={styles.fieldLabel}>Image Upload / URL</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Paste image URL here"
              value={formImage}
              onChangeText={setFormImage}
              placeholderTextColor="#999"
            />

            {/* Sample image quick-select */}
            <Text style={styles.subFieldLabel}>Or choose a sample photo:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillRow}>
              {SAMPLE_IMAGES.map((sample, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.sampleImgPill, formImage === sample.url && styles.sampleImgPillActive]}
                  onPress={() => setFormImage(sample.url)}
                >
                  <Text style={styles.sampleImgText}>{sample.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Image Preview */}
            {formImage.length > 0 && (
              <Image source={{ uri: formImage }} style={styles.formImagePreview} resizeMode="cover" />
            )}

            {/* Meta details row: Prep time, Servings, Calories, Difficulty */}
            <View style={styles.rowTwoCols}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.fieldLabel}>Prep Time</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="25 mins"
                  value={formPrepTime}
                  onChangeText={setFormPrepTime}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.fieldLabel}>Servings</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="4 servings"
                  value={formServings}
                  onChangeText={setFormServings}
                />
              </View>
            </View>

            <View style={styles.rowTwoCols}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.fieldLabel}>Calories</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="380 kcal"
                  value={formCalories}
                  onChangeText={setFormCalories}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.fieldLabel}>Difficulty</Text>
                <View style={styles.diffSelectorRow}>
                  {['Easy', 'Medium', 'Hard'].map((diff) => (
                    <TouchableOpacity
                      key={diff}
                      style={[styles.diffSmallBtn, formDifficulty === diff && styles.diffSmallBtnActive]}
                      onPress={() => setFormDifficulty(diff)}
                    >
                      <Text style={[styles.diffSmallText, formDifficulty === diff && styles.diffSmallTextActive]}>
                        {diff}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Ingredients List */}
            <Text style={styles.fieldLabel}>Ingredients List (one item per line) *</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              placeholder="e.g.&#10;2 cups flour&#10;1 cup milk&#10;1 tsp salt"
              value={formIngredients}
              onChangeText={setFormIngredients}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />

            {/* Step-by-step instructions */}
            <Text style={styles.fieldLabel}>Step-by-Step Instructions (one per line) *</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              placeholder="e.g.&#10;1. Heat the pan&#10;2. Whisk ingredients&#10;3. Cook until golden"
              value={formInstructions}
              onChangeText={setFormInstructions}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />

            {/* SAVE RECIPE BUTTON */}
            <TouchableOpacity style={styles.saveRecipeBtn} onPress={handleSaveRecipe} activeOpacity={0.8}>
              <Ionicons name="checkmark-circle-outline" size={22} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.saveRecipeBtnText}>Save Recipe</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ======================================================== */}
      {/* EDIT RECIPE MODAL (Task 11: Edit Functionality) */}
      {/* ======================================================== */}
      <Modal visible={isEditModalVisible} animationType="slide" onRequestClose={() => setIsEditModalVisible(false)}>
        <SafeAreaView style={styles.modalSafeContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setIsEditModalVisible(false)}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color="#333" />
              <Text style={styles.backButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Edit Recipe</Text>
            <View style={{ width: 60 }} />
          </View>

          <ScrollView contentContainerStyle={styles.formScroll} showsVerticalScrollIndicator={false}>
            <Text style={styles.fieldLabel}>Recipe Name</Text>
            <TextInput style={styles.textInput} value={formName} onChangeText={setFormName} />

            <Text style={styles.fieldLabel}>Image URL</Text>
            <TextInput style={styles.textInput} value={formImage} onChangeText={setFormImage} />

            <View style={styles.rowTwoCols}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.fieldLabel}>Prep Time</Text>
                <TextInput style={styles.textInput} value={formPrepTime} onChangeText={setFormPrepTime} />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.fieldLabel}>Servings</Text>
                <TextInput style={styles.textInput} value={formServings} onChangeText={setFormServings} />
              </View>
            </View>

            <View style={styles.rowTwoCols}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.fieldLabel}>Calories</Text>
                <TextInput style={styles.textInput} value={formCalories} onChangeText={setFormCalories} />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.fieldLabel}>Difficulty</Text>
                <TextInput style={styles.textInput} value={formDifficulty} onChangeText={setFormDifficulty} />
              </View>
            </View>

            <Text style={styles.fieldLabel}>Ingredients (one per line)</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              value={formIngredients}
              onChangeText={setFormIngredients}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Text style={styles.fieldLabel}>Instructions (one per line)</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              value={formInstructions}
              onChangeText={setFormInstructions}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.saveRecipeBtn} onPress={handleUpdateRecipe} activeOpacity={0.8}>
              <Ionicons name="save-outline" size={22} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.saveRecipeBtnText}>Update Recipe</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 36 : 12,
    paddingBottom: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 32,
    marginRight: 8,
  },
  logoTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FF6B6B',
    letterSpacing: 0.5,
  },
  logoSubtitle: {
    fontSize: 11,
    color: '#888',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
    position: 'relative',
  },
  headerBtnActive: {
    backgroundColor: '#FFEAEA',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF4757',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addQuickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  addQuickBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },
  categoriesSection: {
    paddingVertical: 8,
    backgroundColor: '#FAFAFA',
  },
  categoriesScroll: {
    paddingHorizontal: 12,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  categoryPillSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  myFoodPill: {
    borderColor: '#E67E22',
    backgroundColor: '#FEF9E7',
  },
  myFoodPillSelected: {
    backgroundColor: '#E67E22',
    borderColor: '#E67E22',
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  categoryPillTextSelected: {
    color: '#FFF',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEAEA',
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  bannerText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#C0392B',
  },
  bannerAction: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FF4757',
  },
  myFoodBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF8E7',
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FAD7A0',
  },
  myFoodBannerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B9770E',
  },
  myFoodBannerSubtitle: {
    fontSize: 11,
    color: '#7D6608',
  },
  addRecipeBannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E67E22',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addRecipeBannerBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  feedContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  recipeCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImageContainer: {
    width: '100%',
    height: 190,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.45)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    padding: 14,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  diff_Easy: {
    backgroundColor: '#E8F8F5',
  },
  diff_Medium: {
    backgroundColor: '#FEF9E7',
  },
  diff_Hard: {
    backgroundColor: '#FADBD8',
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#555',
  },
  userActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF5FB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  editBtnText: {
    color: '#2980B9',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDEDEC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteBtnText: {
    color: '#E74C3C',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  emptyAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E67E22',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 16,
  },
  emptyAddBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 6,
  },

  // Detail Modal Styles
  detailContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  detailHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginLeft: 4,
  },
  detailHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  detailFavoriteBtn: {
    padding: 4,
  },
  detailScroll: {
    paddingBottom: 40,
  },
  detailHeroImage: {
    width: '100%',
    height: 260,
  },
  detailContent: {
    padding: 18,
  },
  detailTitleRow: {
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2C3E50',
    marginBottom: 6,
  },
  detailCategoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  detailCategoryPillText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginLeft: 8,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F9F9F9',
  },
  ingredientText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumberBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
    lineHeight: 20,
  },
  detailUserActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  editActionBtn: {
    backgroundColor: '#2980B9',
  },
  deleteActionBtn: {
    backgroundColor: '#E74C3C',
  },
  actionBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 6,
  },

  // Add / Edit Modal Styles
  modalSafeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  formScroll: {
    padding: 18,
    paddingBottom: 40,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  subFieldLabel: {
    fontSize: 11,
    color: '#777',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  multilineInput: {
    minHeight: 90,
  },
  pillRow: {
    marginBottom: 8,
  },
  formPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  formPillActive: {
    backgroundColor: '#FF6B6B',
  },
  formPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  formPillTextActive: {
    color: '#FFF',
  },
  sampleImgPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#EBF5FB',
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#AED6F1',
  },
  sampleImgPillActive: {
    backgroundColor: '#2980B9',
    borderColor: '#2980B9',
  },
  sampleImgText: {
    fontSize: 12,
    color: '#2980B9',
    fontWeight: '600',
  },
  formImagePreview: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginTop: 8,
  },
  rowTwoCols: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  diffSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 3,
  },
  diffSmallBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  diffSmallBtnActive: {
    backgroundColor: '#FF6B6B',
  },
  diffSmallText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  diffSmallTextActive: {
    color: '#FFF',
  },
  saveRecipeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ECC71',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  saveRecipeBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
