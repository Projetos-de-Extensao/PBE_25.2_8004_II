# Em core/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Professor, Aluno, Disciplina, Vaga, Candidatura, RegistroMonitoria, Inscricao
from .serializers import (
    ProfessorSerializer, AlunoSerializer, DisciplinaSerializer,
    VagaSerializer, CandidaturaSerializer, RegistroMonitoriaSerializer,
    InscricaoSerializer
)
# (Vamos mover o import do MyTokenObtainPairSerializer para baixo)
from .permissions import IsProfessor, IsAluno 


class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAdminUser] # Apenas Admin pode gerenciar perfis de Professor

class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    permission_classes = [IsAdminUser] # Apenas Admin pode gerenciar perfis de Aluno


class DisciplinaViewSet(viewsets.ModelViewSet):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsAuthenticated]

class VagaViewSet(viewsets.ModelViewSet):
    queryset = Vaga.objects.filter(statusvaga='aberta')
    serializer_class = VagaSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [IsProfessor]
        elif self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsProfessor]
        else:
            permission_classes = [IsAuthenticated]
        
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        # Associa o professor logado à vaga criada
        serializer.save(professor=self.request.user.professor_profile)

class CandidaturaViewSet(viewsets.ModelViewSet):
    queryset = Candidatura.objects.all()
    serializer_class = CandidaturaSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [IsAluno]
        else:
            permission_classes = [IsAuthenticated]
            
        return [permission() for permission in permission_classes]

class RegistroMonitoriaViewSet(viewsets.ModelViewSet):
    queryset = RegistroMonitoria.objects.all()
    serializer_class = RegistroMonitoriaSerializer
    permission_classes = [IsAdminUser] # Apenas Admin gerencia isso por enquanto

class InscricaoViewSet(viewsets.ModelViewSet):
    queryset = Inscricao.objects.all()
    serializer_class = InscricaoSerializer
    permission_classes = [IsAdminUser] # Apenas Admin gerencia isso por enquanto

# --- NOVO CÓDIGO PARA O TOKEN JWT (Passo 1.3) ---

from rest_framework_simplejwt.views import TokenObtainPairView
# Importe o novo serializer que criamos no 'serializers.py'
from .serializers import MyTokenObtainPairSerializer 

class MyTokenObtainPairView(TokenObtainPairView):
    """
    Substitui a view padrão de obtenção de token
    para usar o nosso serializer customizado.
    """
    serializer_class = MyTokenObtainPairSerializer