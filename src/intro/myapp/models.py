from django.db import models

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    descricao = models.TextField()
    disponivel = models.BooleanField(default=True)

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

class Candidatura(models.Model):
    nome = models.CharField(max_length=30)
    telefone = models.CharField(max_length=15)
    documento = models.FileField(upload_to='documentos/')

class RegistroMonitoria(models.Model):
    nome = models.CharField(max_length=30)
    email = models.EmailField()
    matricula = models.CharField(max_length=12)
    horasTrabalhadas = models.IntegerField()
    dataEntrada = models.DateField()

class Disciplina(models.Model):
    nomepython = models.CharField(max_length=100)
    codigo = models.CharField(max_length=20)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    cargaHoraria = models.IntegerField()
    ementa = models.TextField() # !!!!!!!!!!! FALTA MIGRAR ESSA CLASSE !!!!!!!!! #
   
    def __str__(self):
        return self.nomepython 
