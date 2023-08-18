import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {Modal, View, StyleSheet} from 'react-native';

const AddAccount = (props: any, ref: any) => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };
  useImperativeHandle(ref, () => {
    return {
      hide,
      show,
    };
  });
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={hide}
      statusBarTranslucent={true}
      animationType="fade">
      <View style={styles.root}></View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
});

export default forwardRef(AddAccount);
