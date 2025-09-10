import { useState } from "react";
import Checkbox from "expo-checkbox";
import { ThemedView } from "./ThemedView";
import { ThemedText } from '@/components/ThemedText';

const consignacionLista = ["N", "L", "S"];

export default function CheckboxScreen() {
  const [consignacion, setConsignacion] = useState<string[]>([]);

  const toggleOpcion = (opcion: string, checked: boolean) => {
    setConsignacion((prev) => {
      if (checked) {
        return [...prev, opcion]; // agrega
      } else {
        return prev.filter((item) => item !== opcion); // quita
      }
    });
  };

  // Si no hay consignacion, considerar todos
  const resultadoFinal =
    consignacion.length === 0 ? consignacionLista : consignacion;

  return (
    <ThemedView style={{ padding: 20 }}>
      <ThemedText style={{ fontSize: 18, marginBottom: 10 }}>Filtros:</ThemedText>

      {consignacionLista.map((op) => {
        const checked = consignacion.includes(op);
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
