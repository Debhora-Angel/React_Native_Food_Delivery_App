import React, { useState, useRef ,useEffect} from 'react';
import { View, Text, TextInput, ScrollView, ImageBackground,StyleSheet,Animated,Dimensions,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CategoryItem from '../components/CategoryItem';
import RestaurantCard from '../components/RestaurantCard';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#E4E4E7", 
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#a8f9c2ff", 
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  containerFocused: {
    borderColor: "#83fd9fff",
    shadowColor: "#71fb7fff",
    shadowOpacity: 0.3,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#37513cff", 
    fontFamily:"System",
    paddingVertical: 4,
  },
  card: {
    margin: 20,
    backgroundColor: "#C9E4C5",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#4CAF50",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  text: {
    fontSize: 16,
    color: "#2E4A26",
    fontWeight: "600",
  },
    containerExclusive: {
    margin: 20,
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 10,
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: width * 0.8,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  imageRadius: {
    borderRadius: 10,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: "90%",
    top:25,
  },
  overlayText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "30%",
    backgroundColor: "rgba(255,255,255,0.25)",
    opacity: 0.6,
    transform: [{ rotate: "15deg" }],
  },
});

export default function HomeScreen() {
    const navigation = useNavigation();
    const [focused, setFocused] = useState(false);
    

  const categories = [
    { id: 1, name: 'Burgers', icon: 'fast-food' },
    { id: 2, name: 'Pizza', icon: 'pizza' },
    { id: 3, name: 'Tacos', icon: 'restaurant' },
    { id: 4, name: 'Salads', icon: 'leaf' },
    { id: 5, name: 'Desserts', icon: 'ice-cream' },
  ];
const [selectedCategory, setSelectedCategory] = useState(null);
const [searchQuery, setSearchQuery] = useState("");

const slideAnim = useRef(new Animated.Value(30)).current; // start slightly below
  const fadeAnim = useRef(new Animated.Value(0)).current;   // start transparent
  const glowAnim = useRef(new Animated.Value(1)).current;   // for pulsing glow
   const fadeExclusive = useRef(new Animated.Value(0)).current;
  const scaleExclusive = useRef(new Animated.Value(0.9)).current;
  const shimmerExclusive = useRef(new Animated.Value(-1)).current;
  const zoomAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    // Entrance animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Start looping glow after entry
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1.2,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  //for Promotion
  useEffect(() => {
    // Entry animation
    Animated.parallel([
      Animated.timing(fadeExclusive, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleExclusive, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Loop shimmer
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerExclusive, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerExclusive, {
          toValue: -1,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 👇 Subtle zoom animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(zoomAnim, {
          toValue: 1.05,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(zoomAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const shimmerTranslate = shimmerExclusive.interpolate({
    inputRange: [-1, 1],
    outputRange: [-width * 0.5, width * 0.5],
  });

 const restaurants = [
  {
    id: 1,
    name: "Biryani House",
    image: "https://i.pinimg.com/1200x/6a/cc/f3/6accf3cefbe7f9779d151e3696018990.jpg",
    cuisine: "Indian, Biryani",
    rating: 4.5,
    time: "30-40 min",
    dishes: [
      {
        id: 1,
        name: "Chicken Biryani",
        price: 18.99,
        desc: "Spicy Hyderabadi style biryani",
        image: "https://i.pinimg.com/1200x/6a/cc/f3/6accf3cefbe7f9779d151e3696018990.jpg",
      },
      {
        id: 2,
        name: "Paneer Biryani",
        price: 15.5,
        desc: "Delicious vegetarian option with aromatic rice",
        image: "https://i.pinimg.com/736x/9e/a9/af/9ea9afa86634eef01d961afdea6c6b6f.jpg",
      },
      {
        id: 3,
        name: "Mutton Biryani",
        price: 36.5,
        desc: "Authentic Mutton Biryani",
        image: "https://i.pinimg.com/736x/05/0a/94/050a94b63f4516e3594446c094910627.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Pizza Corner",
    image: "https://i.pinimg.com/736x/13/50/ce/1350ce1e2de37d0e6168f168af9cf10f.jpg",
    cuisine: "Italian, Pizza",
    rating: 4.2,
    time: "25-35 min",
    dishes: [
      {
        id: 1,
        name: "Margherita Pizza",
        price: 12.99,
        desc: "Classic cheese pizza with fresh basil",
        image: "https://i.pinimg.com/1200x/f1/be/36/f1be366cc6cbf3f9cf29f5c25bb51ca4.jpg",
      },
      {
        id: 2,
        name: "Pepperoni Pizza",
        price: 14.49,
        desc: "Topped with premium pepperoni and mozzarella",
        image: "https://i.pinimg.com/1200x/2d/4b/0b/2d4b0b41bcb652fb584355dfb509aeb6.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "The Veg Spot",
    image: "https://i.pinimg.com/1200x/af/3e/92/af3e923759b746130dea6f98df015147.jpg",
    cuisine: "Vegetarian, Indian",
    rating: 4.6,
    time: "20-30 min",
    dishes: [
      {
        id: 1,
        name: "Veg Fried Rice",
        price: 10.99,
        desc: "Loaded with veggies and soy sauce",
        image: "https://i.pinimg.com/736x/af/3e/92/af3e923759b746130dea6f98df015147.jpg",
      },
      {
        id: 2,
        name: "Paneer Butter Masala",
        price: 11.5,
        desc: "Creamy rich curry with soft paneer",
        image: "https://i.pinimg.com/1200x/75/25/c2/7525c28b815e93b8f4ad4a3bb889090e.jpg",
      },
    ],
  },
];


  const popularRestaurants = [
    {
      id: 5,
      name: 'Burger Hub',
      image: 'https://i.pinimg.com/736x/2e/83/73/2e837347c987a642d072442809a0bed0.jpg',
      cuisine: 'American',
      rating: 4.8,
      time: '20-30 min',
        dishes: [
        {
          id: 1,
          name: "Classic Beef Burger",
          price: 9.99,
          desc: "Juicy grilled beef patty with cheese and lettuce",
          image: "https://i.pinimg.com/1200x/3f/ca/f9/3fcaf9fc08c38a0f16fee711b70d10c6.jpg",
        },
        {
          id: 2,
          name: "Crispy Chicken Burger",
          price: 8.49,
          desc: "Fried chicken fillet with mayo and pickles",
          image: "https://i.pinimg.com/736x/c9/c5/01/c9c5013a47c78dde12d22a8659cdb945.jpg",
        },
      ],
    },
    {
  id: 6,
  name: "Crunchy Bites",
  image: "https://i.pinimg.com/736x/c2/6e/93/c26e930f6356a41fdcc6ea7efe8091df.jpg",
  cuisine: "Chinese",
  rating: 4.7,
  time: "25-35 min",
  dishes: [
    {
      id: 1,
      name: "Chilli Chicken",
      price: 14.99,
      desc: "Crispy fried chicken tossed with spicy chilli sauce and veggies",
      image: "https://i.pinimg.com/1200x/a5/3b/d7/a53bd7110ff221fabec0cfdd5ece693a.jpg",
    },
    {
      id: 2,
      name: "Veg Manchurian",
      price: 12.49,
      desc: "Fried veggie balls in tangy garlic sauce — a Indo-Chinese favorite",
      image: "https://i.pinimg.com/1200x/cf/58/8c/cf588ccb7fd6feb4c5f5b2afbf46ef46.jpg",
    },
    {
      id: 3,
      name: "Hakka Noodles",
      price: 10.99,
      desc: "Stir-fried noodles with vegetables and soy seasoning",
      image: "https://i.pinimg.com/736x/e5/53/63/e55363cd63ec1f769a184d8617a832ef.jpg",
    },
    {
      id: 4,
      name: "Crispy Baby Corn",
      price: 9.75,
      desc: "Golden-fried baby corn tossed in a spicy Chinese-style sauce",
      image: "https://i.pinimg.com/736x/79/64/b5/7964b535d9ae09e6d4c2898bdbb08c9a.jpg",
    },
    {
      id: 5,
      name: "Schezwan Fried Rice",
      price: 11.49,
      desc: "Hot and spicy rice with Schezwan sauce and mixed vegetables",
      image: "https://i.pinimg.com/736x/07/97/9a/07979a2f32cf9678d0a1331c8b79db3f.jpg",
    },
  ],
},
    {
      id: 10,
      name: "Taco Fiesta",
      image: "https://i.pinimg.com/736x/94/f5/b4/94f5b48f11bd49642b9d7bf329028198.jpg",
      cuisine: "Mexican, Tacos",
      rating: 4.3,
      time: "25-35 min",
      dishes: [
        {
          id: 1,
          name: "Beef Taco",
          price: 7.99,
          desc: "Soft shell tacos with seasoned beef",
          image: "https://i.pinimg.com/736x/f9/2c/3f/f92c3f16861fa387575e48e9e9c2efe8.jpg",
        },
        {
          id: 2,
          name: "Veggie Taco",
          price: 6.99,
          desc: "Loaded with beans, corn, and guacamole",
          image: "https://i.pinimg.com/1200x/ab/6a/56/ab6a56306d1fb2788385170ebc9a5f8d.jpg",
        },
      ],
    },
  ];


  const healthyChoices = [
    
    {
      id: 8,
      name: 'Smoothie Stop',
      image: 'https://i.pinimg.com/1200x/a1/04/95/a10495b77c77a3e4d5255aead02aa6d7.jpg',
      cuisine: 'Smoothies & Juices',
      rating: 4.8,
      time: '15-20 min',
      dishes: [
        {
          id: 1,
          name: "Berry Blast Smoothie",
          price: 7.5,
          desc: "Blend of berries with almond milk",
          image: "https://i.pinimg.com/1200x/fd/8f/e6/fd8fe60c2f7a2950b4e86729c91760b3.jpg",
        },
        {
          id: 2,
          name: "Green Detox Juice",
          price: 6.99,
          desc: "Spinach, kale, cucumber & apple blend",
          image: "https://i.pinimg.com/1200x/00/5e/8b/005e8b80b5ea724b15a58b21a8df0570.jpg",
        },
      ],
    },
   {
  id: 7,
  name: "Cake Store",
  image: "https://i.pinimg.com/736x/50/87/0b/50870b77b0ab6ed969a9a43b2d4ddfbc.jpg",
  cuisine: "Bakery",
  rating: 4.8,
  time: "15-20 min",
  dishes: [
    {
      id: 1,
      name: "Chocolate Truffle Cake",
      price: 15.99,
      desc: "Rich dark chocolate layered cake with ganache frosting",
      image: "https://i.pinimg.com/1200x/12/a1/9a/12a19ad60da9087f2f2bcac3ceaa9809.jpg",
    },
    {
      id: 2,
      name: "Red Velvet Cake",
      price: 17.49,
      desc: "Soft red velvet sponge with smooth cream cheese frosting ",
      image: "https://i.pinimg.com/1200x/8f/1b/b7/8f1bb702e8a667d275f2e57a6c879fe7.jpg",
    },
    {
      id: 3,
      name: "Strawberry Cupcake",
      price: 5.99,
      desc: "Moist vanilla cupcake topped with strawberry cream frosting ",
      image: "https://i.pinimg.com/1200x/c8/83/12/c883127cce9b22eeee3e2005c14db0f5.jpg",
    },
    {
      id: 4,
      name: "Blueberry Cheesecake",
      price: 14.25,
      desc: "Creamy cheesecake base topped with blueberry compote",
      image: "https://i.pinimg.com/1200x/28/71/c1/2871c135d6f0dd51009787fb7f6a09e4.jpg",
    },
    
  ],
},
{
      id: 9,
      name: 'Green Bowl',
      image: 'https://i.pinimg.com/736x/a3/64/47/a364470ee2ffdac7fd7e99ebc3c5152e.jpg',
      cuisine: 'Healthy Salads',
      rating: 4.6,
      time: '20-25 min',
       dishes: [
        {
          id: 1,
          name: "Avocado Salad",
          price: 10.99,
          desc: "Fresh greens, avocado, and vinaigrette dressing",
          image: "https://i.pinimg.com/1200x/63/5b/e9/635be93d9887a1cc3a961eb2b0d6551c.jpg",
        },
        {
          id: 2,
          name: "Quinoa Bowl",
          price: 12.5,
          desc: "Wholesome bowl with quinoa, veggies, and tofu",
          image: "https://i.pinimg.com/1200x/24/b2/e0/24b2e06e52616236b4acba12940351bd.jpg",
        },
      ],
    },

  ];
  // Combine all restaurants for filtering
const allRestaurants = [...restaurants, ...popularRestaurants, ...healthyChoices];

// Filter restaurants based on selected category
const filteredRestaurants = allRestaurants.filter((r) => {
  const name = r.name.toLowerCase();
  const cuisine = r.cuisine.toLowerCase();
  const query = searchQuery.toLowerCase();

  // Search logic
  const matchesSearch =
    name.includes(query) ||
    cuisine.includes(query) ||
    r.dishes.some((dish) => dish.name.toLowerCase().includes(query));

  // Category logic
  if (selectedCategory) {
    const matchesCategory =
      (selectedCategory === "Burgers" &&
        (name.includes("burger") || cuisine.includes("burger"))) ||
      (selectedCategory === "Pizza" &&
        (name.includes("pizza") || cuisine.includes("pizza"))) ||
      (selectedCategory === "Tacos" &&
        (name.includes("taco") || cuisine.includes("taco"))) ||
      (selectedCategory === "Salads" &&
        (name.includes("salad") ||
          cuisine.includes("salad") ||
          name.includes("bowl"))) ||
      (selectedCategory === "Desserts" &&
        (name.includes("cake") ||
          cuisine.includes("dessert") ||
          cuisine.includes("bakery")));

    return matchesSearch && matchesCategory;
  }

  return matchesSearch; // show by search if no category selected
});



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={{ backgroundColor: '#C9E4C5', paddingVertical: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#2E4A26' }}>Grubbit 🌿</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search bar */}
       <View style={[styles.container, focused && styles.containerFocused]}>
  <Ionicons name="search" size={20} color="#64b88aff" style={styles.icon} />
  <TextInput
    placeholder="What are you craving?"
    placeholderTextColor="#374151"
    style={styles.input}
    underlineColorAndroid="transparent"
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
    value={searchQuery}
    onChangeText={setSearchQuery}
  />
  {searchQuery.length > 0 && (
    <Ionicons
      name="close-circle"
      size={18}
      color="#888"
      onPress={() => setSearchQuery("")}
    />
  )}
</View>
      {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10, marginBottom: 10 }}>
  {categories.map((cat) => (
    <View key={cat.id} style={{ marginRight: 10 }}>
      <Text
        onPress={() =>
          setSelectedCategory(selectedCategory === cat.name ? null : cat.name)
        }
        style={{
          textAlign: 'center',
          backgroundColor: selectedCategory === cat.name ? '#2E4A26' : '#F3F3F3',
          color: selectedCategory === cat.name ? '#fff' : '#2E4A26',
          paddingHorizontal: 15,
          paddingVertical: 8,
          borderRadius: 10,
          fontWeight: '600',
        }}
      >
        {cat.name}
      </Text>
    </View>
  ))}
</ScrollView>


        {/* Featured Restaurants */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15, marginVertical: 10 }}>
          Featured Restaurants
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
          {filteredRestaurants.map((res) => (
  <RestaurantCard key={res.id} restaurant={res} />
))}

        </ScrollView>

        {/* Promotion */}
        <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: glowAnim }],
        },
      ]}
    >
      <Ionicons
        name="gift"
        size={28}
        color="#4CAF50"
        style={{ marginRight: 10 }}
      />
      <Text style={styles.text}>🎉 Get 20% off your first order!</Text>
    </Animated.View>

        {/* Popular Near You */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15, marginBottom: 10 }}>
          Popular Near You
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
          {popularRestaurants.map((res) => (
            <RestaurantCard key={res.id} restaurant={res} />
          ))}
        </ScrollView>

        {/*  Healthy Choices */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15, marginTop: 15, marginBottom: 10 }}>
          Healthy Choices
        </Text> 
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
          {healthyChoices.map((res) => (
            <RestaurantCard key={res.id} restaurant={res} />
          ))}
        </ScrollView>

        {/*  Exclusive Offers */}
       <TouchableOpacity
  activeOpacity={0.9}
  onPress={() => navigation.navigate("Offers")}
>
  <Animated.View
    style={[
      styles.containerExclusive,
      {
        opacity: fadeExclusive,
        transform: [{ scale: scaleExclusive }],
      },
    ]}
  >
    <Text style={styles.title}>💚 Exclusive Offers</Text>

    <View style={styles.imageWrapper}>
      <Animated.View style={{ transform: [{ scale: zoomAnim }] }}>
        <ImageBackground
          source={{
            uri: "https://i.pinimg.com/736x/a6/cb/61/a6cb6113b2b92ae2422dde6d002dc86e.jpg",
          }}
          style={styles.image}
          imageStyle={styles.imageRadius}
          resizeMode="cover"
        >
          {/* Shimmer overlay */}
          <Animated.View
            style={[
              styles.shimmer,
              {
                transform: [{ translateX: shimmerTranslate }],
              },
            ]}
          />

          {/* 👇 Soft gradient overlay */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.5)"]}
            style={StyleSheet.absoluteFillObject}
          />

          <View style={styles.overlay}>
            <Text style={styles.overlayText}>
              Get special deals every weekend 🍕
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  </Animated.View>
</TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
