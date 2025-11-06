from django.contrib import admin
from . import models

admin.site.register(models.Professor)
admin.site.register(models.Aluno)
admin.site.register(models.Disciplina)
admin.site.register(models.Vaga)
admin.site.register(models.Candidatura)
admin.site.register(models.RegistroMonitoria)
admin.site.register(models.Inscricao)