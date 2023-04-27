# Casos de uso
Classes responsáveis pelo consumo dos recursos da Hypnos API ou qualquer outro recurso externo. Exemplo: Acesso as rotas de líder

```typescript
class LeaderService{
    login(/**/) {
        // Chamada a API via Axios
    }

    create(/**/) {
        // Chamada a API via Axios
    }
}
```

Criamos essas classes de serviço para serem utilizadas por um **caso de uso** e não diretamente em um 
componente.

```typescript
const fetchAllUsersUC = new FetchAll(new UserService())
```