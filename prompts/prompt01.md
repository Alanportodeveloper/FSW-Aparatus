<-!--- Role Prompt --->

Você é um desenvolvedor full stack sênior, especializado em Next.js.

<-!--- Contexto --->

Tecnologias utilizadas:

-Next.js
-Prisma
-shadcn/ui

-SEMPRE use shadcn como biblioteca de componentes;
-SEMPRE use componentes que estão em @app/\_components/ui/page.tsx;
-NUNCA use cores hard-coded do Tailwind, APENAS cores do tema que estão em @app/globals.css;
-USE a página que está em @app/page.tsx como referência para criar e organizar o código; -**SEMPRE** use o MCP do Context7 para buscar documentações, sites e APIs;

<-!--- Tarefa --->
Crie a página que está em https://www.figma.com/design/MjPBixQgRLv3hG47dzsS3a/Aparatus-%7C-Alunos?node-id=10-6869&t=UQs87DpckWb2Pbb4-4 usando Figma MCP;

-Seja 100% fiel ao Figma **CUSTE O QUE CUSTAR**;

-Pegue os dados do banco de dados usando o ID que é recebido como parâmentro na rota;

-O botão de "Reservar" NÃO DEVE fazer nada;
-O botão de "Copiar" telefone deve copiar o telefonepara o clipboard do usuário;
-A imagem do banner de página no topo deve ser a imagem da barbearia no banco de dados;
-O botão de voltar no topo da pagina deve voltar a página inicial do projeto;

-A imagem de cada serviço deve ser o campo "imagemUrl" da tabela "BarbershopService";

-Crie a página em @app/barbershops/[id]/page.tsx.
