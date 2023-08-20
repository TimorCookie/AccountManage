import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SectionList,
  LayoutAnimation,
} from 'react-native';

import {getItem} from '../utils';

import AddAccount from '../components/AddAcount';
import icon_add from '../assets/icon_add.png';
import icon_game from '../assets/icon_game.png';
import icon_platform from '../assets/icon_platform.png';
import icon_bank from '../assets/icon_bank.png';
import icon_other from '../assets/icon_other.png';
import icon_arrow from '../assets/icon_arrow.png';

const iconMap: any = {
  游戏: icon_game,
  平台: icon_platform,
  银行卡: icon_bank,
  其他: icon_other,
};

export default () => {
  const addAccountRef = useRef(null);
  const [sectionData, setSectionData] = useState<any>([]);
  const [sectionState, setSectionState] = useState<any>({
    游戏: true,
    平台: true,
    银行卡: true,
    其他: true,
  });

  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>账号管理</Text>
      </View>
    );
  };
  const renderSectionHeader = ({section}: any) => {
    return (
      <View
        style={[
          styles.groupHeader,
          {
            borderBottomLeftRadius:
              !section.data.length || !sectionState[section.type] ? 12 : 0,
            borderBottomRightRadius:
              !section.data.length || !sectionState[section.type] ? 12 : 0,
          },
        ]}>
        <Image source={iconMap[section.type]} style={styles.typeImg} />
        <Text style={styles.typeTxt}>{section.type}</Text>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => {
            const copy = {...sectionState};
            copy[section.type] = !copy[section.type];
            LayoutAnimation.easeInEaseOut();
            setSectionState(copy);
          }}>
          <Image
            source={icon_arrow}
            style={[
              styles.arrowImg,
              {
                transform: [
                  {rotate: sectionState[section.type] ? '0deg' : '-90deg'},
                ],
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderSectionItem = ({item, index, section}: any) => {
    if (!sectionState[item.type]) {
      return null;
    }
    return (
      <View style={styles.itemLayout}>
        <Text style={styles.nameTxt}>{item.name}</Text>
        <View style={styles.accpwdLayout}>
          <Text style={styles.accpwdTxt}>账号：{item.account}</Text>
          <Text style={styles.accpwdTxt}>密码：{item.password}</Text>
        </View>
      </View>
    );
  };
  const loadList = () => {
    getItem('accountList').then(data => {
      const accountList = data ? JSON.parse(data) : [];
      console.log(accountList);
      const gameList = accountList.filter((item: any) => {
        return item.type === '游戏';
      });
      const platformList = accountList.filter(
        (item: any) => item.type === '平台',
      );
      const bankList = accountList.filter(
        (item: any) => item.type === '银行卡',
      );
      const otherList = accountList.filter((item: any) => item.type === '其他');
      const sectionData = [
        {type: '游戏', data: gameList},
        {type: '平台', data: platformList},
        {type: '银行卡', data: bankList},
        {type: '其他', data: otherList},
      ];
      setSectionData(sectionData);
    });
  };
  useEffect(() => {
    loadList();
  }, []);
  return (
    <View style={styles.root}>
      {renderTitle()}
      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => item + index}
        renderItem={renderSectionItem}
        renderSectionHeader={renderSectionHeader}
        style={styles.sectionLayout}
      />
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.5}
        onPress={() => {
          (addAccountRef as any).current.show();
        }}>
        <Image style={styles.addImg} source={icon_add} />
      </TouchableOpacity>

      <AddAccount ref={addAccountRef} onSave={() => loadList()} />
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
  sectionLayout: {
    paddingHorizontal: 12,
  },
  groupHeader: {
    flexDirection: 'row',
    width: '100%',
    height: 46,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  typeImg: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  typeTxt: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  arrowButton: {
    position: 'absolute',
    right: 0,
    padding: 16,
  },
  arrowImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  itemLayout: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  nameTxt: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },

  accpwdLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  accpwdTxt: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    marginTop: 12,
    marginBottom: 6,
  },
});
