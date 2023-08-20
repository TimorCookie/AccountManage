import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import icon_close_modal from '../assets/icon_close_modal.png';

import {getUUID, getItem, saveData} from '../utils';

const AddAccount = (props: any, ref: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [name, setName] = useState<any>('');
  const [account, setAccount] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [id, setId] = useState<string>('');
  const show = () => {
    const uuid = getUUID();
    setId(uuid as string);
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
  const onSavePress = () => {
    const newAccount = {id, type, name, account, password};
    getItem('accountList').then(res => {
      let accountList = res ? JSON.parse(res) : [];
      accountList.push(newAccount);
      saveData('accountList', JSON.stringify(accountList)).then(() => {
        hide();
      });
    });
  };
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
  const renderName = () => {
    const styles = StyleSheet.create({
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333333',
      },
    });
    return (
      <TextInput
        style={styles.input}
        maxLength={20}
        value={name}
        onChangeText={text => {
          setName(text || '');
        }}
      />
    );
  };
  const renderAccount = () => {
    const styles = StyleSheet.create({
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333333',
      },
    });
    return (
      <TextInput
        style={styles.input}
        maxLength={20}
        value={account}
        onChangeText={text => {
          setAccount(text || '');
        }}
      />
    );
  };
  const renderPassword = () => {
    const styles = StyleSheet.create({
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333333',
      },
    });
    return (
      <TextInput
        style={styles.input}
        maxLength={20}
        value={password}
        onChangeText={text => {
          setPassword(text || '');
        }}
      />
    );
  };
  const renderSaveButton = () => {
    const styles = StyleSheet.create({
      saveButton: {
        width: '100%',
        height: 44,
        backgroundColor: '#3050ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 10,
      },
      saveButtonTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
    });
    return (
      <TouchableOpacity style={styles.saveButton} onPress={onSavePress}>
        <Text style={styles.saveButtonTxt}>保 存</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={hide}
      statusBarTranslucent={true}
      animationType="fade">
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <View style={styles.content}>
          {renderTitle()}
          <Text style={styles.subTitleTxt}>账号类型</Text>
          {renderType()}
          <Text style={styles.subTitleTxt}>账号名称</Text>
          {renderName()}
          <Text style={styles.subTitleTxt}>账号</Text>
          {renderAccount()}
          <Text style={styles.subTitleTxt}>密码</Text>
          {renderPassword()}
          {renderSaveButton()}
        </View>
      </KeyboardAvoidingView>
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
