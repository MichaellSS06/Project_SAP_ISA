import { StyleSheet, TextInput, FlatList } from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { useAvisosStore, type ListaAvisos } from '@/store/useStore';
import CheckboxScreen from '@/components/Checkbox';
import { useThemeColor } from '@/hooks/useThemeColor';
import debounce from 'just-debounce-it';
import AnimatedAvisoCard from '@/components/AvisoCard';

export const useFilterAvisos = (filtroConsignacion: string[], filtroEstado: number[]) => {
  const avisos = useAvisosStore((state) => state.avisos);

  const avisosFiltrados = avisos?.filter((aviso) => {
      const matchesConsignacion = filtroConsignacion.includes(aviso.clase_consignacion!);
      const matchesEstado = filtroEstado.includes(aviso.estado!);
    
    return matchesConsignacion && matchesEstado;
  });
 
  return avisosFiltrados as ListaAvisos | null;
}

export default function TabTwoScreen() {
    const [inputValue, setInputValue] = useState('');
    const colorText = useThemeColor({}, 'text');
    const [consignacion, setConsignacion] = useState<string[]>([])
    const arrayConsignacion = ["N","L","S"]
    // Si no hay estado, considerar todos
    const filtroConsignacion = consignacion.length === 0 ? arrayConsignacion : consignacion;

    const [estado, setEstado] = useState<number[]>([])
    const arrayEstado = [0,1,2,3,4,5,6,7,8]
    // Si no hay estado, considerar todos
    const filtroEstado = estado.length === 0 ? arrayEstado : estado;

    const avisosFiltrados = useFilterAvisos(filtroConsignacion, filtroEstado)

     // 🔹 Filtro por texto sobre los ya filtrados
    const avisosFinal = useMemo(() => {
    if (!avisosFiltrados) return [];
    if (inputValue.trim() === '') return avisosFiltrados;

    return avisosFiltrados.filter((aviso) =>
      aviso.instalacion?.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [avisosFiltrados, inputValue]);

    // 🔹 Debounce solo para actualizar inputValue
    const debouncedSetInput = useCallback(
      debounce((text: string) => {
        setInputValue(text);
      }, 1000),
      []
    );

    const handleChangeText = (newText: string) => {
      if (newText.startsWith(' ')) return;
      debouncedSetInput(newText);
    }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <ThemedView>
          <Image source={require('@/assets/images/onda.webp')} style={styles.ondaTop}/>
          <Image source={require('@/assets/images/onda.webp')} style={styles.ondaBottom}/>
          <Image source={require('@/assets/images/logo_black.webp')} style={styles.isaLogo}/>
          <Image source={require('@/assets/images/base_isa_energia.webp')} style={styles.reactLogo}/>
        </ThemedView>
      }>
        
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle" style = {{fontSize:25}}>Filtros</ThemedText>
      </ThemedView>

      <Collapsible title="Consignación" mode={false}>
        <CheckboxScreen 
          estado={consignacion} 
          setEstado={setConsignacion} 
          arrayLista={arrayConsignacion}
          resultadoFinal={filtroConsignacion} />
      </Collapsible>
     
      <Collapsible title="Estado" mode={false}>
        <CheckboxScreen 
          estado={estado} 
          setEstado={setEstado} 
          arrayLista={arrayEstado}
          resultadoFinal={filtroEstado} />
      </Collapsible>

      <Collapsible title="Línea o Subestación" mode={false}>
        <ThemedView style={{paddingRight:16}}>
            <TextInput
            style={{color:colorText, ...styles.textinput}}
            // value={inputValue}
            onChangeText={handleChangeText}
            placeholder="Escribe aquí..."
            placeholderTextColor={colorText}
            maxLength={10}
            />
        </ThemedView>
      </Collapsible>

      <ThemedView style={{gap:10}}>
        {avisosFinal.length > 0 ? (
          <FlatList
            data={avisosFinal}
            keyExtractor={(item) => item.aviso!.toString()}
            renderItem={({ item, index }) => <AnimatedAvisoCard index={index} aviso={item}/>}
            scrollEnabled={false}
          />):<ThemedText>No hay avisos coincidentes</ThemedText>
        }
      </ThemedView> 
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
    height: 178,
    marginTop: 72,
    width: 520,
    top: 0,
    left: -125,
    position: 'absolute',
    transform: [{scale: 1}],
  },
  textinput: {
    fontSize:16, 
    padding:8, 
    borderColor:'#ccc', 
    borderWidth:1, 
    borderRadius:4, 
    textShadowColor:'#fff', 
    textAlign:'center'
  },
  isaLogo: {
    height: 75,
    width: 140,
    padding: 0,
    marginTop: 0,
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: 10,
    borderWidth: 3,
    borderColor: "#0000006a",
    borderRadius: 10
  },
  ondaTop: {
    height: 150,
    width: 400,
    marginTop: 0,
    top: 0,
    left: -15,
    position: 'absolute',
    zIndex: -1,
    transform: [{scale:1},{rotate: "0deg"},{translateX:0}, {translateY:0}],
  },
  ondaBottom: {
    height: 150,
    width: 400,
    marginTop: 0,
    top: 0,
    left: -15,
    position: 'absolute',
    zIndex: -1,
    transform: [{scale:1},{rotate: "0deg"},{translateX:40}, {translateY:50}],
  },
});
