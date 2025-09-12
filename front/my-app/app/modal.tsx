import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ExternalLink } from '@/components/ExternalLink';
import { Image } from 'expo-image';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Michaell Huanca</ThemedText>
      </ThemedView>
      <ThemedView style={styles.sections}>
        <ThemedText type="subtitle">Actual Asistente SE Zorritos</ThemedText>
      </ThemedView>

      <ThemedView style={{paddingTop: 8, ...styles.sections, gap:16}}>
        <ThemedView>
          <Image source={require('@/assets/images/github_perfil.webp')} style={styles.image}/></ThemedView>
        <Image source={require('@/assets/images/github.svg')} style={styles.image}/>
      </ThemedView>
      <ThemedView style={{paddingTop: 8, ...styles.sections}}>
        <ThemedText type="default" style={{textAlign:"center"}}>© 2025 App de Avisos, OM y Planes de trabajo. Todos los derechos reservados.</ThemedText>
      </ThemedView>

      <ThemedView style={{paddingTop: 8, ...styles.sections}}>
        <ThemedText type="default" style={{textAlign:"center"}}>Desarrollado por {' '}
          <ExternalLink href={"https://github.com/MichaellSS06"}>
            <ThemedText type="link" style={{textAlign:"center"}}>MichaellSS06</ThemedText>
          </ExternalLink>
        </ThemedText>
      </ThemedView>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
    borderBlockColor: '#fff'
  },
  sections: {
    marginTop:20,
    marginHorizontal: 20
  },
  image: {
    height: 178,
    width: 178,
    bottom: 0,
    left: 0,
    position: 'relative',
    borderRadius: 30
  },
});
