# La couche Application

TODO

# Implémentation

Au cours de mes différentes lectures, j'ai repéré plusieurs d'implémenter les
services de la couche Application.

## Service

Un service sert de façade. Chaque méthode de ce service correspond à un Use
Case.

```mermaid
classDiagram
  class ShopService {
    +listItemsInCategory(categoryId)
    +buyItem(itemId, quantity)
    +cancelOrder(orderId)
  }
```

Même si cela n'est pas explicite dans cette implémentation, les différents Use
Cases sont bien soit des _commandes_, soit des _requêtes_.

## Service avec commandes et requêtes

Il s'agit d'une variation de l'implémentation précédente qui fait apparaître de
manière plus explicite les _commandes_ et _requêtes_.

```mermaid
classDiagram
  class ListItemsInCategory {
    +categoryId
  }
  class BuyItem {
    +itemId
    +quantity
  }
  class CancelOrder {
    +orderId
  }
  class ShopService {
    +listItemsInCategory(ListItemsInCategory query)
    +buyItem(BuyItem command)
    +cancelOrder(CancelOrder command)
  }
```

## Bus de commandes et bus de requêtes

Cette implémentation utilise un bus pour le traitement des commandes et
requêtes avec chaque `CommandHandler` ou `QueryHandler` représentant un Use
Case. Cette implémentation est plus complexe mais expose le bus comme un port,
ce qui permet d'en avoir plusieurs implémentations (en mémoire, avec un système
de messaging) et/ou de l'étendre avec des fonctionnalités supplémentaires
(logging, etc.).

```mermaid
classDiagram
  class Query {
    <<interface>>
  }

  class QueryHandler~Query~ {
    <<interface>>
    handle(Query query)
  }

  class Command {
    <<interface>>
  }

  class CommandHandler~Command~ {
    <<interface>>
    handle(Command command)
  }

  class ListItemsInCategory {
    +categoryId
  }
  Query <|-- ListItemsInCategory

  class ListItemsInCategoryQueryHandler {
    +handle(ListItemsInCategory query)
  }
  QueryHandler <|-- ListItemsInCategoryQueryHandler

  class QueryBus {
    <<interface>>
    +dispatch(Query query)
  }

  class BuyItem {
    +itemId
    +quantity
  }
  Command <|-- BuyItem

  class BuyItemCommandHandler {
    +handle(BuyItem command)
  }
  CommandHandler <|-- BuyItemCommandHandler

  class CancelOrder {
    +orderId
  }
  Command <|-- CancelOrder

  class CancelOrderCommandHandler {
    +handle(CancelOrder command)
  }
  CommandHandler <|-- CancelOrderCommandHandler

  class CommandBus {
    <<interface>>
    +dispatch(Command command)
  }
```

## Use Case

Cette implémentation fait apparaître de manière explicite les Use Cases.

```mermaid
classDiagram
  class UseCase~IRequest, IResponse~ {
    <<interface>>
    +execute(IRequest request) IResponse
  }

  class BuyItemRequest {
    +itemId
    +quantity
  }

  class BuyItemResponse {
    +cartId
  }

  class BuyItemUseCase {
    +execute(BuyItemRequest request) BuyItemResponse
  }
  UseCase <|-- BuyItemUseCase
```
