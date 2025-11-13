from django.db import models
from django.contrib.auth.models import User # Importamos o Usuário padrão do Django

# --- Modelos de Perfil (Ligados ao Usuário) ---

class Professor(models.Model):
    # O OneToOneField liga este Professor a UM Único Usuário do Django
    # 'on_delete=models.CASCADE' diz: se o User for apagado, apague este perfil.
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='professor_profile')
    cpf = models.CharField(max_length=14, unique=True)
    telefone = models.CharField(max_length=15, blank=True) # 'blank=True' = Opcional

    # O método __str__ é o padrão do Python/Django para representar o objeto
    def __str__(self):
        return self.user.username # Mostra o nome de usuário

class Aluno(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='aluno_profile')
    matricula = models.CharField(max_length=20, unique=True)
    cpf = models.CharField(max_length=14, unique=True)
    crgeral = models.FloatField()
    curso = models.CharField(max_length=100)
    periodo = models.IntegerField()
    telefone = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return f"{self.user.username} ({self.matricula})"

# --- Modelos Principais ---

class Disciplina(models.Model):
    # 'nomepython' renomeado para 'nome'
    nome = models.CharField(max_length=100)
    codigo = models.CharField(max_length=20, unique=True)
    
    # Relação: Uma disciplina é dada por UM professor
    # 'related_name' permite fazer: professor.disciplinas.all()
    professor = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name='disciplinas')
    cargaHoraria = models.IntegerField()
    ementa = models.TextField(blank=True)

    def __str__(self):
        return f"{self.codigo} - {self.nome}"

class Vaga(models.Model):
    nome = models.CharField(max_length=100)
    crminimo = models.FloatField()
    
    # Relação: A vaga pertence a UMA disciplina (NÃO é um texto)
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE, related_name='vagas')
    
    # Relação: A vaga foi criada por UM professor
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='vagas_criadas')
    
    # Usamos choices para limitar as opções de status
    STATUS_CHOICES = (
        ('aberta', 'Aberta'),
        ('fechada', 'Fechada'),
    )
    statusvaga = models.CharField(max_length=20, choices=STATUS_CHOICES, default='aberta')
    descricao = models.TextField(blank=True) # Adicionei descrição

    def __str__(self):
        return f"Vaga: {self.nome} ({self.disciplina.codigo})"

# Em core/models.py

class Candidatura(models.Model):
    # Relação: A candidatura é de UM aluno
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name='candidaturas')
    
    # Relação: A candidatura é para UMA vaga
    vaga = models.ForeignKey(Vaga, on_delete=models.CASCADE, related_name='candidaturas')
    
    # --- MUDANÇA 1: TORNAR O DOCUMENTO OPCIONAL ---
    # Adicione null=True, blank=True
    documento = models.FileField(upload_to='documentos/', null=True, blank=True)
    
    data_candidatura = models.DateTimeField(auto_now_add=True)

    # --- MUDANÇA 2: ADICIONAR CAMPO DE STATUS ---
    STATUS_CHOICES = (
        ('pendente', 'Pendente'),
        ('aprovada', 'Aprovada'),
        ('rejeitada', 'Rejeitada'),
    )
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='pendente'  # A lógica que você pediu!
    )

    class Meta:
        # Garante que um aluno só pode se candidatar uma vez por vaga
        unique_together = ('aluno', 'vaga')

    def __str__(self):
        # Atualiza o __str__ para incluir o status
        return f"Candidatura de {self.aluno.user.username} para {self.vaga.nome} ({self.get_status_display()})"

class RegistroMonitoria(models.Model):
    # Relação: O registro é de UM aluno
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name='registros_monitoria')
    
    # Relação: O registro é sobre UMA vaga (ou disciplina)
    vaga = models.ForeignKey(Vaga, on_delete=models.CASCADE, related_name='registros')
    
    horasTrabalhadas = models.IntegerField()
    data = models.DateField()
    descricao_atividades = models.TextField()

    def __str__(self):
        return f"Registro de {self.aluno.user.username} - {self.data}"

class Inscricao(models.Model):
    # Este modelo está ótimo! Representa a relação N-para-N (Muitos-para-Muitos)
    # entre Aluno e Disciplina.
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE)
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('aluno', 'disciplina')

    def __str__(self):
        return f"{self.aluno.user.username} inscrito em {self.disciplina.nome}"