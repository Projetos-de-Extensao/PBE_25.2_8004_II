from django.db import models

class Aluno(models.Model):
    matricula = models.CharField(max_length=20, unique=True)
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, unique=True)
    crgeral = models.FloatField()
    curso = models.CharField(max_length=100)
    disciplina = models.CharField(max_length=100)
    periodo = models.IntegerField()
    telefone = models.CharField(max_length=15)

class Professor(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, unique=True)
    telefone = models.CharField(max_length=15)

class Vaga(models.Model):
    nome = models.CharField(max_length=100)
    crminimo = models.FloatField()
    disciplina = models.CharField(max_length=100)
    statusvaga = models.CharField(max_length=20)
   
    def __str__(self):
        return self.nomepython 
