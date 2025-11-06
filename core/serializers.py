from rest_framework import serializers
from . import models

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Professor
        fields = '__all__'

class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Aluno
        fields = '__all__'

class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Disciplina
        fields = '__all__'

class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vaga
        fields = '__all__'
        read_only_fields = ['professor']

class CandidaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Candidatura
        fields = '__all__'

class RegistroMonitoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RegistroMonitoria
        fields = '__all__'

class InscricaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Inscricao
        fields = '__all__'