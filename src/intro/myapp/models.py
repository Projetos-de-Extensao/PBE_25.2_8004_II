from django.db import models
from django.utils import timezone

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    descricao = models.TextField()
    disponivel = models.BooleanField(default=True)

class Professor(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, unique=True)
    telefone = models.CharField(max_length=15)

    def criarVaga(self, nome, crminimo, disciplina, statusvaga):
        vaga = Vaga(
            nome=nome,
            crminimo=crminimo,
            disciplina=disciplina,
            statusvaga=statusvaga,
            professor=self
        )
        vaga.save()
        return vaga

class Disciplina(models.Model):
    nome = models.CharField(max_length=100)  
    codigo = models.CharField(max_length=20)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='disciplinas')
    cargaHoraria = models.IntegerField()
    ementa = models.TextField()

    def registrarVaga(self):
        return f"Vaga de monitoria na disciplina {self.nome} registrada com sucesso."

class Aluno(models.Model):
    matricula = models.CharField(max_length=20, unique=True)
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, unique=True)
    crgeral = models.FloatField()
    curso = models.CharField(max_length=100)
    periodo = models.IntegerField()
    telefone = models.CharField(max_length=15)

    def fornecerInfo(self):
        return f"{self.nome} - {self.curso} - CR:{self.crgeral}"

class Vaga(models.Model):
    nome = models.CharField(max_length=100)
    crminimo = models.FloatField()
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE, related_name='vagas', null=True, blank=True)
    statusvaga = models.CharField(max_length=20)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='vagas', null=True, blank=True)
    prazo_inscricao = models.DateField(null=True, blank=True)
    descricao = models.TextField(default='')  

    def exibirVaga(self):
        return f"Vaga: {self.nome}, Disciplina: {self.disciplina.nome}, Status: {self.statusvaga}"

class Inscricao(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name='inscricoes')  
    vaga = models.ForeignKey(Vaga, on_delete=models.CASCADE, related_name='inscricoes', null=True, blank=True)
    documentos = models.FileField(upload_to='documentos/', null=True, blank=True) 
    status = models.CharField(max_length=20, default='Pendente')  
    data_candidatura = models.DateTimeField(default=timezone.now)  # CORRIGIDO: trocado auto_now_add por default

    def inscrever(self):
        return f"Aluno {self.aluno.nome} inscrito na vaga {self.vaga.nome} com sucesso."

    def validarCR(self):  
        if self.aluno.crgeral >= self.vaga.crminimo:
            return True
        return False

class RegistroMonitoria(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name='registros_monitoria', null=True, blank=True)
    vaga = models.ForeignKey(Vaga, on_delete=models.CASCADE, related_name='registros_monitoria', null=True, blank=True)
    horasTrabalhadas = models.IntegerField()
    dataRegistro = models.DateField()  
    descricao_atividades = models.TextField(default='')  
    validado_por = models.ForeignKey(Professor, on_delete=models.CASCADE, null=True, blank=True)  

    def registrarMonitoria(self):
        return f"Registro de monitoria para {self.aluno.nome} em {self.dataRegistro}."