import uuid from 'react-native-uuid';

export const getUUID = () => {
  try {
    return uuid.v1() || ''
  } catch (error) {
    console.log(error)
  }

}