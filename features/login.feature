language: pt

Funcionalidade: Login
    Como um usuário cadastrado
    Quero acessar minha conta
    Para poder utilizar o sistema fornecido

    Contexto:
        Dado que o usuário está na página de login

    Cenário: Login bem-sucedido
        Dado que o usuário "user" que está cadastrado com a senha "user123"
        Quando o usuário tenta fazer login com as credenciais corretas
        Então o sistema deve permitir o acesso e entrar no sistema
    
    Cenário: Tentativa de Login usuário incorreto ou senha incorreta
        Dado um usuário qualquer que não esteja cadastrado ou com senha incorreta
        Quando o usuário tenta fazer login com as credenciais incorretas (usuário ou senha)
        Então o sistema deve negar o acesso e exibir uma mensagem de erro indicando que as credenciais estão incorretas
    
    Cenário: Usuário bloqueado após múltiplas tentativas de login falhadas
        Dado um usuário "user" que está cadastrado com a senha "user123"
        E o usuário tenta fazer login com credenciais incorretas por 5 vezes consecutivas
        Quando o usuário tenta fazer login novamente com as credenciais corretas
        Então o sistema deve negar o acesso e exibir uma mensagem indicando que a conta está bloqueada devido a múltiplas tentativas de login falhadas
    
    Cenário: Login com campos obrigatórios vazios
        Dado um usuário que tenta fazer login sem preencher todos os campos obrigatórios
        Quando o usuário tenta realizar o login
        Então o sistema deve negar o acesso e exibir uma mensagem de erro indicando que os campos obrigatórios não foram preenchidos
    
    Cenário: Usuário esqueceu a senha e solicita recuperação
        Dado um usuário "user" que está cadastrado com a senha "user123"
        E o usuário esqueceu a senha
        Quando o usuário solicita a recuperação de senha
        E insere as credenciais de recuperação corretas
        E insere uma nova senha "nova_senha123"
        Então o sistema deve permitir a recuperação da senha e atualizar a senha do usuário para "nova_senha123"
    
    Cenário: Login com SQL injection
        Dado um usuário mal-intencionado que tenta realizar um ataque de SQL injection no campo de login, inserindo " OR '1'='1 "
        Quando o usuário insere um código malicioso no campo de login e tenta fazer login
        Então o sistema deve sanitizar a entrada 
        E negar o acesso e exibir uma mensagem de erro indicando que as credenciais estão incorretas
    
    Cenário: Usuário insere espaços em branco no campo de login
        Dado um usuário "user" com senha "user123"
        Quando o usuário tenta realizar o login inserindo espaços em branco ao redor " user " no campo de login
        E insere a senha também com espaços em branco " user123 "
        Então o sistema deve negar o acesso e exibir uma mensagem de erro indincando que as credenciais estão inválidas