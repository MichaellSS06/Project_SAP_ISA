import pandas as pd
import os
import numpy as np
 
#Dataframe
# Ruta del archivo original
archivo_xlsx = r"C:\Users\micha\OneDrive\Desktop\Project_SAP_ISA\post_api\LISTA_SHAREPOINT_XLSX_3.xlsx"
 
# Leer todo el archivo
df = pd.read_excel(archivo_xlsx, engine='openpyxl')
print(df.columns)
print(df.size)
print(len(df))
# print(df)
# print(df.dtypes)
print(df.iloc[0:2,7:9])

# Función para convertir fechas a formato estándar yyyy-mm-dd
def parse_fecha(valor):
    if pd.isna(valor) or valor == "":
        return np.nan
    try:
        # Intentar dd/mm/yyyy
        return pd.to_datetime(valor, format="%d/%m/%Y", errors="raise").date()
    except Exception:
        try:
            # Intentar yyyy-mm-dd HH:MM:SS
            return pd.to_datetime(valor, format="%Y-%m-%d %H:%M:%S", errors="raise").date()
        except Exception:
            # Último intento: que pandas infiera
            return pd.to_datetime(valor, errors="coerce").date()

# Aplicar a columnas
df["Fecha inic. revisión"] = df["Fecha inic. revisión"].apply(parse_fecha)
df["Fecha fin revisión"] = df["Fecha fin revisión"].apply(parse_fecha)
df["Fecha de inicio extrema"] = df["Fecha de inicio extrema"].apply(parse_fecha)
df["Fecha fin extrema"] = df["Fecha fin extrema"].apply(parse_fecha)
# Si quieres asegurarte de que queden como string en formato yyyy-MM-dd
df["Fecha inic. revisión"] = df["Fecha inic. revisión"].astype(str)
df["Fecha fin revisión"] = df["Fecha fin revisión"].astype(str)
df["Fecha de inicio extrema"] = df["Fecha de inicio extrema"].astype(str)
df["Fecha fin extrema"] = df["Fecha fin extrema"].astype(str)
df["Inicio deseado"] = df['Inicio deseado'].astype(str)
df["Fin deseado"] = df['Fin deseado'].astype(str)
print(df.iloc[0:2,29:32])
print(df.iloc[0:2,17:19])
print(df.iloc[0:2,7:9])
print(df.dtypes)