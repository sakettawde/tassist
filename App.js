import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Button } from "react-native"
import Amplify from "aws-amplify"
import config from "./aws-exports"
Amplify.configure(config)
import { Auth } from "aws-amplify"

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    giveUser()
  }, [])

  const giveUser = async () => {
    const user = await Auth.currentAuthenticatedUser().catch(err =>
      console.log(err)
    )
    console.log(user.username)
    if(user && user.username){
      setLoggedIn(true)
    }
  }

  const signOut = async () => {
    await Auth.signOut()
    setLoggedIn(false)
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <View style={{ height: 18 }} />
      <Button
        title="Sign in with Google"
        onPress={() => Auth.federatedSignIn({ provider: "Google" })}
      />
      <View style={{ height: 18 }} />
      <Button title="Launch Hosted UI" onPress={() => Auth.federatedSignIn()} />
      <View style={{ height: 18 }} />
      <Button title="Current User" onPress={giveUser} />
      <View style={{ height: 18 }} />
      <Button title="SignOut User" onPress={signOut} />
      <View style={{ height: 18 }} />
      <Text>{loggedIn ? "User is in da house" : "Na aaaaah"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
