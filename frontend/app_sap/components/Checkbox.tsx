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
    <ThemedView style={{ padding: 20 }}>
      <ThemedText style={{ fontSize: 18, marginBottom: 10 }}>Filtros:</ThemedText>

      {arrayLista.map((op) => {
        const checked = estado.includes(op);
        return (
          <ThemedView key={op} style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              value={checked}
              onValueChange={(newValue) => toggleOpcion(op, newValue)}
              color={checked ? "blue" : undefined}
            />
            <ThemedText>{op}</ThemedText>
          </ThemedView>
        );
      })}

      <ThemedText style={{ marginTop: 20 }}>
        Estado actual: {resultadoFinal.join(", ")}
      </ThemedText>
    </ThemedView>
  );
}
