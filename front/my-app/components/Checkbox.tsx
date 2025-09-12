import Checkbox from "expo-checkbox"; //eslint-disable-line
import { ThemedView } from "./ThemedView";
import { ThemedText } from '@/components/ThemedText';

type CheckboxScreenProps<T extends number | string> = {
  estado: T[];
  setEstado: React.Dispatch<React.SetStateAction<T[]>>;
  arrayLista: T[];
  resultadoFinal : T[]
};

export default function CheckboxScreen<T extends string | number>({estado, setEstado, arrayLista, resultadoFinal}
  :CheckboxScreenProps<T>
) {
  const toggleOpcion = (opcion: T, checked: boolean) => {
    setEstado((prev) => {
      if (checked) {
        return [...prev, opcion]; // agrega
      } else {
        return prev.filter((item) => item !== opcion); // quita
      }
    });
  };

  return (
    <ThemedView style={{ paddingTop: 10, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
      {arrayLista.map((op) => {
        const checked = estado.includes(op);
        return (
          <ThemedView key={op} style={{ flexDirection: "row", alignItems: "center", gap: 10, height: 40, width: "30%", marginVertical: 6 }}>
            <Checkbox
              value={checked}
              onValueChange={(newValue) => toggleOpcion(op, newValue)}
              color={checked ? "blue" : undefined}
              style={{width: 30, height: 30}}
            />
            <ThemedText type="subtitle">{op}</ThemedText>
          </ThemedView>
        );
      })}
    </ThemedView>
  );
}
