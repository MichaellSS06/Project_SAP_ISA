import { StyleSheet, TextInput } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAvisosStore } from '@/store/useStore';

import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import CheckboxScreen from '@/components/Checkbox';

export default function TabTwoScreen() {
    const avisos = useAvisosStore((state) => state.avisos);
    const [inputValue, setInputValue] = useState('');
    const color = useThemeColor({}, 'text');

    const [consignacion, setConsignacion] = useState<string[]>([])
    const arrayConsignacion = ["N","L","S"]
    // Si no hay estado, considerar todos
    const filtroConsignacion = consignacion.length === 0 ? arrayConsignacion : consignacion;

    const [estado, setEstado] = useState<number[]>([])
    const arrayEstado = [1,2,3,4,5,6,7,8]
    // Si no hay estado, considerar todos
    const filtroEstado = estado.length === 0 ? arrayEstado : estado;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
        
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Lista de avisos</ThemedText>
      </ThemedView>

      <Collapsible title="Consignación">
        <CheckboxScreen 
          estado={consignacion} 
          setEstado={setConsignacion} 
          arrayLista={arrayConsignacion}
          resultadoFinal={filtroConsignacion} />
      </Collapsible>
     
      <Collapsible title="Estado">
        <CheckboxScreen 
          estado={estado} 
          setEstado={setEstado} 
          arrayLista={arrayEstado}
          resultadoFinal={filtroEstado} />
      </Collapsible>

      <Collapsible title="Línea o Subestación">
        <ThemedView style={{paddingRight:16}}>
            <TextInput
            style={{color:color, ...styles.textinput}}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Escribe aquí..."
            placeholderTextColor={color}
            maxLength={10}
            />
        </ThemedView>
      </Collapsible>

      {avisos && avisos.length > 0 && avisos.map((aviso) => (
        <ThemedView key={aviso.aviso}>
            <ThemedText>Aviso: {aviso.aviso}</ThemedText>
            <ThemedText>Estado: {aviso.estado}</ThemedText>
            <ThemedText>Consignación: {aviso.clase_consignacion}</ThemedText>
        </ThemedView>
        ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  reactLogo: {
    height: 100,
    width: 240,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  textinput: {
    fontSize:16, 
    padding:8, 
    borderColor:'#ccc', 
    borderWidth:1, 
    borderRadius:4, 
    textShadowColor:'#fff', 
    textAlign:'center'}
});
