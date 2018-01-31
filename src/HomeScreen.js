import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, ListItem, CheckBox } from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);
    this.state = {
      fontLoaded: false,
      checkedItems: []
    };
  }

  async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });

      this.setState({
        fontLoaded: true,
      });

      AsyncStorage.getItem('checkedItems').then((value) => {
        this.setState({
          checkedItems: JSON.parse(value)
        });
      });
  }

  handleItemClick(item) {
    const checkedItems = this.state.checkedItems;

    if (checkedItems.indexOf(item) < 0) {
      checkedItems.push(item);
    } else {
      checkedItems.splice(checkedItems.indexOf(item), 1);
    }

    AsyncStorage.setItem("checkedItems",JSON.stringify(checkedItems));
    this.setState({checkedItems: checkedItems});
  }

  isChecked(item) {
    return this.state.checkedItems.indexOf(item) >= 0 ? true : false;
  }

  renderHeader() {
    return (
      <Header>
        <Left/>
        <Body>
          <Title></Title>
        </Body>
        <Right />
      </Header>
    );
  }

  renderInstallationList() {
    const installationList = [
      "Native Components",
      "Native Base Components",
      "IOS vs Android Development",
      "Routing",
      "AsyncStorage",
      "Redux",
      "Release to store",
      "Splash screen",
      "Internalization",
      "Emulation tools",
      "Expo",
      "REST call",
      "eslint",
      "Tests"
    ];

    return installationList.map((item, index) => {
      return (
        <ListItem key={index} onPress={() => this.handleItemClick(item)}>
          <CheckBox onPress={() => this.handleItemClick(item)} checked={this.isChecked(item)} />
          <Body>
            <Text> {item}</Text>
          </Body>
        </ListItem>
      )
    })    
  }

  renderBody() {
    return (
      <Content>
        {this.renderInstallationList()}
      </Content>
    );  
  }

  printChecked() {
    return this.state.checkedItems.map((item, index) => {
      return (
        <ListItem key={index}>
          <Body>
            <Text>{item}</Text>
          </Body>
        </ListItem>
      )
    }) 
  }

  render() {
    if (!this.state.fontLoaded) {
      return (
        <View style={styles.container}>
          <Text>Loading list...</Text>
        </View>
      );
    }

    return (
      <Container>
        {this.renderHeader()}
        <Text style={styles.headline}>List of features in this App</Text>
        {this.renderBody()}
        <View style={styles.newButton}>
          <Button rounded success><Text> New Item </Text></Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    backgroundColor: 'skyblue',
  },
  newButton: {
    position: 'absolute',
    bottom: 13,
    right: 13,
  },
});
