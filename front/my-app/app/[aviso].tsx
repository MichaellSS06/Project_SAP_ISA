import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAvisosStore } from "@/store/useStore";
import { useLocalSearchParams } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Collapsible } from "@/components/Collapsible";
import { DataTable } from "react-native-paper";


export default function Avisos() {
  const insets = useSafeAreaInsets();
  const colorTheme = useThemeColor({}, 'background');
  const colorText = useThemeColor({}, 'text');
  const {aviso} = useLocalSearchParams();
  const currentAviso = useAvisosStore((state) => state.currentAviso);
  const rows = [
    { label: "Nombre", value: "Juan Pérez" },
    { label: "Edad", value: "25" },
    { label: "Ciudad", value: "Lima" },
    { label: "Ocupación", value: "Ingeniero" },
  ];

  const rowsAvisos = [
    { label: "Aviso", value: currentAviso?.aviso },
    { label: "Clase de Aviso", value: currentAviso?.clase_de_aviso },
    { label: "Ubicación Técnica", value: currentAviso?.ubicacion_tecnica },
    { label: "Objeto Técnico", value: currentAviso?.denominacion_de_objeto_tecnico },
    { label: "Descripción", value: currentAviso?.descripcion },
    { label: "Pto. Trab. Res.", value: currentAviso?.pto_tbjo_responsable },
    { label: "Inicio Deseado", value: currentAviso?.inicio_deseado },
    { label: "Fin Deseado", value: currentAviso?.fin_deseado },
    { label: "Sociedad", value: currentAviso?.sociedad },
    { label: "Status de Usuario", value: currentAviso?.status_de_usuario },
  ];
  const rowsOrden = [
    { label: "Orden", value: currentAviso?.orden_1 },
    { label: "Clase de Orden", value: currentAviso?.clase_de_orden },
    { label: "Revisión", value: currentAviso?.revision },
    { label: "Ubicación Técnica 1", value: currentAviso?.ubicacion_tecnica_1 },
    { label: "Texto Breve", value: currentAviso?.texto_breve },
    { label: "Pto. Trabajo Responsable 1", value: currentAviso?.pto_tbjo_responsable_1 },
    { label: "Fecha de Inicio Extrema", value: currentAviso?.fecha_de_inicio_extrema },
    { label: "Fecha Fin Extrema", value: currentAviso?.fecha_fin_extrema },
    { label: "Total General Plan", value: currentAviso?.tota_general_plan },
    { label: "Total General Real", value: currentAviso?.total_general_real },
    { label: "Indicador ABC", value: currentAviso?.indicador_ABC },
    { label: "Status del Sistema", value: currentAviso?.status_del_sistema },
    { label: "Sociedad CO", value: currentAviso?.sociedad_CO },
  ]

  const rowsPlan = [
    { label: "Planes de Trabajo", value: currentAviso?.planes_trab },
    { label: "Clase de Consignación", value: currentAviso?.clase_consignacion },
    { label: "Estado", value: currentAviso?.estado },
    { label: "Ubicación Técnica de Búsqueda", value: currentAviso?.ub_tecnica_busqueda },
    { label: "Denominación de la Revisión", value: currentAviso?.denominacion_de_la_revision },
    { label: "Fecha Inicio Revisión", value: currentAviso?.fecha_inic_revision },
    { label: "Fecha Fin Revisión", value: currentAviso?.fecha_fin_revision },
    { label: "Desc. Jefe de Trabajo", value: currentAviso?.desc_jefe_trab },
    { label: "ST", value: currentAviso?.st },
    { label: "Instalación", value: currentAviso?.instalacion },
  ]

    return (
        <View style={{ flex: 1, backgroundColor: colorTheme }}>
        <ScrollView>
        <ParallaxScrollView
             headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
             headerImage={
              <ThemedView>
                <Image
                  source={require('@/assets/images/onda.webp')}
                  style={styles.ondaTop}
                  />
                <Image
                  source={require('@/assets/images/logo_nuevo.webp')}
                  style={styles.reactLogo}
                  />
                <Image
                  source={require('@/assets/images/onda.webp')}
                  style={styles.ondaBottom}
                />
              </ThemedView>
             }>
        <ThemedView style={styles.stepContainer}>
        <Collapsible title="Detalles del Aviso" mode={true}>
          <ThemedView style={{paddingVertical:5, marginLeft:-20}}>
            <DataTable>
              {rowsAvisos.map((row, index) => (
                <DataTable.Row key={index} style={{paddingVertical:10}}>
                  <DataTable.Cell style={{ flex: 4, marginRight: 0, marginLeft:-5}}>
                    <ThemedText numberOfLines={3} ellipsizeMode="tail" type="defaultSemiBold" style={{ flex: 1, marginRight: 8}}>
                      {row.label}
                    </ThemedText>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 7 }}><ThemedText>{row.value}</ThemedText></DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ThemedView>
        </Collapsible>

        <Collapsible title="Detalles de la Orden" mode={true}>
          <ThemedView style={{paddingVertical:5, marginLeft:-20}}>
            <DataTable>
              {rowsOrden.map((row, index) => (
                <DataTable.Row key={index} style={{paddingVertical:10}}>
                  <DataTable.Cell style={{ flex: 4, marginRight: 0, marginLeft:-5}}>
                    <ThemedText numberOfLines={3} ellipsizeMode="tail" type="defaultSemiBold" style={{ flex: 1, marginRight: 8}}>
                      {row.label}
                    </ThemedText>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 7 }}><ThemedText>{row.value}</ThemedText></DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ThemedView>
        </Collapsible>

        <Collapsible title="Detalles del Plan" mode={true}>
          <ThemedView style={{paddingVertical:5, marginLeft:-20}}>
            <DataTable>
              {rowsPlan.map((row, index) => (
                <DataTable.Row key={index} style={{paddingVertical:10}}>
                  <DataTable.Cell style={{ flex: 4, marginRight: 0, marginLeft:-5}}>
                    <ThemedText numberOfLines={3} ellipsizeMode="tail" type="defaultSemiBold" style={{ flex: 1, marginRight: 8}}>
                      {row.label}
                    </ThemedText>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 7 }}><ThemedText>{row.value}</ThemedText></DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ThemedView>
        </Collapsible>
        </ThemedView>

        </ParallaxScrollView>
        </ScrollView>
            <View style={{ height: insets.bottom, backgroundColor: colorTheme }} />
        </View>
    );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 20,
    marginBottom: 20,
  },
 reactLogo: {
    height: 250,
    marginTop: 0,
    width: 400,
    top: 0,
    left: -10,
    position: 'absolute',
  },
  ondaTop: {
    height: 150,
    width: 400,
    marginTop: 0,
    top: 0,
    left: -15,
    position: 'absolute',
    zIndex: 10,
    transform: [{scale:0.8},{rotate: "25deg"},{translateX:20}, {translateY:-60}]
  },
  ondaBottom: {
    height: 150,
    width: 400,
    marginTop: 120,
    top: 0,
    left: -15,
    position: 'absolute',
    zIndex: 10,
    transform: [{scale:0.8},{rotate: "45deg"},{translateX:-130}, {translateY:130}]
  }
});