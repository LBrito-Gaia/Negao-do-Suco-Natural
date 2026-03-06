# Projeto Integrado: Do Site à Análise de Dados (Negão do Suco)

## Sobre o Projeto
Este projeto foi desenvolvido para unir minhas habilidades em **Análise de Dados** e **Desenvolvedor Web**. Tudo começou com a criação do site para a lanchonete "Negão do Suco". 
Durante o processo, percebi que o código do site poderia servir como fonte de dados para uma análise de negócio real, permitindo entender o potencial de faturamento e os produtos mais atrativos.

---
## Etapas do Desenvolvimento

**Frontend:**
Desenvolvimento de um site funcional e responsivo, focado na experiência do usuário e catálogo de produtos.
* **Status:** Publicado e funcional.
* **Hospedagem:** Netlify.

**Engenharia de Dados (Python):**
Como o site ainda não possui tráfego real de clientes, utilizei o Python para "fabricar" um cenário de negócio:

O que foi feito na prática:
* **Engenharia de Extração (Python & Regex):** Desenvolvi um script que "minera" os preços e produtos diretamente do código-fonte do site (`delivery.js`). Isso me ensinou a lidar com dados não estruturados e a garantir a integridade da fonte.
* **Data Wrangling (Pandas & Numpy):** Tratei strings complexas e organizei a estrutura. Gerei um dataset de **1.000 vendas fictícias** aplicadas a uma lógica de negócio realista (mix de produtos e métodos de pagamento).
* **Business Intelligence (Power BI):** Transformei o CSV resultante em um dashboard estratégico. Superei desafios como a **ordenação cronológica via DAX**, garantindo insights claros sobre faturamento e ticket médio.

---
## Aprendizado:
Este projeto foi uma jornada de evolução técnica. Meus principais aprendizados foram:<br>
 **Resolução de problemas de sistema:** Lidar com erros de caminho de arquivo (FileNotFoundError) e diretórios no Windows vs Python.<br>
 **Manipulação de Strings:** Uso prático de Regex para limpeza de dados complexos que não estavam em formato de tabela.<br>
 **Lógica de Negócio:** Criação de métricas de venda (KPIs) e simulação de cenários reais de uma lanchonete.<br>
 **Integração de Ferramentas:** Conectar o resultado de um script Python diretamente com o Power BI.
 
---
## Competências Utilizadas
 **Linguagens:** Python, HTML, CSS, JavaScript.<br>
 **Bibliotecas de Dados:** Pandas, Numpy, Regex (`re`).<br>
 **BI & Relatórios:** Power BI, Microsoft Excel.<br>
 **Versionamento:** Git e GitHub.
 
---
## Links Úteis
**Repositório do Projeto:** [https://github.com/LBrito-Gaia/Negao-do-Suco-Natural]<br>
**Notebook de Limpeza:** [https://github.com/LBrito-Gaia/Negao-do-Suco-Natural/blob/main/notebooks]



