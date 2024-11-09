import { View, StyleSheet, Text } from 'react-native'

export default function Timer({ time }) {
  function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 15,
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  time: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#333333',
  },
})
