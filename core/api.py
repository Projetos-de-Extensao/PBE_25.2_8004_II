
from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from core import models, serializers

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = models.Produto.objects.all()
    serializer_class = serializers.ProdutoSerializer

class AlunoViewSet(viewsets.ModelViewSet):
    queryset = models.Aluno.objects.all()
    serializer_class = serializers.AlunoSerializer

class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = models.Professor.objects.all()
    serializer_class = serializers.ProfessorSerializer

class VagaViewSet(viewsets.ModelViewSet):
    queryset = models.Vaga.objects.all()
    serializer_class = serializers.VagaSerializer
   
class RegistroMonitoriaViewSet(viewsets.ModelViewSet):
    queryset = models.RegistroMonitoria.objects.all()
    serializer_class = serializers.RegistroMonitoriaSerializer

class DisciplinaViewSet(viewsets.ModelViewSet):
    queryset = models.Disciplina.objects.all()
    serializer_class = serializers.DisciplinaSerializer

class InscricaoViewSet(viewsets.ModelViewSet):
    queryset = models.Inscricao.objects.all()
    serializer_class = serializers.InscricaoSerializer
