import React from 'react';
import { Card, Button } from 'react-native-elements';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Deck from './src/Deck';


const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Kawasaki_Ninja_250_2018.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.kevamotor.se/wp-content/uploads/2014/09/kx-250-14.jpg' },
  /* { id: 3, text: 'Card #3', uri: '../assets/img.jpg' },
   { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
   { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
   { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
   { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
   { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
 */
];


class App extends React.Component {


  renderCard(item) {
    return (
      <Card key={item.id}>
        <Card.Title>{item.text}</Card.Title>
        <Card.Image
          source={{
            uri: `${item.uri}`,
          }}
        />
        <Text style={{ marginBottom: 10 }}>
          I can customize the Card further.
        </Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
          title="View Now!"
        />
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
      <Card title="All done!" style={{ height: '80%' }}>
        <Text style={{ marginBottom: 30 }}>There is no more content here!</Text>
        <Button

          backgroundColor="#03A9F4" title="Get More"
        />
      </Card>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}

        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});

export default App;