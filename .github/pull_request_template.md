<!-- As informações abaixo são obrigatórias. -->

## Informações Jira

<!-- Informe o link das tasks no jira. -->
[XXX-000 - NOME DA TAREFA](https://raiadrogasilsa.atlassian.net/browse/MMM-XXX)

<!-- O Checklist deve ser preenchido apenas pelo revisor no momento do code review -->
## Checklists

### Antes do code review

- [ ] O nome da branch segue o padrão: feature/XXX-000, bugfix/XXX-000, hotfix/XXX-000 ou hotfix/erro-no-exemplo.
- [ ] O titulo da MR segue o padrão: XXX-000 - Adicionar Template de merge requests.
- [ ] Foi informado o link da task no Jira.
- [ ] A opção **Assign** na MR foi preenchida com o nome do responsável pela task.

### Após o code review

- [ ] A tipagem foi implementada corretamente sem o uso do tipo `any`, exceto quando necessário.
- [ ] Não foram acrescentados comentários `eslint-disable`, salvo se **realmente** necessário.
- [ ] Não foi feita **nenhuma** modificação no código que não estivesse prevista pela task no Jira informada nesta MR.
- [ ] Trechos de código comentados, que não estão sendo utilizados ou que não possuem uma previsão para serem utilizados foram removidos.
- [ ] Comentários desnecessários foram removidos.
- [ ] O revisor da task declara ter analisado todas as modificações de código e caminhos dos arquivos (salvo códigos e arquivos gerados automaticamente) e declara que está tudo apropriado e o nível de qualidade de código no projeto não foi reduzido.

#### **Observações sobre o checklist**

- Deve ser marcado **APENAS** pelo **REVISOR** da task.
- O revisor deve antes de fazer o code review, verificar se todos os pontos da checklist "Antes do code review" estão feitos. Caso negativo, o revisor deve pedir que o responsável (assign) revise-as primeiro antes de prosseguir.
