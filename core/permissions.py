# Em core/permissions.py

from rest_framework.permissions import BasePermission

# Esta classe verifica se o usuário logado tem um perfil de Professor
class IsProfessor(BasePermission):
    """
    Permite acesso apenas a usuários que são Professores.
    """
    def has_permission(self, request, view):
        # 'hasattr' verifica se o objeto 'request.user' (o usuário logado)
        # tem o atributo 'professor_profile' que nós definimos
        # no related_name do OneToOneField em models.py
        return hasattr(request.user, 'professor_profile')

# Esta classe verifica se o usuário logado tem um perfil de Aluno
class IsAluno(BasePermission):
    """
    Permite acesso apenas a usuários que são Alunos.
    """
    def has_permission(self, request, view):
        # Mesma lógica, mas verifica pelo perfil de aluno
        return hasattr(request.user, 'aluno_profile')