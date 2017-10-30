/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

class ItemsScreen extends React.Component {
  static navigationOptions = {
    title: 'Items'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>hogehoge</Text>
        <Button
          onPress={() => navigate('Detail', { item: 'Itemkk' })}
          title='Show'
        />
      </View>
    );
  }
}

class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Detail page ${navigation.state.params.item} `
  });
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Detail about {params.item}</Text>
      </View>
    );
  }
}

class MypageScreen extends React.Component {
  render() {
    return <Text>Myapge dayo</Text>
  }
}

const MainScreenNavigator = TabNavigator({
  Items: { screen: ItemsScreen },
  Mypage: { screen: MypageScreen }
});

const SimpleApp = StackNavigator({
  Home: {
    screen: MainScreenNavigator,
    navigationOptions: {
      title: 'Qiita'
    }
  },
  Detail: { screen: DetailScreen }
});


const END_POINT = 'https://qiita.com/api/v2/tags/reactjs/items';

export default class App extends Component<{}> {
  render() {
    return <SimpleApp/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
