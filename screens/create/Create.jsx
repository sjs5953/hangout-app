import React,{useState} from "react";
import { Alert } from "react-native";
import * as yup from "yup";
import axios from 'axios';
import CreateScreen from './CreateScreen'
import LoadingScreen from '../../shared/LoadingScreen'

export default Create = ({navigation}) => {
  const reviewSchema = yup.object({
    name: yup.string()
      .required()
      .min(4),
    // body: yup.string()
    //   .required()
    //   .min(8),
    minimumParticipants: yup.string()
      .required()
      .test('is-num-bigger-than-one','Minimum Participants must be positive number',(value)=> parseInt(value) > 0
      )
  })

  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (values, actions) => {
    setIsLoading(true);
    // axios.post("/events",{values})
    setTimeout(() => {
      Promise.resolve({ data: 1 })
        .then((res) => {
          console.log("Submitted Values: ",values)
          const eventKey = res.data;
          Alert.alert("Success!", "Event has been sucessfully deleted.", [
            {
              text: "Go to my post",
              onPress: () => {
                setIsLoading(false);
                actions.resetForm();
                navigation.navigate("EventsStack", {
                  screen: "Event",
                  params: { eventKey },
                });
               
              },
            },
            {
              text: "Finish",
              onPress: () => {
                setIsLoading(false);
                actions.resetForm();
                navigation.goBack();
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
    }, 1000);
  }

  if(isLoading) {
    return (<LoadingScreen/>)
  }

  return <CreateScreen submitForm={submitForm} reviewSchema={reviewSchema} />
}

