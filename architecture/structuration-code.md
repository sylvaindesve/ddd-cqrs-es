# Structuration du code

## Backend

Nous souhaitons structurer le code de façon à mettre en évidence les principes
de l'[Explicit Architecture](./explicit-architecture.md).

Nous souhaitons également que l'architecture de l'application transparesse à la
lecture de la structure du code [tel que le décrit Uncle Bob](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html).

Les codes sources suivants ont été source d'inspiration :
- [Explicit Architecture PHP](https://github.com/hgraca/explicit-architecture-php)
  par l'auteur du terme *Explicit Architecture*
- le [code](https://github.com/VaughnVernon/IDDD_Samples)
  qui accompagne le livre [Implementing Domain-Driven Design](https://kalele.io/books/)
  de [Vaughn Vernon](https://vaughnvernon.com/)
- [ddd-by-examples/event-source-cqrs-sample](https://github.com/ddd-by-examples/event-source-cqrs-sample)
- [andreschaffer/event-sourcing-cqrs-examples](https://github.com/andreschaffer/event-sourcing-cqrs-examples)
- [stemmlerjs/white-label](https://github.com/stemmlerjs/white-label)

Voici donc une proposition personnelle de structuration du code pour le
backend :

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

### Commons

Cette partie du code est totalement optionnelle et doit rester minimale. Il
s'agit de bouts de code qui ont de grandes chances d'être souvent répétés donc
il peut être intéressant de les factoriser pour améliorer la lisibilité.
Il n'est pas obligatoire d'utiliser le code qui s'y trouve et il faut veiller à
ce qu'il ne se transforme pas en framework.

C'est la même idée que le projet `iddd_common` dans le code de Vaughn Vernon.

### Core

Le coeur de l'application réparti en composants, noyau partagé et ports.

#### Components

Les différents composants de l'application, c'est-à-dire les Bounded Contexts.
Dans chaque composant on retrouve :
- la partie **aplication** qui correspond aux Use Cases (cf. [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html))
- la partie **domain** (ou métier) qui comportent les entités et règles métier

#### Ports

Les ports qui devront être implémentés par des adaptateurs côté infrastructure.

#### Shared Kernel

Le code d'application ou métier partagé entre les différents contextes. On
pourra par exemple y trouver les types représentant des identifiants métier.

### Infrastructure

L'ensemble des adaptateurs secondaires (pilotés) correspondant à
l'infrastructure.

## Presentation

La couche de présentation avec une ou plusieurs interfaces utilisateur et tout
le code associé. Ce sont les adaptateurs primaires (pilotant).
