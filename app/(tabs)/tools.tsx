import { StyleSheet, Text, View } from 'react-native';

export default function Tools() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tools</Text>
      <Text style={styles.subtitle}>Use these tools to support your workflow.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { marginTop: 10, fontSize: 16, color: '#666', textAlign: 'center' },
});
