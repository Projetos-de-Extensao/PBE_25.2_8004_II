from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Professor, Aluno, Disciplina, Vaga, Candidatura, RegistroMonitoria, Inscricao 
from .serializers import (
    ProfessorSerializer, AlunoSerializer, DisciplinaSerializer,
    VagaSerializer, CandidaturaSerializer, RegistroMonitoriaSerializer,
    InscricaoSerializer, MyTokenObtainPairSerializer
)
from .permissions import IsProfessor, IsAluno
from django.contrib import messages
from django.views.decorators.http import require_POST
from .models import Candidatura # Importe Candidatura
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
    erro = None
    if request.method == 'POST':
        username = request.POST.get('username')
        senha = request.POST.get('senha')
        user = authenticate(request, username=username, password=senha)

        # Checagem de segurança em DUAS etapas:
        # 1. O usuário existe?
        # 2. Ele TEM o perfil de aluno?
        if user is not None and hasattr(user, 'aluno_profile'):
            login(request, user)
            return redirect('dashboard_aluno')
        else:
            # Se o usuário não existe OU não é um aluno, mostre erro
            erro = 'Usuário ou senha inválidos, ou usuário não é um aluno.'

    contexto = {'erro': erro}
    return render(request, 'login.html', contexto)

@login_required
def dashboard_aluno(request):
    # Busca todas as vagas que estão com status 'aberta'
    vagas_abertas = Vaga.objects.filter(statusvaga='aberta').order_by('-id')
    
    # Busca todas as candidaturas feitas pelo aluno logado
    minhas_candidaturas = []
    if hasattr(request.user, 'aluno_profile'):
        minhas_candidaturas = Candidatura.objects.filter(aluno=request.user.aluno_profile).order_by('-data_candidatura')

    contexto = {
        'usuario': request.user,
        'vagas_abertas': vagas_abertas,
        'minhas_candidaturas': minhas_candidaturas
    }
    return render(request, 'alunodashboard.html', contexto)

@login_required
def dashboard_professor(request):
    try:
        # Otimização: Usamos .prefetch_related para buscar as candidaturas
        # e os alunos associados de uma só vez.
        minhas_vagas = Vaga.objects.filter(
            professor=request.user.professor_profile
        ).prefetch_related(
            'candidaturas', 'candidaturas__aluno', 'candidaturas__aluno__user'
        ).order_by('-id')
    except AttributeError:
        minhas_vagas = []

    contexto = {
        'usuario': request.user,
        'vagas': minhas_vagas
    }
    return render(request, 'professordashboard.html', contexto)

def logout_view(request):
    logout(request)
    return redirect('home')

def criar_vaga(request):
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descricao = request.POST.get('descricao')
        disciplina_id = request.POST.get('disciplina')
        statusvaga = request.POST.get('statusvaga')
        crminimo = request.POST.get('crminimo')
        erro = None
        if not (titulo and descricao and disciplina_id and statusvaga):
            erro = 'Preencha todos os campos.'
        else:
            try:
                cr_final = crminimo if crminimo else None
                disciplina = Disciplina.objects.get(id=disciplina_id)
                Vaga.objects.create(
                    nome=titulo,
                    descricao=descricao,
                    disciplina=disciplina,
                    professor=request.user.professor_profile,
                    crminimo=cr_final,
                    statusvaga=statusvaga
                )
                return redirect('dashboard_professor')
            except Disciplina.DoesNotExist:
                erro = 'Disciplina inválida.'
            except ValueError:
                erro = 'O valor do CR Mínimo deve ser um número.'
        disciplinas = Disciplina.objects.all()
        contexto = {'disciplinas': disciplinas, 'erro': erro}
        return render(request, 'criar_vaga.html', contexto)
    else:
        disciplinas = Disciplina.objects.all()
        contexto = {'disciplinas': disciplinas}
        return render(request, 'criar_vaga.html', contexto)
    
def login_professor_view(request):
    erro = None
    if request.method == 'POST':
        email = request.POST.get('username')
        senha = request.POST.get('senha')
        # Adapte a autenticação conforme seu modelo de professor
        user = authenticate(request, username=email, password=senha)
        if user is not None and hasattr(user, 'professor_profile'):
            login(request, user)
            return redirect('dashboard_professor')
        else:
            erro = 'E-mail ou senha inválidos, ou usuário não é professor.'
    return render(request, 'login_professor.html', {'erro': erro})

@login_required
def inscrever_vaga(request):
    if request.method == 'POST':
        # Verifica se quem está se inscrevendo é mesmo um aluno
        if not hasattr(request.user, 'aluno_profile'):
            messages.error(request, 'Você precisa ser um aluno para se inscrever.')
            return redirect('dashboard_aluno')

        vaga_id = request.POST.get('vaga_id')
        try:
            vaga = Vaga.objects.get(id=vaga_id)
            aluno = request.user.aluno_profile

            # Verifica se o aluno já se inscreveu (graças ao unique_together)
            ja_inscrito = Candidatura.objects.filter(aluno=aluno, vaga=vaga).exists()
            
            if ja_inscrito:
                messages.warning(request, 'Você já se inscreveu nesta vaga.')
            else:
                # Cria a candidatura! O status 'pendente' é o default.
                Candidatura.objects.create(aluno=aluno, vaga=vaga)
                messages.success(request, f'Inscrição para "{vaga.nome}" realizada com sucesso!')

        except Vaga.DoesNotExist:
            messages.error(request, 'Vaga não encontrada.')
        except Exception as e:
            messages.error(request, f'Ocorreu um erro: {e}')
    
    # Se não for POST ou se terminar, volta ao dashboard do aluno
    return redirect('dashboard_aluno')

# Em core/views.py

@login_required
@require_POST # Garante que esta view só aceita requisições POST
def gerenciar_candidatura(request):
    candidatura_id = request.POST.get('candidatura_id')
    acao = request.POST.get('acao') # 'aprovar' ou 'rejeitar'

    if not (candidatura_id and acao in ['aprovar', 'rejeitar']):
        messages.error(request, 'Ação inválida.')
        return redirect('dashboard_professor')

    try:
        # Verificação de segurança: Busca a candidatura E
        # garante que ela pertence a uma vaga do professor logado.
        candidatura = Candidatura.objects.get(
            id=candidatura_id,
            vaga__professor=request.user.professor_profile
        )
        
        if candidatura.status != 'pendente':
            messages.warning(request, 'Esta candidatura já foi processada.')
            return redirect('dashboard_professor')

        if acao == 'aprovar':
            candidatura.status = 'aprovada'
            candidatura.save()
            messages.success(request, f"Candidatura de {candidatura.aluno.user.get_full_name()} foi APROVADA.")
        
        elif acao == 'rejeitar':
            candidatura.status = 'rejeitada'
            candidatura.save()
            messages.success(request, f"Candidatura de {candidatura.aluno.user.get_full_name()} foi REJEITADA.")

    except Candidatura.DoesNotExist:
        messages.error(request, 'Candidatura não encontrada ou você não tem permissão.')
    except Exception as e:
        messages.error(request, f'Ocorreu um erro: {e}')

    return redirect('dashboard_professor')