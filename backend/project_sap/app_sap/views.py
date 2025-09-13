from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import RegistrosSAP
from .serializers import RegistroSerializer
from django.db import connection

# 1. Eliminar todos los registros (~15,000)
class EliminarRegistrosView(APIView):
    def delete(self, request):
            try:
                with connection.cursor() as cursor:
                    cursor.execute("TRUNCATE TABLE app_sap_registrossap RESTART IDENTITY CASCADE;")
                return Response({"mensaje": "Registros eliminados y secuencia reseteada"}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # count, _ = RegistrosSAP.objects.all().delete()
        # return Response({"mensaje": f"{count} registros eliminados"}, status=status.HTTP_200_OK)

# 2. Insertar registros en bulk (~15,000)
class InsertarRegistrosView(APIView):
    def post(self, request):
        serializer = RegistroSerializer(data=request.data, many=True)
        if serializer.is_valid():
            registros = [RegistrosSAP(**item) for item in serializer.validated_data]
            RegistrosSAP.objects.bulk_create(registros, batch_size=1000)  # optimización
            return Response({"mensaje": f"{len(registros)} registros insertados"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 3. Obtener registros filtrados (~5,000) por texto y 2 fechas
class FiltrarRegistrosView(APIView):
    def get(self, request):
        st = request.query_params.get("st")
        fecha_inicio = request.query_params.get("fecha_inicio")
        fecha_fin = request.query_params.get("fecha_fin")

        filtros = Q()
        if st:
            filtros &= Q(st__icontains=st)
        if fecha_inicio and fecha_fin:
            filtros &= (Q(fecha_inic_revision__gte=fecha_inicio) & Q(fecha_fin_revision__lte=fecha_fin))| (Q(fecha_fin_revision__gte=fecha_inicio) & Q(fecha_fin_revision__lte=fecha_fin)) | (Q(fecha_inic_revision__lte=fecha_inicio) & Q(fecha_fin_revision__gte=fecha_fin)) | (Q(fecha_inic_revision__gte=fecha_inicio) & Q(fecha_inic_revision__lte=fecha_fin))

        # print(filtros)

        registros = RegistrosSAP.objects.filter(filtros)
        # print(registros)

        serializer = RegistroSerializer(registros, many=True)
        # print(len(serializer.data))

        return Response(serializer.data, status=status.HTTP_200_OK)

