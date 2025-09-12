import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from "@/components/HelloWave";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { getAllAvisos } from "@/api/sap";
import { useAvisosStore } from "@/store/useStore";

export default function HomeScreen() {
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [date, setDate] = useState<"inicio"|"fin">("inicio"); 
    const [show, setShow] = useState(false);
    const [st, setSt] = useState("STN");

    const setAvisos = useAvisosStore((state) => state.setAvisos);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllAvisos({
                    st:st,
                    fecha_inicio: fechaInicio.toISOString().split("T")[0],
                    fecha_fin: fechaFin.toISOString().split("T")[0]}
                );
                setAvisos(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }};
        fetchData();
        }, [st, fechaInicio, fechaFin, setAvisos]);

    const onChange = (event: any, selectedDate?: Date) => {
        setShow(false); // ocultar después de elegir
        if (date === "inicio" && selectedDate) setFechaInicio(selectedDate);
        if (date === "fin" && selectedDate) setFechaFin(selectedDate);
    };

    const showPicker = (datemode:"inicio"|"fin") => {
        setDate(datemode);
        setShow(true);
    };

    console.log("Inicio", fechaInicio.toISOString().split("T")[0]);
    console.log("Fin", fechaFin.toISOString().split("T")[0]);
    console.log("ST", st);

    return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Bienvenidoo!</ThemedText>
            <HelloWave />
        </ThemedView>

        <ThemedView style={styles.titleContainer}>
            <ThemedText type="subtitle" style={{textAlign: 'center', fontSize: 25, marginVertical:10}}>App de Avisos, OM y Planes de trabajo</ThemedText>
        </ThemedView>
                
        <ThemedView style={styles.stepContainer}>
            <Pressable style={{backgroundColor:"red", ...styles.pressablebutton}} 
            onPress={() => {setSt("STN")}}>
                <ThemedText type="subtitle" style={{fontSize:26}}>👋 STN     </ThemedText>
            </Pressable>
            <Pressable style={{backgroundColor:"#9d00ffff", ...styles.pressablebutton}} 
            onPress={() => {setSt("STC")}}>
                <ThemedText type="subtitle" style={{fontSize:26}}>📄 STC     </ThemedText>
            </Pressable>
            <Pressable style={{backgroundColor:"#05ea55cf", ...styles.pressablebutton}} 
            onPress={() => {setSt("STS")}}>
                <ThemedText type="subtitle" style={{fontSize:26}}>⚙️ STS     </ThemedText>
            </Pressable>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
            <ThemedView style={{backgroundColor: "#ff8400ff", ...styles.databox}}>
                <Pressable style ={{alignItems:"center"}} onPress={() => showPicker("inicio")}>
                    <ThemedText type="subtitle" style={{ marginVertical: 10, fontSize: 20}}>Seleccionar fecha de inicio</ThemedText>
                </Pressable>

                <ThemedText type= "defaultSemiBold" style={{ fontSize: 20, textAlign:"center" }}>
                    {fechaInicio.toISOString().split("T")[0]}
                </ThemedText>
            </ThemedView>
            
            <ThemedView style={{backgroundColor: "#0033ffff", ...styles.databox}}>
                <Pressable style ={{alignItems:"center"}} onPress={() => showPicker("fin")}>
                    <ThemedText type="subtitle" style={{ marginVertical: 10, fontSize: 20}}>Seleccionar fecha de fin</ThemedText>
                </Pressable>

                <ThemedText type= "defaultSemiBold" style={{fontSize: 20, textAlign:"center" }}>
                    {fechaFin.toISOString().split("T")[0]}
                </ThemedText>
            </ThemedView>


            {show && (
                <DateTimePicker
                value={fechaInicio}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChange}
                />
            )}

        </ThemedView>


      </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  stepContainer: {
    gap: 20,
    marginBottom: 8,
    marginTop: 8
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  pressablebutton: {
    borderRadius: 30, 
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 60
  },
  databox: {
    borderRadius: 20,
    paddingBottom: 10
  }
});
