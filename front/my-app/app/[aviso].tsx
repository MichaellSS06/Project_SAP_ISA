import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet } from 'react-native';

import { useAvisosStore } from "@/store/useStore";
import { useLocalSearchParams } from "expo-router";

export default function Avisos() {
  const detail = useLocalSearchParams() as unknown as number;
  console.log("Parámetro de detalle:", detail);
  const currentAviso = useAvisosStore((state) => state.currentAviso);

    return (
        <ScrollView>
        <ParallaxScrollView
             headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
             headerImage={
               <Image
                 source={require('@/assets/images/partial-react-logo.png')}
                 style={styles.reactLogo}
               />
             }>
        <ThemedView>
                <ThemedText type="title">Hola, esta es la pantalla de avisos</ThemedText>
        </ThemedView>
 
        <ThemedView>
                {/* <ThemedText type="title">{detail}</ThemedText> */}
        </ThemedView>

        <ThemedView>
                <ThemedText type="default">{currentAviso.clase_de_aviso}</ThemedText>
                <ThemedText type="default">{currentAviso.descripcion}</ThemedText>
                <ThemedText type="default">{currentAviso.instalacion}</ThemedText>
                <ThemedText type="default">{currentAviso.ubicacion_tecnica}</ThemedText>
                <ThemedText type="default">{currentAviso.orden}</ThemedText>
                <ThemedText type="default">{currentAviso.aviso}</ThemedText>
                <ThemedText type="default">{currentAviso.fecha_inic_revision}</ThemedText>
                <ThemedText type="default">{currentAviso.fecha_fin_revision}</ThemedText>
                <ThemedText type="default">{currentAviso.clase_consignacion}</ThemedText>
                <ThemedText type="default">{currentAviso.estado}</ThemedText>
                <ThemedText type="default">{currentAviso.desc_jefe_trab}</ThemedText>
                <ThemedText type="default">{currentAviso.texto_breve}</ThemedText>
                <ThemedText type="default">{currentAviso.revision}</ThemedText>
                <ThemedText type="default">{currentAviso.sociedad}</ThemedText>
                <ThemedText type="default">{currentAviso.sociedad_CO}</ThemedText>
                <ThemedText type="default">{currentAviso.inicio_deseado}</ThemedText>
                <ThemedText type="default">{currentAviso.fin_deseado}</ThemedText>
                <ThemedText type="default">{currentAviso.indicador_ABC}</ThemedText>
                <ThemedText type="default">{currentAviso.ub_tecnica_busqueda}</ThemedText>
                <ThemedText type="default">{currentAviso.ubicacion_tecnica_1}</ThemedText>
                <ThemedText type="default">{currentAviso.orden_1}</ThemedText>
                <ThemedText type="default">{currentAviso.planes_trab}</ThemedText>
                <ThemedText type="default">{currentAviso.pto_tbjo_responsable}</ThemedText>
                <ThemedText type="default">{currentAviso.pto_tbjo_responsable_1}</ThemedText>
                <ThemedText type="default">{currentAviso.tota_general_plan}</ThemedText>
                <ThemedText type="default">{currentAviso.total_general_real}</ThemedText>
                <ThemedText type="default">{currentAviso.status_de_usuario}</ThemedText>
                <ThemedText type="default">{currentAviso.status_del_sistema}</ThemedText>
                <ThemedText type="default">{currentAviso.fecha_de_inicio_extrema}</ThemedText>
                <ThemedText type="default">{currentAviso.fecha_fin_extrema}</ThemedText>
                <ThemedText type="default">{currentAviso.hora_inic_revision}</ThemedText>
                <ThemedText type="default">{currentAviso.hora_fin_revision}</ThemedText>
                <ThemedText type="default">{currentAviso.id}</ThemedText>
                <ThemedText type="default">{currentAviso.clase_de_orden}</ThemedText>
                <ThemedText type="default">{currentAviso.denominacion_de_la_revision}</ThemedText>
                <ThemedText type="default">{currentAviso.denominacion_de_objeto_tecnico}</ThemedText>
                <ThemedText type="default">{currentAviso.desc_jefe_trab}</ThemedText>
        </ThemedView>

        </ParallaxScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});