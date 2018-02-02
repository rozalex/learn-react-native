import React from 'react'
import {Text, View, AsyncStorage } from 'react-native'
import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Title,
  Content,
  FooterTab,
  Footer
} from 'native-base'

import {initTaskList, ranks, styles, consts} from './resources'
import Item from './Item'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {    
    super(props)

    this.handleItemClick = this.handleItemClick.bind(this);

    const maxScore = this.calculateMaxScore();
    this.state = {
      resourcesLoaded: false,
      taskLIst: [],
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
      const appData = JSON.parse(value);
      this.setState({
        taskLIst: appData.taskLIst || initTaskList,
        score: appData.score || 0,
        resourcesLoaded: true
      })
    })
  }

  calculateMaxScore()  {
    let score = 0;
    initTaskList.forEach(item => {
        score = score + item.Points;
    })
    return score;
  }

  handleItemClick(item, index) {
    const {taskLIst, score} = this.state;
    const newTaskList = [...taskLIst];

    newTaskList[index].isChecked = !item.isChecked;

    const stateItems = {
      score: item.isChecked ? score + item.Points : score - item.Points,
      taskLIst: newTaskList
    }

    this.setState(stateItems); 
    AsyncStorage.setItem(consts.storageKey, JSON.stringify(stateItems));
     
  }

  renderHeader() {
    return (
      <Header></Header>
    );
  }

  renderInstallationList() {
    const {taskLIst} = this.state;

    return taskLIst.map((item, index) => {
      return (
        <Item key={index} index={index} item={item} handleClick={this.handleItemClick} />
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

