import React,{useState,useRef} from 'react';
import auth from '@react-native-firebase/auth';

import { GoogleSignin,statusCodes ,GoogleSigninButton} from '@react-native-community/google-signin';
import RegisterUser from './../components/RegisterUser.js';
import Home from './../components/Home.js';
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
const Login: () => React$Node = ({navigation}) => {


 
  GoogleSignin.configure({
      scopes: ['email'],
      webClientId: '318414018024-uo3bhhu40cet54qgnnctkupbm3fdq2t9.apps.googleusercontent.com',
   
});

  const [username,setUser]=useState('');
    const [pass,setPass]=useState('');
    const [logined,setLog]=useState('');
 
 const goToHome=()=>{

navigation.navigate('Home');
 }
    login=(username,pass) => {

     if(username!==''&&pass!==''){
    auth().signInWithEmailAndPassword(username, pass)
  .then((user) => {
    if(user){
       var User=auth().currentUser;
      alert('Chúc mừng tài khoản ' + User.email +' Đăng nhập thành công');
      setUser('');
      setPass('');
      goToHome();
  
    }
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('Email hoặc mật khẩu không đúng')
  });
  
    }
    else{
      alert('Vui lòng nhập UserName và Password')
    }
}


  signInWithGG = async () => {
  const { idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};


getCurrentUserInfo = async () => {
    try {
    const userInfo = await GoogleSignin.signInSilently();
    alert(JSON.stringify(userInfo.user.toJSON()))
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      alert(error.code)
    } else {
    
    }
  }
};

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
          onPress={
            ()=>{login(username,pass)}}
        >
        
        <View style={styles.witdhbtn}>

        <Text style={styles.textbtn}>Log In</Text>
        </View>
                </TouchableOpacity>
         <TouchableOpacity
          style={styles.button, styles.horizontal}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={()=>navigation.navigate('RegisterUser')}
          backgroundColor="blue"
        >
        
        <View style={styles.witdhbtn}>

        <Text style={styles.textbtn}>Sign Up</Text>
        </View>
                </TouchableOpacity>        

        <View style={ styles.buttonG,styles.horizontal}>
        <View style={styles.witdhbtnG}>
          <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Auto}
          onPress={() => signInWithGG().then(()=>getCurrentUserInfo())}
           
          />
        </View>
        </View>
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
    position:"relative",
    flex:0.5
  },
  image:{
     height:200,
     width:200,
     padding:10,
     borderRadius:30,
     zIndex:1,
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
    position:"relative",
    flex:0.8,
    borderWidth:2,
    borderRadius:10 ,
    borderColor:"red",
    height:50,
    zIndex:2,
  },
  witdhbtn:{
    position:"relative",
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
    zIndex:2,
    position:"relative",
    flex:0.8,
    borderWidth:2,
    marginTop:20,
    borderRadius:10,
    borderColor:"red",
    height:50
  }

});
export default Login;