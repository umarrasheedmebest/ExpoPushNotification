import { Button, StyleSheet, View } from "react-native";
import { usePushNotifications } from "./usePushNotifications";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  const { expoPushToken } = usePushNotifications();
  async function sendPushNotification(expoPushToken: string) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Umar sent push notification within the app',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View >
        <Button
          title="Send Notification"
          onPress={() => sendPushNotification(expoPushToken?.data)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});