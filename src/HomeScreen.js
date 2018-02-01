import React from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
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

const taskList = [
  {task: "Install Node.js", Points: 1},
  {task: "Install IDE (Sublime, Atom, etc..)", Points: 1},
  {task: "Install Expo XDE to your computer", Points: 2},
  {task: "Install Expo on your smartphone", Points: 1},
  {task: "Create new react native project with Expo", Points: 3},
  {task: "Run your project on your mobile device", Points: 1},
  {task: "Learn react native mobile components", Points: 3},
  {task: "Learn about styling for react native", Points: 2},
  {task: "Learn about routing", Points: 3},
  {task: "Learn about React lifecycle", Points: 3},
  {task: "Learn about AsyncStorage", Points: 2},
  {task: "Learn about Fetch", Points: 3},
  {task: "Install Genymotion", Points: 2},
  {task: "Run your app with Genymotion", Points: 2},
  {task: "Create a splash screen", Points: 2},
  {task: "Read about internalization", Points: 2},
  {task: "Read about redux", Points: 2},
  {task: "Add Tests to your app", Points: 4},
];

const ranks = [
  "Newbie", 
  "Rookie", 
  "Beginner", 
  "Talented", 
  "Skilled", 
  "Intermediate", 
  "Skillful", 
  "Seasoned", 
  "Proficient", 
  "Experienced", 
  "Advanced", 
  "Senior", 
  "Expert"
]

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {    
    super(props)

    maxScore = this.calculateMaxScore();
    this.state = {
      fontLoaded: false,
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

    this.setState({
      fontLoaded: true
    })

    AsyncStorage.getItem('checkedItems').then((value) => {
      this.setState({checkedItems: JSON.parse(value)})
    })
    AsyncStorage.getItem('score').then((value) => {
      this.setState({score: value})
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
  handleItemClick(item) {
    const checkedItems = this.state.checkedItems;

    if (checkedItems.indexOf(item.task) < 0) {
      checkedItems.push(item.task);
    } else {
      checkedItems.splice(checkedItems.indexOf(item.task), 1);
    }

    AsyncStorage.setItem("checkedItems",JSON.stringify(checkedItems));
    const score = this.calculateScore();
    AsyncStorage.setItem("score", score);

    this.setState({
      checkedItems: checkedItems,
      score: score
    });
  }

  isChecked(item) {
    return this.state.checkedItems.indexOf(item.task) >= 0 ? true : false;
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
      <Footer>
        <FooterTab>
          <Button full>
            <Text style={styles.footer}>Your Rank: {title}</Text>
          </Button>
        </FooterTab>
      </Footer>
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
        {this.renderStatus()}
        {this.renderBody()}
        {this.renderFooter()}
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
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    backgroundColor: 'skyblue',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    backgroundColor: 'skyblue',
  },
  footer: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'skyblue',
  }
});
