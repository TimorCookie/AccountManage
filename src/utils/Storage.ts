import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async (key: string, value: any) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

const getItem = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {}
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};

export {saveData, getItem, removeItem};
