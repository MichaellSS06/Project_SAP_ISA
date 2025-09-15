# Imagen base con Python
FROM python:3.11-slim

# Variables de entorno
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Crear directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpq-dev gcc && \
    rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el contenido del proyecto al contenedor
COPY . .

# Exponer puerto
EXPOSE 8000

# Comando para ejecutar migraciones y luego Gunicorn usando python3
# "$PORT" será sustituido automáticamente por Vercel
CMD ["sh", "-c", "python3 manage.py migrate && exec gunicorn project_sap.wsgi:application --bind 0.0.0.0:${PORT:-8000}"]

# Comando para ejecutar Django
# CMD ["python", "project_sap/manage.py", "runserver", "0.0.0.0:8000"]
