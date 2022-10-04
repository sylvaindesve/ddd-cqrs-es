# Explicit Architecture

Le terme Explicit Architecture est proposé par [Herberto Graca](https://herbertograca.com/)
dans son excellent article [DDD, Hexagonal, Onion, Clean, CQRS, ... How I put it all together](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/).
Le schéma suivant est une vue d'ensemble de l'architecture qu'il décrit.

![Explicit Architecture](https://docs.google.com/drawings/d/e/2PACX-1vQ5ps72uaZcEJzwnJbPhzUfEeBbN6CJ04j7hl2i3K2HHatNcsoyG2tgX2vnrN5xxDKLp5Jm5bzzmZdv/pub?w=960&h=657)

Comme le précise la petite note en bas à gauche, il faut "tout comprendre mais n'utiliser que ce dont on a besoin.

Herberto propose également [une application exemple](https://github.com/hgraca/explicit-architecture-php)
qui suit ces principes. Dans la même veine, le [code](https://github.com/VaughnVernon/IDDD_Samples)
qui accompagne le livre [Implementing Domain-Driven Design](https://kalele.io/books/)
de [Vaughn Vernon](https://vaughnvernon.com/) donne également quelques pistes.

L'article d'Uncle Bob sur la [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
mérite également d'être lu.

J'ai également consulté les dépôts suivants :

- [ddd-by-examples/event-source-cqrs-sample](https://github.com/ddd-by-examples/event-source-cqrs-sample)
- [andreschaffer/event-sourcing-cqrs-examples](https://github.com/andreschaffer/event-sourcing-cqrs-examples)

Sur la base des travaux ci-dessus (principalement ceux d'Herberto Graca et de
Vaughn Vernon), voici une proposition personnelle de structuration du code.

- [commons](#commons)
  - application
  - domain
- [core](#core)
  - [components](#components)
    - component 1
      - application
      - domain
    - component 2
    - component 3
    - ...
  - [ports](#ports)
  - [sharedkernel](#shared-kernel)
- [infrastructure](#infrastructure)
- [presentation](#presentation)
  - UI 1
    - core
      - components
      - ports
    - infrastructure
  - UI 2
  - ...

## Commons

Cette partie du code est totalement optionnelle et doit rester minimale. Il
s'agit de bouts de code qui ont de grandes chances d'être souvent répétés donc
il peut être intéressant de les factoriser pour améliorer la lisibilité.
Il n'est pas obligatoire d'utiliser le code qui s'y trouve et il faut veiller à
ce qu'il ne se transforme pas en framework.

C'est la même idée que le projet `iddd_common` dans le code de Vaughn Vernon.

## Core

Le coeur de l'application réparti en composants, noyau partagé et ports.

### Components

Les différents composants de l'application, c'est-à-dire les Bounded Contexts.
Dans chaque composant on retrouve :
- la partie **aplication** qui correspond aux Use Cases (cf. [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html))
- la partie **domain** (ou métier) qui comportent les entités et règles métier

### Ports

Les ports qui devront être implémentés par des adaptateurs côté infrastructure.

### Shared Kernel

Le code d'application ou métier partagé entre les différents contextes. On
pourra par exemple y trouver les types représentant des identifiants métier.

## Infrastructure

L'ensemble des adaptateurs secondaires (pilotés) correspondant à
l'infrastructure.

## Presentation

La couche de présentation avec une ou plusieurs interfaces utilisateur et tout
le code associé. Ce sont les adaptateurs primaires (pilotant).
