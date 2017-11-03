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
  Image,
  Button,
  ListView,
  TouchableHighlight
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

const END_POINT = 'https://qiita.com/api/v2/tags/reactjs/items';

class ItemsScreen extends React.Component {

  static navigationOptions = {
    title: 'Items'
  };
  constructor(props) {
    super(props);
    this.state = {
      items: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
    this.renderItem = this.renderItem.bind(this);
  }
  render() {
    const { navigate } = this.props.navigation;
    const site = this.state.loaded;
    if (!site) {
      return this.renderLoadingView();
    }
    return (
      <View>
        <ListView
          dataSource={this.state.items}
          renderRow={this.renderItem}
          renderSeparator={this.renderSeparator}
          onEndReached={() => { console.log('End!!!'); }}
        />
      </View>
    );
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(END_POINT)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          items: this.state.items.cloneWithRows(responseData),
          loaded: true
        })
      })
      .done()
  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  renderSeparator(sectionId, rowId) {
    return <View key={rowId} style={styles.separator}/>;
  }
  renderItem(item) {
    const { navigate } = this.props.navigation;
    console.log(this.props.navigation);
    return (
      <TouchableHighlight onPress={() => { navigate('item', { user: 'Lucy' }) }} >
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            source={{uri: item.user.profile_image_url}}
          />
          <View style={styles.rightContainer}>
            {/*<Button*/}
              {/*onPress={() => navigate('item', { user: 'Lucy' })}*/}
              {/*title='Show'*/}
            {/*/>*/}
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
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

export default class App extends Component<{}> {
  render() {
    return <SimpleApp/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 15,
    margin: 8,
    textAlign: 'left'
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: 0
  }
});
