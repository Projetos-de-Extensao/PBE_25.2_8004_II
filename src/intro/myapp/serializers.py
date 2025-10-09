
from rest_framework import serializers
from myapp.models import Produto

# Cada classe criada aqui representa um serializador para o modelo correspondente (models.py)
class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ['id', 'nome', 'preco', 'descricao', 'disponivel']
        read_only_fields = ['id']