import pandas as pd
import os
import numpy as np
import requests
from datetime import datetime

#Dataframe
# Ruta del archivo original
archivo_xlsx = r"C:\Users\Michaell\Desktop\Project_SAP_ISA\post_api\LISTA_SHAREPOINT_XLSX_3.xlsx"
 
# Leer todo el archivo
df = pd.read_excel(archivo_xlsx, engine='openpyxl')
print(df.columns)
print(df.size)
print(len(df))
# print(df)
print(df.dtypes)
print(df.iloc[0:2,17:19])
# print(df.iloc[0:2,7:9])
print(type(df.loc[0, "Fecha de inicio extrema"]))  # dd/mm/yyyy
print(type(df.loc[1, "Fecha de inicio extrema"]))  # yyyy-mm-dd HH:MM:SS

# Función para convertir fechas a formato estándar yyyy-mm-dd
def format_date(valor):
    if pd.isna(valor) or valor == "":
        return None
    
    # Caso string
    if isinstance(valor, str):
        valor = valor.strip()
        try:
            return datetime.strptime(valor, "%d/%m/%Y").date().isoformat()
        except ValueError:
            try:
                return pd.to_datetime(valor, errors="raise", dayfirst=True).date().isoformat()
            except Exception:
                return None

    # Caso datetime / Timestamp / datetime64
    try:
        valor = str(valor).strip()
        return pd.to_datetime(valor, format="%Y-%d-%m %H:%M:%S",errors="coerce").date().isoformat()
    except Exception:
        return None

# Normalizar columnas de fecha
for col in ["Fecha de inicio extrema", "Fecha fin extrema", "Fecha inic. revisión", "Fecha fin revisión"]:
    df[col] = df[col].apply(format_date)

print(df["Fecha de inicio extrema"])

# Formato string en yyyy-MM-dd
df["Inicio deseado"] = df['Inicio deseado'].astype(str)
df["Fin deseado"] = df['Fin deseado'].astype(str)

# print(df.iloc[0:2,29:32])
# print(df.iloc[0:2,17:19])
# print(df.iloc[0:2,7:9])

df = df.rename(columns={
    "Aviso": "aviso",
    "Clase de aviso": "clase_de_aviso",
    "Orden": "orden",
    "Ubicación técnica": "ubicacion_tecnica",
    "Denominación de objeto técnico": "denominacion_de_objeto_tecnico",
    "Descripción": "descripcion",
    "Pto.tbjo.responsable": "pto_tbjo_responsable",
    "Inicio deseado": "inicio_deseado",
    "Fin deseado": "fin_deseado",
    "Sociedad": "sociedad",
    "Status de usuario": "status_de_usuario",
    "Orden.1": "orden_1",
    "Clase de orden": "clase_de_orden",
    "Revisión": "revision",
    "Ubicación técnica.1": "ubicacion_tecnica_1",
    "Texto breve": "texto_breve",
    "Pto.tbjo.responsable.1": "pto_tbjo_responsable_1",
    "Fecha de inicio extrema": "fecha_de_inicio_extrema",
    "Fecha fin extrema": "fecha_fin_extrema",
    "Tota general (plan)": "tota_general_plan",
    "Total general (real)": "total_general_real",
    "Indicador ABC": "indicador_ABC",
    "Status del sistema": "status_del_sistema",
    "Sociedad CO": "sociedad_CO",
    "Planes Trab.": "planes_trab",
    "Clase Consignación": "clase_consignacion",
    "Estado": "estado",
    "Ub.Tecnica busqueda": "ub_tecnica_busqueda",
    "Denominación de la revisión": "denominacion_de_la_revision",
    "Fecha inic. revisión": "fecha_inic_revision",
    "Hora inic.revisión": "hora_inic_revision",
    "Fecha fin revisión": "fecha_fin_revision",
    "Hora fin revisión": "hora_fin_revision",
    "Desc. Jefe Trab.": "desc_jefe_trab",
    "ST": "st",
    "INSTALACIÓN": "instalacion",
})

# print(df["ubicacion_tecnica_1"])
# print(df.isnull().sum())
df = df.replace({np.nan: None})
df = df.where(pd.notnull(df), None)
# df = df.replace({np.nan: None})
# print(df.isnull().sum())  # ver columnas con valores nulos
data = df.to_dict(orient="records")
# print(data)

res_del = requests.delete("https://django-docker-render-1.onrender.com/api/registros/eliminar/")
print(res_del.json())
res_post = requests.post("https://django-docker-render-1.onrender.com/api/registros/insertar/", json=data)
print(res_post.json())