from django.urls import path
from .views import EliminarRegistrosView, InsertarRegistrosView

urlpatterns = [
    path("registros/eliminar/", EliminarRegistrosView.as_view(), name="eliminar-registros"),
    path("registros/insertar/", InsertarRegistrosView.as_view(), name="insertar-registros"),
]
