from rest_framework import serializers
from . import models
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Pega o token padrão
        token = super().get_token(user)

        # Adiciona dados customizados ao "payload" do token
        token['username'] = user.username
        
        # Verifica se o usuário tem um perfil de aluno ou professor
        # e adiciona o "papel" (role)
        if hasattr(user, 'aluno_profile'):
            token['role'] = 'aluno'
            token['user_pk'] = user.aluno_profile.pk # Pega o ID do Aluno
        elif hasattr(user, 'professor_profile'):
            token['role'] = 'professor'
            token['user_pk'] = user.professor_profile.pk # Pega o ID do Professor
        else:
            token['role'] = 'admin' # Se for superusuário sem perfil
            token['user_pk'] = user.pk

        return token