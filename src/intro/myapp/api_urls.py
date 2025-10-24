from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.api import (
    ProdutoViewSet,
    AlunoViewSet,
    ProfessorViewSet,
    VagaViewSet,
    RegistroMonitoriaViewSet,
    DisciplinaViewSet,
    InscricaoViewSet,
)

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet, basename='produto')
router.register(r'alunos', AlunoViewSet, basename='aluno')
router.register(r'professores', ProfessorViewSet, basename='professor')
router.register(r'vagas', VagaViewSet, basename='vaga')
router.register(r'registros_monitoria', RegistroMonitoriaViewSet, basename='registro_monitoria')
router.register(r'disciplinas', DisciplinaViewSet, basename='disciplina')
router.register(r'inscricoes', InscricaoViewSet, basename='inscricao')

urlpatterns = [
    path('', include(router.urls)),
]