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
  Dimensions
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome5'
import database from '@react-native-firebase/database';
import SlidingUpPanel from 'rn-sliding-up-panel';

const Home: () => React$Node = ({navigation}) => {

const[time,setTime]=useState('');
const[payment,setPayment]=useState('');
 const [key,setKey]=useState('');
  const [loading,setLoading]=useState(false);
    const [isDirection,setisDirection]=useState(false);
  const [data,setData]=useState([])
    const [marker,setMaker]=useState([])

    const [selectid,setSelectid]=useState('');
        const [camera,setCamera]=useState('');
        const [modalshow,setModalshow]=useState(false);
        const [distance,setDistance]=useState('');
        const [duration,setDuration]=useState('');


   const [position, setPosition] = useState('');
   const[destination,setDestination]=useState('')
   const [showPanel,setShowPanel]=useState(false);
   const [region,setRegion]=useState({

      latitude: 16.047079,
      longitude: 108.206230,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })

  const { width, height } = Dimensions.get('window');

const landScape = width > height;


const GOOGLE_MAPS_APIKEY="AIzaSyBgu-6TvrXDUNv-hZjELjjDlQudWS1B2gI";

 
useEffect(()=>{
database()
  .ref('/')
  .on('value', snapshot => {
          let db=[];
snapshot.forEach(snap=>{
 db.push(snap.val())

});
 
  setData(db)
  setMaker(db)
  console.log(data)
  });



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
  setData(marker)
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
          <Icon style={styles.iconsearch}  name="search" color="white" size={25}/>
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
                onPress={()=>{setLoading(false)}}
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
          setModalshow(!modalshow);
        }}
        
        >
          <Pressable 
          onPressIn={()=>{setModalshow(!modalshow),setisDirection(false)}}
          onPressOut={()=>{setModalshow(!modalshow),setisDirection(false)}}

          >
         <View style={styles.modalView}>
            <View style={styles.modalItem}>
           <Icon  style={styles.iconmodal} name='car' size={25}/>
          <Text style={styles.modaltext}>Khoảng cách: {distance} km</Text>
          </View>
             <View style={styles.modalItem}>
           <Icon style={styles.iconmodal}  name='clock' size={25}/>
           <Text style={styles.modaltext}>Thời gian: {parseInt(duration/60)}giờ {parseInt(duration%60)}phút</Text>
           </View>
              <View style={styles.modalItem}>
           <Icon style={styles.iconmodal} name='store' size={22}/>
            <Text style={styles.modaltext}>Hoạt động: {time} </Text>
            </View>
               <View style={styles.modalItem}>
           <Icon style={{padding:28}} name='dollar-sign' size={25}/>
             <Text style={styles.modaltext}>Phí: {payment} {payment=='free'?"":"VNĐ"}</Text>
             </View>

         </View>
         </Pressable>

        </Modal>
      }
          <MapView
           style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled = {true}
           region={region}
          onRegionChangeComplete={region => setRegion(region)}

         
  >
  {data.map(marker => (
    Platform.OS==='android'&&
    <Marker key={parseInt(marker.id)}
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.subtitle}
      onPress={()=>{setDestination(marker.latlng),setTime(marker.time),setPayment(marker.payment)}}
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
  modalItem:{
    flexDirection:'row',
    justifyContent:'center',

  },
  iconsearch:{
    padding:10,
  },
  iconmodal:{
    padding:22,
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
 fontSize:16,
 padding:20,
 flex:0.9,
 paddingLeft:35,
 color:'red'
  },
   modalView: {
    margin: 20,
    borderWidth:2,
    borderColor:"red",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    height:310,
    backgroundColor:'transparent'
  
  }
  

});
export default Home;