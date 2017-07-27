import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Text, View, ListView, AppRegistry } from 'react-native';
import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyAKMp7fJoCzqKp60MbXZdslJHMJi6IveDo",
    authDomain: "workout-2b867.firebaseapp.com",
    databaseURL: "https://workout-2b867.firebaseio.com",
    projectId: "workout-2b867",
    storageBucket: "workout-2b867.appspot.com",
    messagingSenderId: "1042327629218"
  };
const firebaseApp = firebase.initializeApp(config);
export default class Main extends Component {
  constructor(){
    super();
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      itemDataSource: ds,
    }
    let exerRef = this.getRef().child('Exercises')
    this.itemsRef = this.getRef().child('Exercises')
    this.renderRow = this.renderRow.bind(this);
    this._increment = this._increment.bind(this);
    this._decrement = this._decrement.bind(this);
  }
  getRef(){
    return firebaseApp.database().ref();
  }
  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  componentDidMount(){
    this.getItems(this.itemsRef);
  }
  getItems(itemsRef){
    itemsRef.on('value', (snap) =>{
      let items = []
      snap.forEach((child) => {
        items.push({
          Name: child.val().name,
          W_1: child.val().set_1.weight,
          R_1: child.val().set_1.reps,
          W_2: child.val().set_2.weight,
          R_2: child.val().set_2.reps,
          W_3: child.val().set_3.weight,
          R_3: child.val().set_3.reps,
          W_4: child.val().set_4.weight,
          R_4: child.val().set_4.reps,
          _key: child.key,
        });
      });
      console.log(items)
      this.setState({
          itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });
  }
  _decrement(item){
    console.log(item)
    this.setState({
      item: item - 1
    });
    // var _item = {
    //   weight: item.weight - 1,
    //   _key: item._key
    // };
    // var update = {};
    // update['/sets/' + item._key] = _item;
    // return firebaseApp.database().ref().update(update);
  }

  submitPressed(){
    console.log('Submit!!');
  }

  cancelText(){
    console.log('Cancel');
  }
  _increment(item, idx, amt, cap){
    // console.log(item)
    // this.setState({
    //   str : item + 1
    // });
    // console.log(this.state)
    // var _item = {
    //   weight: item.weight + 1,
    //   _key: item._key
    // };
    attr = cap == 'W' ? 'weight' : 'reps';
    var update = {};
    update['Exercises/' + item._key + '/set_' + idx + '/' + attr] = amt + 1;
    return firebaseApp.database().ref().update(update);
  }
  renderRow(item){
    return (
      <View style={styles.container}>
        <Text style={styles.center}>{item.Name}</Text>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Weight</Text>
          <Text style={styles.label}>Reps</Text>
        </View>
        <View style={styles.attrContainer}>
          <TouchableHighlight style={styles.button} onPress={() => {this._decrement(item.W_1)}}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableHighlight>
          <Text style={styles.center}>{item.W_1}</Text>
          <TouchableHighlight  style={styles.button} onPress={() => {this._increment(item, 1, item.W_1, 'W')}}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        
          <TouchableHighlight style={styles.button} onPress={() => {this._decrement(item.R_1)}}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableHighlight>
          <Text style={styles.center}>{item.R_1}</Text>
          <TouchableHighlight style={styles.button} onPress={() => {this._increment(item, 1, item.R_1, 'R')}}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.attrContainer}>
          <TouchableHighlight style={styles.button} onPress={() => {this._decrement(item.W_1)}}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableHighlight>
          <Text style={styles.center}>{item.W_2}</Text>
          <TouchableHighlight  style={styles.button} onPress={() => {this._increment(item, 2, item.W_2, 'W')}}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        
          <TouchableHighlight style={styles.button} onPress={() => {this._decrement(item.R_2)}}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableHighlight>
          <Text style={styles.center}>{item.R_2}</Text>
          <TouchableHighlight style={styles.button} onPress={() => {this._increment(item, 2, item.R_2, 'R')}}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.attrContainer}>
          <TouchableHighlight style={styles.button} onPress={() => {this._decrement(item.W_3)}}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableHighlight>
          <Text style={styles.center}>{item.W_3}</Text>
          <TouchableHighlight  style={styles.button} onPress={() => {this._increment(item, 3, item.W_3, 'W')}}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        
          <TouchableHighlight style={styles.button} onPress={() => {this._decrement(item.R_3)}}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableHighlight>
          <Text style={styles.center}>{item.R_3}</Text>
          <TouchableHighlight style={styles.button} onPress={() => {this._increment(item, 3, item.R_3, 'R')}}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.attrContainer}>
          <TouchableHighlight style={styles.button} onPress={() => {this._decrement(item.W_4)}}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableHighlight>
          <Text style={styles.center}>{item.W_4}</Text>
          <TouchableHighlight  style={styles.button} onPress={() => {this._increment(item, 4, item.W_4, 'W')}}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        
          <TouchableHighlight style={styles.button} onPress={() => {this._decrement(item.R_4)}}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableHighlight>
          <Text style={styles.center}>{item.R_4}</Text>
          <TouchableHighlight style={styles.button} onPress={() => {this._increment(item, 4, item.R_4, 'R')}}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        </View>
        
      </View>
      );
  }
  render() {
    return (
    <View style={{ flex:8, flexDirection: 'column', justifyContent: 'flex-start'}}>
      <View style={styles.validationContainer}>
        <TouchableHighlight style={styles.submit}
            onPress={() => { this.submitPressed()}}>
            <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.cancel}
            onPress={() => { this.cancelPressed()}}>
            <Text style={styles.cancelText}>Cancel</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.container}>
        <ListView
          dataSource={this.state.itemDataSource}
          renderRow= {this.renderRow}
          style={{marginBottom: 10}}></ListView>
      </View>
      
    </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: 'ghostwhite',
    borderColor: 'dimgrey',
    borderWidth: 2,
  },
  attrContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'skyblue',
    borderColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    width: 40,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
  center: {
    color: "#23ce84",
    fontSize: 32,
    textAlign: 'center',
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  label: {
    color: 'indigo',
    fontSize: 28,
    textAlign: 'center',
  },
  submit: {
    flex: 1,
    backgroundColor: 'limegreen',
  },
  submitText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
  },
  cancel: {
    flex: 1,
    backgroundColor: 'crimson',
  },
  cancelText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
  },
  validationContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('Main', () => Main);
