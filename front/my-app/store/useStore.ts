import { create } from "zustand";

export type Aviso = {
    "aviso": number | null, 
    "clase_consignacion": string | null, 
    "clase_de_aviso": string | null, 
    "clase_de_orden": string | null, 
    "denominacion_de_la_revision": string | null, 
    "denominacion_de_objeto_tecnico": string | null, 
    "desc_jefe_trab": string | null, 
    "descripcion": string | null, 
    "estado": number | null, 
    "fecha_de_inicio_extrema": string | null, 
    "fecha_fin_extrema": string | null, 
    "fecha_fin_revision": string | null, 
    "fecha_inic_revision": string | null, 
    "fin_deseado": string | null, 
    "hora_fin_revision": number | null, 
    "hora_inic_revision": number | null, 
    "id": number | null, 
    "indicador_ABC": string | null, 
    "inicio_deseado": string | null, 
    "instalacion": string | null, 
    "orden": number | null, 
    "orden_1": number | null, 
    "planes_trab": string | null, 
    "pto_tbjo_responsable": string | null, 
    "pto_tbjo_responsable_1": string | null, 
    "revision": string | null, 
    "sociedad": string | null, 
    "sociedad_CO": string | null, 
    "st": string | null, 
    "status_de_usuario": string | null,
    "status_del_sistema": string | null, 
    "texto_breve": string | null, 
    "tota_general_plan": number | null, 
    "total_general_real": number | null, 
    "ub_tecnica_busqueda": string | null, 
    "ubicacion_tecnica": string | null, 
    "ubicacion_tecnica_1": string | null
};

export type ListaAvisos = Aviso[] | [];

type ListaAvisosState = {
  avisos: ListaAvisos | null;
  setAvisos: (avisos: ListaAvisos | null) => void;
  currentAviso: Aviso;
  setCurrentAviso: (aviso: Aviso) => void;
};

export const useAvisosStore = create<ListaAvisosState>((set) => ({
  avisos: [],
  setAvisos: (avisos) => set({ avisos }),
  currentAviso: {} as Aviso,
  setCurrentAviso: (currentAviso) => set({ currentAviso }),
}));
