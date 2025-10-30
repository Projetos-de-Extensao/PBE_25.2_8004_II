
from rest_framework import serializers
from myapp.models import Produto
from .models import (
    Produto, Aluno, Professor, Vaga,
    RegistroMonitoria,
    Disciplina, Inscricao
)

# Cada classe criada aqui representa um serializador para o modelo correspondente (models.py)
class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ['id', 'nome', 'preco', 'descricao', 'disponivel']
        read_only_fields = ['id']

class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = [
            'id', 'matricula', 'nome', 'cpf', 'crgeral',
            'curso', 'periodo', 'telefone'
        ]
        read_only_fields = ['id']


class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = ['id', 'nome', 'cpf', 'telefone']
        read_only_fields = ['id']


class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaga
        fields = ['id', 'nome', 'descricao', 'crminimo', 'disciplina', 'statusvaga']
        read_only_fields = ['id']

class RegistroMonitoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroMonitoria
        fields = ['id', 'aluno', 'vaga', 'horasTrabalhadas', 'dataRegistro','descricao_atividades','validado_por']
        read_only_fields = ['id']


class DisciplinaSerializer(serializers.ModelSerializer):
    professor = serializers.CharField(source='professor.nome', read_only=True)

    class Meta:
        model = Disciplina
        fields = ['id', 'nome', 'codigo', 'professor', 'cargaHoraria', 'ementa']
        read_only_fields = ['id']


class InscricaoSerializer(serializers.ModelSerializer):
    aluno = serializers.CharField(source='aluno.nome', read_only=True)
    disciplina = serializers.CharField(source='disciplina.nomepython', read_only=True)

    class Meta:
        model = Inscricao
        fields = ['id', 'aluno', 'vaga', 'documentos', 'status', 'data_candidatura', 'disciplina']
        read_only_fields = ['id']