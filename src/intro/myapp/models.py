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
    

    def fornecerInfo(self):
        return f"{self.nome} - {self.curso} - CR:{self.crgeral}"

class Professor(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, unique=True)
    telefone = models.CharField(max_length=15)

    def criarVaga(self, nome, crminimo, disciplina, statusvaga):
        vaga = Vaga(
            nome=nome,
            crminimo=crminimo,
            disciplina=disciplina,
            statusvaga=statusvaga
        )
        vaga.save()
        return vaga

class Vaga(models.Model):
    nome = models.CharField(max_length=100)
    crminimo = models.FloatField()
    disciplina = models.CharField(max_length=100)
    statusvaga = models.CharField(max_length=20)

    def exibirVaga(self):
        return f"Vaga: {self.nome}, Disciplina: {self.disciplina}, Descrição: { self.descricao}, Status: {self.statusvaga}"

class Candidatura(models.Model):
    nome = models.CharField(max_length=30)
    telefone = models.CharField(max_length=15)
    documento = models.FileField(upload_to='documentos/')

    def enviarCandidatura(self):
        return f"Candidatura de {self.nome} enviada com sucesso."


class RegistroMonitoria(models.Model):
    nome = models.CharField(max_length=30)
    email = models.EmailField()
    matricula = models.CharField(max_length=12)
    horasTrabalhadas = models.IntegerField()
    dataEntrada = models.DateField()

    def registrarMonitoria(self):
        return f"Registro de monitoria para {self.nome} em {self.dataEntrada}."

class Disciplina(models.Model):
    nomepython = models.CharField(max_length=100)
    codigo = models.CharField(max_length=20)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    cargaHoraria = models.IntegerField()
    ementa = models.TextField()

    def registrarVaga(self):
        return f"Vaga de monitoria na disciplina {self.nomepython} registrada com sucesso."

class Inscricao(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE)
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)
   
    def inscrever(self):
        return f"Aluno {self.aluno.nome} inscrito na disciplina {self.disciplina.nomepython} com sucesso."
