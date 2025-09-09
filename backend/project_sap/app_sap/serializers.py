from rest_framework import serializers
from .models import RegistrosSAP

class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrosSAP
        fields = '__all__'
        extra_kwargs = {
            'aviso': {'required': False, 'allow_null': True},
            'clase_de_aviso': {'required': False, 'allow_null': True},
            'orden': {'required': False, 'allow_null': True},
            'ubicacion_tecnica': {'required': False, 'allow_null': True},
            'denominacion_de_objeto_tecnico': {'required': False, 'allow_null': True},
            'descripcion': {'required': False, 'allow_null': True},
            'pto_tbjo_responsable': {'required': False, 'allow_null': True},
            'inicio_deseado': {'required': False, 'allow_null': True},
            'fin_deseado': {'required': False, 'allow_null': True},
            'sociedad': {'required': False, 'allow_null': True},
            'status_de_usuario': {'required': False, 'allow_null': True},
            'orden_1': {'required': False, 'allow_null': True},
            'clase_de_orden': {'required': False, 'allow_null': True},
            'revision': {'required': False, 'allow_null': True},
            'ubicacion_tecnica_1': {'required': False, 'allow_null': True},
            'texto_breve': {'required': False, 'allow_null': True},
            'pto_tbjo_responsable_1': {'required': False, 'allow_null': True},
            'fecha_de_inicio_extrema': {'required': False, 'allow_null': True},
            'fecha_fin_extrema': {'required': False, 'allow_null': True},
            'tota_general_plan': {'required': False, 'allow_null': True},
            'total_general_real': {'required': False, 'allow_null': True},
            'indicador_ABC': {'required': False, 'allow_null': True},
            'status_del_sistema': {'required': False, 'allow_null': True},
            'sociedad_CO': {'required': False, 'allow_null': True},
            'planes_trab': {'required': False, 'allow_null': True},
            'clase_consignacion': {'required': False, 'allow_null': True},
            'estado': {'required': False, 'allow_null': True},
            'ub_tecnica_busqueda': {'required': False, 'allow_null': True},
            'denominacion_de_la_revision': {'required': False, 'allow_null': True},
            'fecha_inic_revision': {'required': False, 'allow_null': True},
            'hora_inic_revision': {'required': False, 'allow_null': True},
            'fecha_fin_revision': {'required': False, 'allow_null': True},
            'hora_fin_revision': {'required': False, 'allow_null': True},
            'desc_jefe_trab': {'required': False, 'allow_null': True},
            'st': {'required': False, 'allow_null': True},
            'instalacion': {'required': False, 'allow_null': True}
        }
