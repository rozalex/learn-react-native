import React from 'react'
import {Text} from 'react-native'
import {ListItem, CheckBox, Body} from 'native-base'

export default class Item extends React.Component {
  constructor(props) {    
    super(props)
  }

  render() {
    const {item, handleClick, index} = this.props;
    return (
      <ListItem onPress={() => handleClick(item, index)}>
        <CheckBox onPress={() => handleClick(item, index)} checked={item.isChecked} />
        <Body>
          <Text> {item.task}</Text>
        </Body>
      </ListItem>
    );
  }
}

