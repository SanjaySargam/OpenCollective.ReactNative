import AsyncStorage from '@react-native-async-storage/async-storage';
  
export const storeSlug = async (slug:string) => {
    try {
      await AsyncStorage.setItem("slug", JSON.stringify(slug));
    } catch (error) {
      console.log(error);
    }
};

export const getSlug = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("slug");
      const slug = JSON.parse(savedUser as string);
      console.log("Slug",slug);
      return slug as string
    } catch (error) {
      console.log(error);
    }
};
