import React,{useState} from "react";
import { Alert, Platform } from "react-native";
import axios from 'axios';
import CreateScreenIOS from './CreateScreen-ios'
import CreateScreenAndroid from './CreatScreen-andriod'
import LoadingScreen from '../../shared/LoadingScreen'
import convertDate from '../../helpers/convertDate'
import * as yup from "yup";

const isIos = Platform.OS === 'ios'

const categories = [
  "Other",
  "Sports",
  "Game",
  "Movie",
  "Learning",
  "Food",
  "Talking"
];
const generateData = () => {
  const result = ["None"];
  for (let i = 0; i < 50; i++) {
    result.push(i);
  }
  return result;
};
const nums = generateData()

export default Create = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (values, actions) => {
    setIsLoading(true);
    console.log("Submitted: ", values)
    axios.post('https://meetnow.herokuapp.com/events',values)
      .then((res) => {
        const eventKey = res.data;
        Alert.alert("Success!", "Event has been sucessfully deleted.", [
          {
            text: "Go to my post",
            onPress: () => {
              setIsLoading(false);
              // actions.resetForm();
              navigation.navigate("EventsStack", {
                screen: "Event",
                params: { eventKey },
              });
            },
          },
          {
            text: "Finish",
            onPress: () => {
              // actions.resetForm();
              setIsLoading(false);
              navigation.navigate('Events',{updated:`Created: ${eventKey}`});
            },
          },
        ]);
      })
      .catch((err) => {
        setIsLoading(false);
        Alert.alert(
          "Oops!",
          `Failed to post event! Please try again!`,
          [
            {
              text: "understood",
              onPress: () => console.log("post request faild!", err),
            },
          ]
        );
      });
  }


  const reviewSchema = yup.object({
    name: yup
      .string()
      .required()
      .min(4),
    startTime: yup
      .string()
      .required()
      .min(1),
    category: yup
      .string()
      .required()
      .min(1),
    minimumParticipants: yup
      .string()
      .required()
      // .test('not-a-negative-number','Minimum Participants must be positive number',(value)=> parseInt(value) >=0
      // )
      .min(1)
  });

  if(isLoading) {
    return (<LoadingScreen/>)
  }


  if(!isIos) {
    return (
      <CreateScreenAndroid 
        submitForm={submitForm} 
        reviewSchema={reviewSchema}
        nums={nums}
        categories={categories}
      />
    )
  }

  return (
    <CreateScreenIOS
    submitForm={submitForm} 
    categories={categories}
    nums={nums}
    reviewSchema={reviewSchema}
    />
  )
}

