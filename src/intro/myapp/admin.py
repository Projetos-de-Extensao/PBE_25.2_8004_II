from django.contrib import admin
from .models import (
    Produto, Aluno, Professor, Vaga, RegistroMonitoria, Disciplina, Inscricao
)

admin.site.register(Produto)
admin.site.register(Aluno)
admin.site.register(Professor)
admin.site.register(Vaga)
admin.site.register(RegistroMonitoria)
admin.site.register(Disciplina)
admin.site.register(Inscricao)

