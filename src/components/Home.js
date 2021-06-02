import React,{useState,useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import { GoogleSignin,statusCodes ,GoogleSigninButton} from '@react-native-community/google-signin';
import RegisterUser from './../components/RegisterUser.js';
import { NavigationContainer } from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import MapView,{Marker,Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import MapViewDirections from 'react-native-maps-directions';
import PubNubReact from "pubnub-react";



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
  PermissionsAndroid,
  FlatList,
  Platform,
  Modal,
  Pressable,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome5'



const Home: () => React$Node = ({navigation}) => {


 const [key,setKey]=useState('');
  const [ref,setRef]=useState('');
  const [loading,setLoading]=useState(false);
    const [isDirection,setisDirection]=useState(false);
  const [data,setData]=useState([])
    const [selectid,setSelectid]=useState('');
        const [camera,setCamera]=useState('');
        const [modalshow,setModalshow]=useState(false);
        const [distance,setDistance]=useState('');
        const [duration,setDuration]=useState('');


   const [position, setPosition] = useState('');
   const[destination,setDestination]=useState('')
 var markers=[

 { 
   id:1,
  latlng:{
    latitude: 16.0060588,
    longitude: 108.2424348,
  },
    title: 'Bãi đỗ xe Đầm Sen',
    subtitle: 'Bãi đỗ xe'
  },
  { 
   id:2,
  latlng:{
    latitude: 16.0014173,
    longitude: 108.2218112,
  },
    title: 'Bãi đỗ xe SVĐ Hòa Xuân',
    subtitle: 'Bãi đỗ xe'
  },
  { 
   id:3,
  latlng:{
    latitude: 15.9984614,
    longitude: 108.2303253,
  },
    title: 'Bãi đỗ xe Bình Kỳ',
    subtitle: 'Bãi đỗ xe'
  },
  { 
   id:4,
  latlng:{
    latitude: 16.0044465,
    longitude: 108.1927123,
  },
    title: 'Bãi đỗ xe Phong Bắc',
    subtitle: 'Bãi đỗ xe'
  },
  { 
   id:5,
  latlng:{
    latitude: 15.994782,
    longitude: 108.2034297,
  },
    title: 'Bãi đỗ xe Trường Sơn',
    subtitle: 'Bãi đỗ xe'
  },
  
 ];

const GOOGLE_MAPS_APIKEY="";

 
useEffect(()=>{

setData(markers)


},[])



const removeAccents=(str)=> {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"    
  ];
  for (var i=0; i<AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}





const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: " App GPS Permission",
        message:
          " App needs access to your GPS " +
          "so you can take awesome location.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
  interval: 10000,
  fastInterval: 5000,
})
  .then((data) => {
    if(data){
        Geolocation.getCurrentPosition(position =>{

          setPosition(position);
        })
          
      .catch(err => console.log("Something went wrong"))
      .catch({ 
       enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0});
  
      }
    
  })
  .catch((err) => {
   
  });
    } else {
      alert("GPS permission denied");
    }
  } catch (err) {
    alert(err);
  }
};

