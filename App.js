import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native'
import { useEffect, useState } from 'react'
import Header from './src/components/Header'
import Timer from './src/components/Timer'
import { Audio } from 'expo-av'

const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2']

export default function App() {
  const [isWorking, setIsWorking] = useState(false)
  const [time, setTime] = useState(25 * 60)
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK')

  const handleStartStop = () => {
    playSound()
    setIsWorking(!isWorking)
  }

  const playSound = async (name) => {
    const { sound } = await Audio.Sound.createAsync(
      require(`./assets/yamete.mp3`)
    )
    await sound.playAsync()
  }
  const playSoundEnd = async (name) => {
    const { sound } = await Audio.Sound.createAsync(
      require(`./assets/cuckoo.mp3`)
    )
    await sound.playAsync()
  }

  useEffect(() => {
    let interval = null

    if (isWorking) {
      // run timer
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)
    } else {
      // clear interval
      clearInterval(interval)
    }

    if (time === 0) {
      playSoundEnd()
      setIsWorking((prev) => !prev)
      setTime(currentTime === 0 ? 1500 : currentTime === 1 ? 300 : 900)
    }

    return () => clearInterval(interval)
  }, [isWorking, time])

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors[currentTime],
        },
      ]}
    >
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: Platform.OS === 'android' && 30,
          flex: 1,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          setTime={setTime}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
        />
        <Timer time={time} />

        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {isWorking ? 'STOP' : 'START'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 52,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
})
