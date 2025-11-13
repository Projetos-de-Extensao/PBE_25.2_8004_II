from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/aluno/', views.dashboard_aluno, name='dashboard_aluno'),
    path('dashboard/professor/', views.dashboard_professor, name='dashboard_professor'),
]