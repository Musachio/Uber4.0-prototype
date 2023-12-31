import React, {useState, useContext, useEffect, useRef, useMemo, useCallback} from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import { colors, parameters } from "../global/styles"
import MapComponent from '../components/MapComponent'
import { OriginContext, DestinationContext } from '../contexts/contexts'
import BottomSheet, { BottomSheetFlatList, BottomSheetSectionList } from '@gorhom/bottom-sheet'
import { carTypeData, rideData } from '../global/data'
import tw from 'tailwind-react-native-classnames'




const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function RequestScreen({ navigation, route }) {

  const { origin, dispatchOrigin } = useContext(OriginContext)
  const [userOrigin, setUserOrigin] = useState({latitude:origin.latitude, longitude:origin.longitude})
  
  const { destination, dispatchDestination } = useContext(DestinationContext)
  const [userDestination, setUserDestination] = useState({latitude:destination.latitude, longitude:destination.longitude})

  const bottomsheet1 = useRef(1);
  const snapPoints1 = useMemo(() => ['10%','40%','60%'])
  const [selected, setSelected] = useState(null);

  

  
useEffect(() => {
  setUserOrigin({
    latitude: origin.latitude,
    longitude: origin.longitude,
  });
  setUserDestination({
    latitude: destination.latitude,
    longitude: destination.longitude,
  })
}, [origin, destination]);    
  

  
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Icon
          type="material-community"
          name="arrow-left"
          color={colors.grey1}
          size={32}
        />
      </View>
      <View>
        <View style={styles.view4}>
          <View></View>
        </View>
      </View>
      <MapComponent userOrigin={userOrigin} userDestination={userDestination} />
      <BottomSheet snapPoints={snapPoints1} enableHandlePanningGesture={true}>
        <Text style={tw`text-center text-xl font-bold `}>Pick a ride</Text>
        <BottomSheetFlatList
          data={carTypeData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`flex-row justify-between items-center px-10 ${
                item.id === selected?.id && "bg-gray-200"
              }`}
              onPress={() => setSelected(item)}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
                source={item.image}
              />
              <View>
                <Text style={tw`text-xl font-semibold`}>{item.name}</Text>
                <Text>{item.time}min</Text>
              </View>
              <Text style={tw`text-xl`}>{item.price}R</Text>
            </TouchableOpacity>
          )}
        />
        <View>
          <TouchableOpacity
            disabled={!selected}
            style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
          >
            <Text style={tw`text-center text-white text-xl`}>
              Choose {selected?.name}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    paddingTop: parameters.statusBarHeight,
  },

  container: {
    flex: 1,
    paddingTop: parameters.statusBarHeight,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },

  view1: {
    position: "absolute",
    top: 25,
    left: 12,
    backgroundColor: colors.white,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    zIndex: 8,
  },

  view2: {
    height: SCREEN_HEIGHT * 0.21,
    alignItems: "center",
    zIndex: 5,
    backgroundColor: colors.white,
  },

  view3: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 10,
    backgroundColor: colors.white,
    //height:30,
    zIndex: 10,
  },
  view4: {
    flexDirection: "row",
    alignItems: "center",
  },
  view5: {
    backgroundColor: colors.grey7,
    width: SCREEN_WIDTH * 0.7,
    height: 40,
    justifyContent: "center",
    marginTop: 10,
  },
  view6: {
    backgroundColor: colors.grey6,
    width: SCREEN_WIDTH * 0.7,
    height: 40,
    justifyContent: "center",
    marginTop: 10,
    paddingLeft: 0,
  },
  text1: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.grey1,
  },

  image1: { height: 70, width: 30, marginRight: 10, marginTop: 10 },
  view7: {
    flexDirection: "row",
    alignItems: "center",
  },
  view8: {
    marginLeft: 10,
  },
  view10: {
    alignItems: "center",
    flex: 5,
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: colors.grey5,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
  },
  view11: {
    backgroundColor: colors.grey,
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    marginTop: 15,
  },

  contentContainer: {
    backgroundColor: "white",
  },

  view12: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey4,
  },

  text2: {
    fontSize: 18,
    color: colors.grey1,
  },
  text3: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
    marginRight: 5,
  },

  text4: { color: colors.grey2, marginTop: 4 },

  view13: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  button1: {
    height: 40,
    width: 100,
    backgroundColor: colors.grey6,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  button2: {
    height: 50,
    backgroundColor: colors.grey10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 30,
  },

  button1Text: {
    fontSize: 17,
    marginTop: -2,
    color: colors.black,
  },

  button2Text: {
    color: colors.white,
    fontSize: 23,
    marginTop: -2,
  },

  view14: {
    alignItems: "center",
    flex: 5,
    flexDirection: "row",
  },
  view15: {
    backgroundColor: colors.grey6,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  view16: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  text5: {
    fontSize: 12,
    color: colors.black,
    marginLeft: 3,
    fontWeight: "bold",
    paddingBottom: 1,
  },

  view17: {},

  view18: {},

  view19: { flex: 1.7, alignItems: "flex-end" },

  icon: { paddingBottom: 2 },

  image2: { height: 60, width: 60 },

  view20: { marginRight: 10 },

  text6: {
    fontSize: 15,
    color: colors.black,
    fontWeight: "bold",
  },

  view21: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginTop: 15,
  },

  view22: {
    alignItems: "center",
    marginBottom: -20,
  },

  sectionHeaderContainer: {
    backgroundColor: "white",
    marginTop: 30,
    paddingLeft: 15,
  },

  text7: {
    fontSize: 28,
    color: colors.black,
    marginRight: 5,
  },

  text8: {
    fontSize: 15,
    color: colors.grey2,
    textDecorationLine: "line-through",
  },

  button3: {
    height: 60,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH - 110,
    marginBottom: 10,
  },

  view23: {
    flexDirection: "row",
    backgroundColor: colors.cardbackground,
    // elevation:10,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    height: 80,
  },

  button2Image: {
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grey6,
    marginBottom: 10,
  },
  text9: { fontSize: 15, color: colors.grey1 },

  map: {
    marginVertical: 0,
    width: SCREEN_WIDTH,
    zIndex: -1,
  },

  centeredView: {
    zIndex: 14,
  },
  modalView: {
    marginHorizontal: 20,
    marginVertical: 60,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 16,
  },

  view24: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    paddingHorizontal: 20,
  },

  view25: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  flatlist: {
    marginTop: 20,
  },

  text10: { color: colors.grey2, paddingLeft: 10 },
  view50: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
  },
});