from django.urls import path
from .views import EliminarRegistrosView, InsertarRegistrosView, FiltrarRegistrosView

urlpatterns = [
    path("registros/eliminar/", EliminarRegistrosView.as_view(), name="eliminar-registros"),
    path("registros/insertar/", InsertarRegistrosView.as_view(), name="insertar-registros"),
    path("registros/filtrar/", FiltrarRegistrosView.as_view(), name="filtrar-registros"),
]
