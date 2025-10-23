
from rest_framework import serializers
from myapp.models import Produto
from .models import (
    Produto, Aluno, Professor, Vaga,
    Candidatura, RegistroMonitoria,
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
            'curso', 'disciplina', 'periodo', 'telefone'
        ]
        read_only_fields = ['id', 'matricula', 'cpf']


class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = ['id', 'nome', 'cpf', 'telefone']
        read_only_fields = ['id', 'cpf']


class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaga
        fields = ['id', 'nome', 'descricao', 'crminimo', 'disciplina', 'statusvaga']
        read_only_fields = ['id']


class CandidaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidatura
        fields = ['id', 'nome', 'telefone', 'documento']
        read_only_fields = ['id']


class RegistroMonitoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroMonitoria
        fields = ['id', 'nome', 'email', 'matricula', 'horasTrabalhadas', 'dataEntrada']
        read_only_fields = ['id']


class DisciplinaSerializer(serializers.ModelSerializer):
    professor_nome = serializers.CharField(source='professor.nome', read_only=True)

    class Meta:
        model = Disciplina
        fields = ['id', 'nomepython', 'codigo', 'professor', 'professor_nome', 'cargaHoraria', 'ementa']
        read_only_fields = ['id', 'codigo']


class InscricaoSerializer(serializers.ModelSerializer):
    aluno_nome = serializers.CharField(source='aluno.nome', read_only=True)
    disciplina_nome = serializers.CharField(source='disciplina.nomepython', read_only=True)

    class Meta:
        model = Inscricao
        fields = ['id', 'aluno', 'aluno_nome', 'disciplina', 'disciplina_nome']
        read_only_fields = ['id']