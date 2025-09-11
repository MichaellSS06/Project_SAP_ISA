import { Pressable, StyleSheet, TextInput } from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAvisosStore, type ListaAvisos, type Aviso } from '@/store/useStore';
import { useRouter } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import CheckboxScreen from '@/components/Checkbox';

import debounce from 'just-debounce-it';

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
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const color = useThemeColor({}, 'text');
    const setCurrentAviso = useAvisosStore((state) => state.setCurrentAviso);
    //const router = useRouter();
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
      }, 2000),
      []
    );

    const handleChangeText = (newText: string) => {
      if (newText.startsWith(' ')) return;
      debouncedSetInput(newText);
    }

    const handlePressable = (aviso:Aviso) => {
      setCurrentAviso(aviso)
      console.log("Aviso seleccionado:", aviso)
      router.push(`/${aviso.aviso}`);
    };


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
            // value={inputValue}
            onChangeText={handleChangeText}
            placeholder="Escribe aquí..."
            placeholderTextColor={color}
            maxLength={10}
            />
        </ThemedView>
      </Collapsible>

      {avisosFinal && avisosFinal.length > 0 && avisosFinal.map((aviso) => (
        <ThemedView key={aviso.aviso}>
          <Pressable onPress={()=>handlePressable(aviso)} >
            <ThemedText>Aviso: {aviso.aviso}</ThemedText>
            <ThemedText>Estado: {aviso.estado}</ThemedText>
            <ThemedText>Consignación: {aviso.clase_consignacion}</ThemedText>
            <ThemedText>Instalación: {aviso.instalacion}</ThemedText>
            <ThemedText>Fecha inicio: {aviso.fecha_inic_revision}</ThemedText>
            <ThemedText>Fecha fin: {aviso.fecha_fin_revision}</ThemedText>
          </Pressable>
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
