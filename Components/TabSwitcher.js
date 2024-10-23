import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const TabSwitcher = ({tabs, onTabChange}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const indicatorWidth = screenWidth / tabs.length;

  useEffect(() => {
    // Callback to inform the parent component about the change in active tab
    onTabChange(activeTab);
  }, [activeTab, onTabChange]);

  return (
    <View style={styles.tabContainer}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => setActiveTab(tab.key)}>
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
      <View style={styles.indicatorContainer}>
        <View
          style={[
            styles.indicator,
            {
              width: indicatorWidth,
              transform: [
                {
                  translateX:
                    tabs.findIndex(tab => tab.key === activeTab) *
                    indicatorWidth,
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ABABAB',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    color: '#868C8E',
    fontSize: 20,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#007AFF',
  },
  activeTabText: {
    color: '#4A4D4E',
    fontWeight:'bold'
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
  },
  indicator: {
    height: 3,
    backgroundColor: '#49BFD4',
  },
});

export default TabSwitcher;
