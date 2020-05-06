import React, { Component } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';

import api from '../services/api';

export default class New extends Component {
  static navigationOption = {
    headerTitle: 'Nova Publicação'
  };
  state = {
    author: 'Israel',
    place: 'Barra do Mendes',
    description: 'Isso é apenas um teste',
    hashtags: '#nenhuma',
    image: null,
    preview: null,
  };

  handleSelectImage = async () => {

    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      exif: true,
      base64: true
    });

    let prefix;
    let ext;
    if (pickerResult.uri) {
      let filename = pickerResult.uri.split('.')
      let auxPrefix = filename[2].split('/');
      prefix = auxPrefix[5];
      ext = filename[3];
      ext = ext === 'heic' ? 'jpg' : ext;
    } else {
      prefix = new Date.getTime();
      ext = 'jpg';
    }
    const img = {
      name: `${prefix}.${ext}`,
      type: pickerResult.type,
      uri: pickerResult.uri,
    }

    if (!pickerResult.cancelled) {
      this.setState({ preview: `data:image/jpeg;base64,${pickerResult.base64}` });
      this.setState({ image: img });
    }
    console.log(this.state.image);
  };

  handleSubmit = async () => {

    const data = new FormData();
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);
    data.append('image', this.state.image);
    await api.post('posts', data)
      .then(function (response) {
        console.log(`POST: ${response}`);
      })
      .catch(function (error) {
        console.log(`Error: ${error}`);
      });;
    //this.props.navigation.navigate('Feed');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage} >
          <Text style={styles.selectButtonText}>Selecionar imagem</Text>
        </TouchableOpacity>
        {this.state.preview && <Image style={styles.preview} source={{ uri: this.state.preview }} />}
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Nome do autor'
          placeholderTextColor='#999'
          value={this.state.author}
          onChangeText={author => this.setState({ author })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Local da Foto'
          placeholderTextColor='#999'
          value={this.state.place}
          onChangeText={place => this.setState({ place })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Descrição'
          placeholderTextColor='#999'
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Hashtags'
          placeholderTextColor='#999'
          value={this.state.hashtags}
          onChangeText={hashtags => this.setState({ hashtags })}
        />
        <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit} >
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});
