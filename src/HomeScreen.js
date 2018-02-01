import React from 'react'
import {Text, View, AsyncStorage } from 'react-native'
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Content,
  FooterTab,
  Footer,
  ListItem,
  CheckBox
} from 'native-base'

import {taskList, ranks, styles, consts} from './'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {    
    super(props)

    maxScore = this.calculateMaxScore();
    this.state = {
      resourcesLoaded: false,
      checkedItems: [],
      score: 0,
      maxScore: maxScore
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })

    AsyncStorage.getItem(consts.storageKey).then((value) => {
      const appData = JSON.parse(value) || {checkedItems: [], score: 0};
      this.setState({
        checkedItems: appData.checkedItems,
        score: appData.score,
        resourcesLoaded: true
      })
    })
  }

  calculateScore()  {
    let score = 0;
    taskList.forEach(item => {
      if (this.state.checkedItems.indexOf(item.task) >= 0) {
        score = score + item.Points;
      }
    })
    return score + "";
  }

  calculateMaxScore()  {
    let score = 0;
    taskList.forEach(item => {
        score = score + item.Points;
    })
    return score;
  }

  prepareCheckedItems(item) {
    return new Promise((resolve) => {
      const newCheckedItems = [...this.state.checkedItems];
      if (newCheckedItems.indexOf(item.task) < 0) {
        newCheckedItems.push(item.task);
      } else {
        newCheckedItems.splice(newCheckedItems.indexOf(item.task), 1);
      }

      resolve(newCheckedItems);
    });
  }

  handleItemClick(item) {
    this.prepareCheckedItems(item).then((newCheckedItems) => {
      const score = this.calculateScore();
      const stateItems = {
        checkedItems: newCheckedItems,
        score: score      
      }

      AsyncStorage.setItem(consts.storageKey, JSON.stringify(stateItems));
      this.setState(stateItems);      
    });
  }

  isChecked(item) {
    return this.state.checkedItems.indexOf(item.task) >= 0 ? true : false;
  }

  renderHeader() {
    return (
      <Header></Header>
    );
  }

  renderInstallationList() {
    return taskList.map((item, index) => {
      return (
        <ListItem key={index} onPress={() => this.handleItemClick(item)}>
          <CheckBox onPress={() => this.handleItemClick(item)} checked={this.isChecked(item)} />
          <Body>
            <Text> {item.task}</Text>
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

  renderFooter() {
    const score = Math.ceil(ranks.length * this.state.score / this.state.maxScore); 
    const title = ranks[score] ? ranks[score] : ranks[score-1];

    return (
      <View>
        <Text style={styles.footer}>Your Rank: {title}</Text>
      </View>
    );    
  }

  renderStatus() {
    return (
      <View>
        <Text style={styles.headline}>
          Welcome Young Adventurer!
        </Text>
        <Text style={styles.subtitle}>
          Complete the following tasks and become a react native master!
        </Text>
      </View>
    );
  }

  render() {
    if (!this.state.resourcesLoaded) {
      return (
        <View style={styles.container}>
          <Text>Loading list...</Text>
        </View>
      );
    }

    return (
      <Container>
        {this.renderHeader()}
        {this.renderStatus()}
        {this.renderBody()}
        {this.renderFooter()}
      </Container>
    );
  }
}

