# Casos de uso
Classes que representam um caso de uso do sistema. Essas classes devem receber todas as depedências 
via construtor e devem implementar um único método: `execute()`. Exemplo: **Fazer login** é um caso de uso que irá virar uma classe como

```typescript
class Login{
    // Recebe uma classe de serviço de acesso aos recursos de usuário via Hypnos API
    constructor(private readonly userService: UserService){}

    execute(registration: stirng, password: string): Promise<UserAuthenticated>{
        // Realiza a implementação do caso de uso
    }
} 
```

As classes de caso de uso que serão chamadas dentro dos componentes do React.js

```tsx
const LoginPage = () => {
    const loginUC = new Login(new UserService()) // Cria o objeto de caso de uso pra ser utilizado no componente
    // ... 
}
```