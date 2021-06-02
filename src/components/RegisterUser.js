import React,{useState} from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin,statusCodes ,GoogleSigninButton} from '@react-native-community/google-signin';
import Login from './../components/Login.js';
import { NavigationContainer } from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
var btn='Login'
const RegisterUser: () => React$Node = ({navigation}) => {


  const [username,setUser]=useState('');
    const [pass,setPass]=useState('');
    const [user]=useState('')
    Register=(username,pass) => {
     if(username!==''&&pass!==''){
    auth().createUserWithEmailAndPassword(username, pass)
  .then((user) => {
    // Signed in
     if(user){

      var User=auth().currentUser;
    alert('Chúc mừng tài khoản ' + User.email +' Đăng Ký Thành Công')
     setUser('');
      setPass('');

}   

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('Email đã tồn tại')
  });
  
    }
    else{
      alert('Vui lòng nhập UserName và Password')
    }
}



  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
       
        <View style={styles.logo} >
        <View style={styles.horizontal}>
          <Image style={styles.image}
            source={require('./../../LOGO.gif')}
          ></Image>
        </View>
        </View>
         <View style={styles.content}>
         <View style={styles.horizontal}>
         <View style={ styles.user}>
        <TextInput 
        placeholder="UserName"
        onChangeText={username=> setUser(username)}
        defaultValue={username}
        />
        </View>
        </View>
        <View style={styles.horizontal}>
        <View style={ styles.password}>
        <TextInput 
        placeholder="Password"
         onChangeText={pass => setPass(pass)}
        defaultValue={pass}
        secureTextEntry={true}
        />
        </View>
        </View>
        </View>
          <TouchableOpacity
          style={styles.button, styles.horizontal}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={()=>Register(username,pass)}
          backgroundColor="blue"
        >
        
        <View style={styles.witdhbtn}>

        <Text style={styles.textbtn}>Sign Up</Text>
        </View>
                </TouchableOpacity>

          <TouchableOpacity
          style={styles.button, styles.horizontal}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={()=>navigation.navigate('Login')}
          backgroundColor="blue"
        >
        
        <View style={styles.witdhbtn}>

        <Text style={styles.textbtn}>Log In</Text>
        </View>
                </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    flexDirection: "column",
    justifyContent:"center"
  },
  horizontal:{
  flexDirection:'row',
  justifyContent:"center"
  },
 
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  title:{
    flex:0.3
  },
  logo:{
    flex:0.5
  },
  image:{
     height:200,
     width:200,
     padding:10,
     borderRadius:30,
  },
  button:{
    marginBottom:20,
  
  },
   buttonG:{
    margin:20,

  },
  content:{
 flex:0.4
  },
  user:{
    flex:0.8,
    borderWidth:2,
    borderRadius:10 ,
    borderColor:"red",
    height:50
  },
  witdhbtn:{
    flex:0.9,
    backgroundColor:'red',
    height:50,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center',
    fontWeight:'bold',
    marginBottom:20


  }
  ,
  textbtn:{
   color:'white',
   fontSize:20,

  },
   witdhbtnG:{
    flex:0.5,

  }
  ,
  password:{
    flex:0.8,
    borderWidth:2,
    marginTop:20,
    borderRadius:10,
    borderColor:"red",
    height:50
  }

});
export default RegisterUser;