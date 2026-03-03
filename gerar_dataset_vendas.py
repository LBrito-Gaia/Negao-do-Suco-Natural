# -*- coding: utf-8 -*-
"""
SCRIPT DE ENGENHARIA DE DADOS - NegaodoSucoNatural

Este script executa um processo de ETL completo para o portfólio:
1.  EXTRAÇÃO (Extract): Lê o arquivo de configuração do site (`delivery.js`)
    e extrai a lista de produtos e preços usando Regex.
2.  TRANSFORMAÇÃO (Transform): Simula 1.000 registros de vendas fictícias
    com base nos produtos reais, gerando dados realistas.
3.  CARGA (Load): Salva o dataset limpo e estruturado em um arquivo CSV,
    pronto para ser usado no Power BI.
4.  ANÁLISE RÁPIDA: Exibe um resumo do faturamento por produto no console.
"""
import re
import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta
import os

# --- 1. ETAPA DE EXTRAÇÃO (Extract) ---
def extrair_produtos_do_site(caminho_arquivo_js: str) -> pd.DataFrame:
    """
    Lê o arquivo JS do site, extrai produtos e preços via Regex e retorna um DataFrame.
    """
    print(f"🔎 Lendo o arquivo de configuração: {caminho_arquivo_js}")
    try:
        with open(caminho_arquivo_js, 'r', encoding='utf-8') as f:
            conteudo = f.read()

        # Regex para encontrar todos os produtos e seus preços de uma vez.
        # É mais eficiente que ler linha por linha.
        padrao = r"'([^']+)':\s*\{\s*price:\s*([\d\.]+)"
        matches = re.findall(padrao, conteudo)

        if not matches:
            print("⚠️ Nenhum produto encontrado. Verifique o padrão Regex e o arquivo JS.")
            return pd.DataFrame()

        dados_produtos = [{'Produto': nome, 'Preco': float(preco)} for nome, preco in matches]
        df_produtos = pd.DataFrame(dados_produtos)

        print(f"✅ {len(df_produtos)} produtos extraídos com sucesso!")
        return df_produtos

    except FileNotFoundError:
        print(f"❌ ERRO: Arquivo '{caminho_arquivo_js}' não encontrado. Verifique o caminho.")
        return pd.DataFrame()
    except Exception as e:
        print(f"❌ ERRO inesperado ao ler o arquivo: {e}")
        return pd.DataFrame()

# --- 2. ETAPA DE TRANSFORMAÇÃO (Transform & Simulate) ---
def simular_vendas(df_produtos: pd.DataFrame, num_vendas: int = 1000) -> pd.DataFrame:
    """
    Gera um DataFrame de vendas fictícias com base na lista de produtos reais.
    """
    if df_produtos.empty:
        return pd.DataFrame()

    print(f"⚙️ Gerando {num_vendas} vendas fictícias...")

    vendas_lista = []
    data_inicial = datetime.now() - timedelta(days=60) # Vendas nos últimos 2 meses
    metodos_pagamento = ['Pix', 'Cartão Crédito', 'Cartão Débito', 'Dinheiro']

    for i in range(num_vendas):
        # Seleciona um produto aleatório (lógica do seu notebook)
        produto_row = df_produtos.sample().iloc[0]

        # Simula uma data e horário mais realistas (mais vendas à noite)
        dias_aleatorios = random.randint(0, 59)
        hora_venda = int(np.random.normal(19, 2.5)) # Média 19h, com desvio
        hora_venda = max(9, min(22, hora_venda)) # Garante que esteja entre 09h e 22h
        data_venda = data_inicial + timedelta(days=dias_aleatorios, hours=hora_venda, minutes=random.randint(0, 59))

        # Quantidade aleatória com pesos (lógica do seu notebook)
        quantidade = random.choices([1, 2, 3], weights=[0.7, 0.2, 0.1])[0]

        vendas_lista.append({
            'ID_Venda': 1000 + i,
            'Data_Venda': data_venda,
            'Produto': produto_row['Produto'],
            'Preco_Unitario': produto_row['Preco'],
            'Quantidade': quantidade,
            'Total_Venda': produto_row['Preco'] * quantidade,
            'Metodo_Pagamento': random.choice(metodos_pagamento),
        })

    df_vendas = pd.DataFrame(vendas_lista)
    df_vendas = df_vendas.sort_values(by='Data_Venda').reset_index(drop=True)
    print("✅ Simulação de vendas concluída.")
    return df_vendas