const onChangeKey=(key)=>{
  setKey(key);
  setData(markers)
  if(key!==''){
setLoading(true)
setisDirection(false)
 const newData = data.filter(item => {      
    const itemData = removeAccents(item.title.toUpperCase());
     const textData = removeAccents(key.toUpperCase());
      
     return itemData.includes(textData);    
  });    
setData(newData)
}
else{
  setLoading(false)
  setisDirection(false)

}

}
const onSelected=(id)=>{
 setSelectid(id);
 alert(selectid);
}







  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
       
         <View style={styles.content}>
         
               
         <View  style={ styles.keysearch}>
          <Icon style={styles.iconsearch}  name="search" color="white" size={20}/>
          <TextInput
          style={styles.input}
          placeholder="Key Search"
          onChangeText={(key)=>onChangeKey(key)}
           defaultValue={key}
           placeholderTextColor="white" 

          />
        </View>
        {loading&&
         
          <FlatList 
           data={data}
        
        keyExtractor={item => item.id}
        extraData={selectid}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Icon name="marker" color="red"/>
            <Text style={styles.listItemText}
                onPress={()=>{setCamera(item),setLoading(false),setKey('')}}
            >{item.title}</Text>
          </View>
        )}
          >
        </FlatList>
        
      }

      {
        modalshow&&position!==''&&destination!==''&&isDirection&& 
        <Modal 
         animationType="slide"
        transparent={true}
        visible={modalshow}
         onBackdropPress={() => setModalshow(!modalshow)}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalshow(!modalshow);
        }}
        
        >
          <Pressable 
          onPressIn={()=>{setModalshow(!modalshow),setisDirection(false)}}
          onPressOut={()=>{setModalshow(!modalshow),setisDirection(false)}}

          >
         <View style={styles.modalView}>
          <Text style={styles.modaltext}>Khoảng cách: {distance} km</Text>
           <Text style={styles.modaltext}>Thời gian: {parseInt(duration/60)}giờ {parseInt(duration%60)}phút</Text>

         </View>
         </Pressable>

        </Modal>
      }
          <MapView
           style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled = {true}
           initialRegion={{
      latitude: 16.047079,
      longitude: 108.206230,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
  {data.map(marker => (
    Platform.OS==='android'&&
    <Marker key={marker.id}
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.subtitle}
      onPress={(e)=>setDestination(e.nativeEvent.coordinate)}
      animateMarkerToCoordinate={camera.latlng,500}
    
    >
      <Image
      source={require('../assets/LOGO.gif')}
    style={styles.imgmarker}
    resizeMode="contain"
      />
    </Marker>
      
      
  ))}
   {position!==''&&destination!==''&&isDirection&&   
 <MapViewDirections
    origin={{
    latitude:JSON.stringify(position.coords.latitude),
    longitude: JSON.stringify(position.coords.longitude)
  }
  }
    destination={{
    latitude: destination.latitude,
    longitude: destination.longitude,
  }}
   optimizeWaypoints={true}
            onStart={(params) => {
              alert(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
            setDistance(result.distance)
            setDuration(result.duration)
}}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor="red"
    resetOnChange
  />
}
  </MapView>
  <TouchableOpacity
          style={styles.buttonPosition}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={
            ()=>requestPermission()}

        >
        <Icon style={styles.iconposition}  name="search-location" color="white" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDirection}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={
            ()=>{setisDirection(true),setModalshow(true)}
}
        >
        <Icon style={styles.icondirection}  name="arrow-right" color="white" size={20} />
        </TouchableOpacity>
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
 
  content:{
 flex:1

  },
  input:{
  flex:0.9,
  color:"white",
  paddingLeft: 0,
    
  },
  buttonPosition:{
    position:'absolute',
    bottom:10,
    width:50,
    height:50,
    zIndex:2,
    borderWidth:1,
    borderRadius:20,
    backgroundColor:"red",
    borderColor:'red',
    right:0,
    opacity:1,
    justifyContent:'center',
  },
  buttonDirection:{
    position:'absolute',
    bottom:10,
    width:50,
    height:50,
    zIndex:2,
    borderWidth:1,
    borderRadius:20,
    backgroundColor:"red",
    borderColor:'red',
    left:0,
    opacity:1,
    justifyContent:'center',
  },
  icondirection:{
    left:15
  },
  iconposition:{
    left:15,
  },
   
  map:{
  flex:1,
  zIndex:1,
  position:'relative',
    
  },
  imgmarker:{
  width: 20,
   height: 20,
    borderRadius:1,
    borderWidth:2
  },
  keysearch:{
  flexDirection:'row',
  justifyContent:"center",
    borderWidth:2,
    borderRadius:10 ,
    borderColor:"red",
    backgroundColor:'red',
    color:"white",
  },
  iconsearch:{
    padding:10,
  },
  listItem: {
    flexDirection:'row',
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',

  },
  listItemText: {
    fontSize: 18,
    padding:10,
  },
  modaltext:{
 fontSize:20,
 padding:20
  },
   modalView: {
    margin: 20,
    borderWidth:2,
    borderColor:"red",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    height:200,
    top:20,
    bottom:20,
  
  }
  

});
export default Home;
