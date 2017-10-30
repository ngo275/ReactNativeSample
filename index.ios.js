import React from 'react';
import { AppRegistry } from 'react-native'
import ReactApp from './index.js'
// Had you placed index.js in another folder like `./app`, you could instead do your import with this shorthand:
// import ReactApp from './app'

// AppRegistry.registerComponent('ReactApp', () => ReactApp)

class AwesomeProject extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Welcome to React Native!
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
