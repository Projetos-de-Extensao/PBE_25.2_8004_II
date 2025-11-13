from core.views import MyTokenObtainPairView 
# (Vamos precisar importar a view de refresh também)
from rest_framework_simplejwt.views import TokenRefreshView

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core import views as core_views

router = routers.DefaultRouter()
router.register(r'professores', core_views.ProfessorViewSet)
router.register(r'alunos', core_views.AlunoViewSet)
router.register(r'disciplinas', core_views.DisciplinaViewSet)
router.register(r'vagas', core_views.VagaViewSet)
router.register(r'candidaturas', core_views.CandidaturaViewSet)
router.register(r'registros', core_views.RegistroMonitoriaViewSet)
router.register(r'inscricoes', core_views.InscricaoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')), 
    path('api/', include('core.api_urls')),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),      # site HTML na raiz
]