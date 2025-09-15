# Imagen base con Python
FROM python:3.11-slim

# Variables de entorno
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=project_sap.project_sap.settings

# Crear directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpq-dev gcc && \
    rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos solo el proyecto Django
COPY project_sap ./project_sap

# Exponer puerto
EXPOSE 8000

# Comando para ejecutar Django
CMD ["python", "project_sap/manage.py", "runserver", "0.0.0.0:8000"]