# --- 3. ETAPA DE CARGA (Load) ---
def salvar_csv(df: pd.DataFrame, nome_arquivo: str):
    """
    Salva o DataFrame em um arquivo CSV, pronto para o Power BI.
    """
    if df.empty:
        print("⚠️ DataFrame de vendas está vazio. O arquivo CSV não foi gerado.")
        return

    try:
        # utf-8-sig garante a codificação correta de caracteres especiais no Excel/Power BI
        df.to_csv(nome_arquivo, index=False, encoding='utf-8-sig')
        print(f"🚀 SUCESSO! Arquivo salvo em:\n👉 {os.path.abspath(nome_arquivo)}")
    except Exception as e:
        print(f"❌ ERRO ao salvar o arquivo CSV: {e}")

# --- EXECUÇÃO PRINCIPAL ---
if __name__ == "__main__":
    # Obtém o diretório onde este script está salvo
    diretorio_script = os.path.dirname(os.path.abspath(__file__))

    # --- BUSCA INTELIGENTE DO ARQUIVO JS ---
    # Procura o delivery.js no mesmo local do script ou na pasta static
    caminhos_possiveis = [
        os.path.join(diretorio_script, 'delivery.js'),           # Opção A: Mesmo diretório
        os.path.join(diretorio_script, 'static', 'delivery.js')  # Opção B: Pasta static (se script estiver na raiz)
    ]
    
    caminho_js = None
    for caminho in caminhos_possiveis:
        if os.path.exists(caminho):
            caminho_js = caminho
            break
            
    if not caminho_js:
        print("❌ ERRO CRÍTICO: O arquivo 'delivery.js' não foi encontrado!")
        print(f"   O script procurou em: {caminhos_possiveis}")
        input("\nPressione ENTER para sair...")
        exit()

    # Define onde salvar: Sempre na pasta 'pai' da pasta static (Raiz do Projeto)
    # Se achou em .../static/delivery.js, salva em .../vendas_para_analise.csv
    pasta_do_js = os.path.dirname(caminho_js)
    if os.path.basename(pasta_do_js) == 'static':
        pasta_raiz = os.path.dirname(pasta_do_js)
    else:
        pasta_raiz = pasta_do_js
        
    nome_arquivo_saida = os.path.join(pasta_raiz, 'vendas_para_analise.csv')

    # 1. Extrair
    df_produtos_extraidos = extrair_produtos_do_site(caminho_js)

    # 2. Simular
    df_vendas_simuladas = simular_vendas(df_produtos_extraidos)

    # 3. Salvar
    salvar_csv(df_vendas_simuladas, nome_arquivo_saida)

    # 4. Análise Rápida (Bônus, inspirado no seu notebook)
    if not df_vendas_simuladas.empty:
        print("\n--- 📊 Análise Rápida de Faturamento por Produto ---")
        faturamento_por_produto = df_vendas_simuladas.groupby('Produto')['Total_Venda'].sum().sort_values(ascending=False)
        
        # Formata para moeda e exibe o Top 10
        faturamento_formatado = faturamento_por_produto.head(10).map('R$ {:,.2f}'.format)
        print(faturamento_formatado)
        print("----------------------------------------------------")

    input("\n✅ Processo finalizado. Pressione ENTER para fechar esta janela...")

