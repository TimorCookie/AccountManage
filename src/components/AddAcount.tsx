import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacityComponent,
  Image,
  TouchableOpacity,
} from 'react-native';
import icon_close_modal from '../assets/icon_close_modal.png';
const AddAccount = (props: any, ref: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>(0);
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
  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
      },
      titleTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
      },
      closeButton: {
        position: 'absolute',
        right: 6,
      },
      closeImg: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
    });
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>添加账号</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => hide()}>
          <Image source={icon_close_modal} style={styles.closeImg} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderType = () => {
    const styles = StyleSheet.create({
      typesLayout: {
        width: '100%',
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
      },
      tab: {
        flex: 1,
        height: '100%',
        borderWidth: 1,
        borderColor: '#c0c0c0',
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabTxt: {
        fontSize: 14,
      },
      leftTab: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      rightTab: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
      moveLeft1Pix: {
        marginLeft: -1,
      },
    });
    const types = ['游戏', '平台', '银行卡', '其他'];
    return (
      <View style={styles.typesLayout}>
        {types.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                index === 0
                  ? styles.leftTab
                  : index === 3
                  ? styles.rightTab
                  : {},
                index > 0 && styles.moveLeft1Pix,
                {backgroundColor: type === item ? '#3050ff' : 'transparent'},
              ]}
              onPress={() => {
                setType(item);
              }}>
              <Text
                style={[
                  styles.tabTxt,
                  {color: type === item ? 'white' : '#666666'},
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={hide}
      statusBarTranslucent={true}
      animationType="fade">
      <View style={styles.root}>
        <View style={styles.content}>
          {renderTitle()}
          <Text style={styles.subTitleTxt}>账号类型</Text>
          {renderType()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
  },
  subTitleTxt: {
    fontSize: 12,
    color: '#666666',
    marginTop: 16,
  },
});

export default forwardRef(AddAccount);
