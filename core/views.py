from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Professor, Aluno, Disciplina, Vaga, Candidatura, RegistroMonitoria, Inscricao
from .serializers import (
    ProfessorSerializer, AlunoSerializer, DisciplinaSerializer,
    VagaSerializer, CandidaturaSerializer, RegistroMonitoriaSerializer,
    InscricaoSerializer, MyTokenObtainPairSerializer
)
from .permissions import IsProfessor, IsAluno
from rest_framework_simplejwt.views import TokenObtainPairView

# --- API ViewSets ---
class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAdminUser]

class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    permission_classes = [IsAdminUser]

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
    permission_classes = [IsAdminUser]

class InscricaoViewSet(viewsets.ModelViewSet):
    queryset = Inscricao.objects.all()
    serializer_class = InscricaoSerializer
    permission_classes = [IsAdminUser]

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# --- Views para templates Django ---
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

def home(request):
    contexto = {'usuario': request.user if request.user.is_authenticated else None}
    return render(request, 'home.html', contexto)

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Redireciona conforme o perfil do usuário
            if hasattr(user, 'professor_profile'):
                return redirect('dashboard_professor')
            elif hasattr(user, 'aluno_profile'):
                return redirect('dashboard_aluno')
            else:
                return redirect('home')
        else:
            contexto = {'erro': 'Usuário ou senha inválidos'}
            return render(request, 'login.html', contexto)
    return render(request, 'login.html')

@login_required
def dashboard_aluno(request):
    contexto = {'usuario': request.user}
    return render(request, 'alunodashboard.html', contexto)

@login_required
def dashboard_professor(request):
    contexto = {'usuario': request.user}
    return render(request, 'professordashboard.html', contexto)

def logout_view(request):
    logout(request)
    return redirect('home')

def criar_vaga(request):
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descricao = request.POST.get('descricao')
        disciplina_id = request.POST.get('disciplina')
        disciplina = Disciplina.objects.get(id=disciplina_id)
        Vaga.objects.create(
            titulo=titulo,
            descricao=descricao,
            disciplina=disciplina,
            professor=request.user.professor_profile,
            statusvaga='aberta'
        )
        return redirect('dashboard_professor')
    else:
        disciplinas = Disciplina.objects.all()
        contexto = {'disciplinas': disciplinas}
        return render(request, 'criar_vaga.html', contexto)