import React, {useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import icon_add from '../assets/icon_add.png';
import AddAccount from '../components/AddAcount';
export default () => {
  const addAccountRef = useRef(null);
  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>账号管理</Text>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {renderTitle()}
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.5}
        onPress={() => {
          (addAccountRef as any).current.show();
        }}>
        <Image style={styles.addImg} source={icon_add} />
      </TouchableOpacity>

      <AddAccount ref={addAccountRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F0',
  },
  titleLayout: {
    width: '100%',
    height: 46,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleTxt: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 64,
    right: 28,
  },
  addImg: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
});
