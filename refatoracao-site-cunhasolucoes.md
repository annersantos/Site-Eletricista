# Plano de Refatoração — Site Cunha Soluções

## Objetivo
Refatorar e modernizar integralmente o site da Cunha Soluções, transformando-o em uma One Page institucional moderna, acessível, de alta conversão, responsiva e com tema claro, mantendo a identidade visual do logo (vermelho carmim, azul elétrico, grafite e toques dourados) e os dados de contato do `info.txt`.

## Fases de Execução

### Fase 1: Análise e Estruturação de Ativos
- Copiar e preparar logo oficial da empresa em `assets/images/logo-cunha-solucoes.png`.
- Gerar imagens profissionais em alta definição para o segmento elétrico (Hero, Residencial, Comercial, Quadro Elétrico e Iluminação).
- Criar a estrutura limpa de diretórios do projeto estático (`assets/css`, `assets/js`, `assets/images`).

### Fase 2: Design System e Estilos Base
- Definir paleta de cores institucional com variáveis CSS e Tailwind CSS:
  - Primária: Vermelho Cunha Soluções (`#dc2626` / `#b91c1c`)
  - Acento Técnico: Azul Elétrico (`#0284c7` / `#0ea5e9`)
  - Neutros: Branco Puro (`#ffffff`), Fundo Suave (`#f8fafc` / `#f1f5f9`), Grafite Textos (`#0f172a` / `#334155`)
  - Acento Dourado/Alerta: Âmbar (`#d97706` / `#f59e0b`)
  - WhatsApp: Verde Oficial (`#16a34a` / `#22c55e`)
- Tipografia moderna e legível via Google Fonts (Outfit / Plus Jakarta Sans).
- Suporte nativo a `prefers-reduced-motion` e transições suaves.

### Fase 3: Desenvolvimento do HTML5 Semântico e Estrutura One Page
- Header fixo com efeito de vidro (blur), logo, navegação por âncoras e botão de orçamento.
- Menu mobile responsivo com drawer acessível e botão de ação rápida.
- Hero Section impactante com chamada clara, badges de confiança, formulário/CTA rápido e elemento visual elétrico refinado.
- Seção Sobre a Empresa com dados reais de atuação em SP.
- Seção de Serviços Residenciais ampliada (novos pontos, quadros, iluminação, reformas, chuveiros/equipamentos, defeitos).
- Seção de Serviços Comerciais (lojas, escritórios, manutenções, iluminação comercial).
- Seção de Diferenciais (segurança NBR 5410, pontualidade, transparência, orçamento sem surpresas).
- Seção "Como Funciona" em 4 passos interativos.
- Vitrine de Soluções com cards visuais de alta definição.
- Seção de Depoimentos com prova social estruturada.
- FAQ com accordion acessível em JavaScript puro.
- Formulário de Orçamento avançado com pré-formatação de WhatsApp e validação completa sem backend.
- CTA Final de Conversão.
- Footer completo com todos os dados de endereço, telefones, redes sociais e copyright.
- Botão flutuante de WhatsApp com badge de status.

### Fase 4: Lógica JavaScript Interativa e Otimizações
- Validação do formulário e disparo da mensagem pré-formatada para o WhatsApp `(11) 9090-9090`.
- Máscara automática de telefone/WhatsApp `(XX) XXXXX-XXXX`.
- Accordion acessível do FAQ (controle por teclado e ARIA).
- Navegação fluida por âncoras (smooth scroll) com fechamento automático do menu mobile.
- Revelação sutil de elementos via IntersectionObserver.
- Header com mudança visual ao rolar a página.

### Fase 5: SEO, Acessibilidade e Metadados
- Metatags de SEO para São Paulo e região metropolitana (instalações elétricas, eletricista residencial e comercial).
- Open Graph e Twitter Cards completos.
- Dados estruturados Schema.org (`LocalBusiness` / `Electrician`).
- Rótulos e atributos ARIA para leitores de tela e navegação por teclado.

### Fase 6: Auditoria, Testes e Verificação
- Executar scripts de auditoria de acessibilidade (`accessibility_checker.py`), UX (`ux_audit.py`), mobile (`mobile_audit.py`) e SEO (`seo_checker.py`).
- Testar visualmente no navegador com o subagente de browser (telas desktop e mobile, abertura de menu, expansão de accordion, preenchimento e envio de formulário).
- Corrigir qualquer apontamento e garantir acabamento de nível premium.
