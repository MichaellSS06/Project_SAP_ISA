import { Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { useAvisosStore, type Aviso } from '@/store/useStore';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export default function AnimatedAvisoCard({aviso, index}:{ aviso: Aviso; index: number }) {
    const opacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        delay: index * 300,
        useNativeDriver: true,
      }).start();
    }, [index, opacity]);

    return (
        <Animated.View style={{ opacity }}>
            <AvisoCard aviso={aviso} />
        </Animated.View>
    );
}
function AvisoCard({aviso}: {aviso: Aviso}) {
    const setCurrentAviso = useAvisosStore((state) => state.setCurrentAviso);
    const router = useRouter();
    const colorTint = useThemeColor({}, 'tint');
    const handlePressable = (aviso:Aviso) => {
          setCurrentAviso(aviso)
          // console.log("Aviso seleccionado:", aviso)
          router.push(`/${aviso.aviso}`);
        };
    return (
        <ThemedView key={aviso.aviso}>
                  <Pressable onPress={()=>handlePressable(aviso)} style={{...styles.avisosList, borderColor: colorTint}}>
                    <ThemedView style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <ThemedView>
                        <ThemedText type="defaultSemiBold">Aviso: {aviso.aviso}</ThemedText>
                        <ThemedText type="defaultSemiBold">Orden: {aviso.orden}</ThemedText>
                        <ThemedText type="defaultSemiBold">Plan: {aviso.revision}</ThemedText>
                      </ThemedView>
                      <ThemedView style={{flexDirection:'row', justifyContent:'space-between', gap: 12}}>
                        <ThemedText type="defaultSemiBold" style={{backgroundColor: "#62ff00bb", borderColor: "#4bc300bb", ...styles.circle}}>{aviso.estado}</ThemedText>
                        <ThemedText type="defaultSemiBold" style={{backgroundColor: "#ff0000bb", borderColor: "#b20000bb", ...styles.circle}}>{aviso.clase_consignacion}</ThemedText>
                      </ThemedView>   
                    </ThemedView>
                            
                    <ThemedText type="defaultSemiBold">Supervisor: {aviso.desc_jefe_trab}</ThemedText>
                    <ThemedText type="defaultSemiBold" style={{textAlign:"center"}}>{aviso.descripcion}</ThemedText>
                  </Pressable>
                </ThemedView>
    )
}
const styles = StyleSheet.create({
  avisosList: {
    marginHorizontal: 4, 
    marginVertical:8, 
    padding:16, 
    borderRadius:10, 
    borderWidth:3, 
    display:'flex',
    gap:8
  },
  circle: {
    paddingHorizontal:18, 
    paddingVertical:10,
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 35, 
    lineHeight:32, 
    height: 58, 
    fontSize:25,
    borderWidth: 3
  }
});
