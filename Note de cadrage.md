## **TABLE DES MATIÈRES**
1. [Sommaire](#1-sommaire)
2. [Questions](#2-questions)
3. [MVP](#3-MVP)
4. [Risques Majeurs et Mitigation](#4-Risques-Majeurs-et-Mitigation)
5. [Approche](#5-Apporche)
6. [Bonus](#6-Bonus)

## 1. Sommaire

### 1.1 Vision du produit :
L'application vise à rendre accessible, au plus grand nombre d'utilisateur, la gestion administrative des documents de chaque citoyen en y ajoutant une couche de gamification pour rendre plus ludique certaine tâche qui à ce jours est beaucoup trop pénible.
### 1.2 Objectifs :
	1. Connexion via FranceConnect
	2. Démarche administrative
	3. Gamification
### 1.3 Proposition de valeur : 
L’application a pour ambition de démocratiser la gestion administrative des documents personnels en la rendant simple et accessible à tous. Elle intègre une couche de gamification afin de transformer certaines tâches, aujourd’hui perçues comme fastidieuses, en activités plus engageantes et motivantes pour l’utilisateur.

## 2. Questions :

| Question                                                                                                                | Justification                                                                                                                                                                                                                                       | Impact       |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| Quel est le budget exact alloué au projet (développement initial, maintenance annuelle, infrastructure) ?               | Le document mentionne des contraintes budgétaires "limitées" et un déploiement par phases, mais aucun chiffre concret n'est fourni. Sans budget défini, impossible d'estimer la faisabilité technique et l'ampleur des fonctionnalités réalisables. | **Critique** |
| Quelles administrations spécifiques seront intégrées lors du pilote de 6 mois et quelles APIs sont déjà disponibles ?   | Le document évoque des "partenariats avec certaines administrations" et une "intégration avec l'écosystème administratif" mais sans préciser lesquelles ni l'état de leurs APIs.                                                                    | Critique     |
| Quelle est la taille réelle et la composition de l'équipe (actuellement entre 5-15 personnes) ?                         | L'équipe varie du simple au triple, ce qui change radicalement la capacité de production. Le document ne précise pas les rôles actuels ni les recrutements prévus.                                                                                  | Majeur       |
| Quel modèle de récompenses concrètes est envisagé au-delà des badges virtuels ?                                         | Le document mentionne des "récompenses personnalisées" et "avantages spécifiques" mais reste vague. S'agit-il de réductions chez des partenaires, de priorité dans certaines files, d'avantages symboliques uniquement ?                            | Majeur       |
| Quels sont les critères de succès mesurables du projet (KPIs, taux d'adoption cible, taux d'achèvement des démarches) ? | Le document évoque des objectifs qualitatifs (améliorer l'engagement, réduire les abandons) mais aucune métrique quantitative n'est définie pour mesurer le succès.                                                                                 | Majeur       |
| Comment sera gérée la conformité RGPD pour les données de gamification (scores, classements, badges) ?                  | Le document évoque le RGPD mais ne détaille pas comment les données de gamification (potentiellement sensibles car révélant les démarches effectuées) seront traitées, notamment pour le droit à l'oubli et les classements publics.                | Majeur       |
| Quelle est la stratégie de gestion du multi-tenant prévu dès les phases 13-24 mois ?                                    | Le document mentionne une architecture multi-tenant mais ne précise pas si elle doit être anticipée dès la conception initiale ou ajoutée plus tard. Cela change radicalement l'architecture technique de base.                                     | Majeur       |
| Quel est le périmètre exact des démarches administratives couvertes par le MVP ?                                        | Le document liste de nombreuses fonctionnalités (niveaux, badges, quêtes, assistant IA) mais ne précise pas quelles démarches administratives concrètes seront gamifiées en priorité (impôts, état civil, emploi, etc.).                            | Majeur       |
| Quel niveau d'autonomie auront les administrations partenaires dans la configuration de leur espace gamifié ?           | Le document évoque un système multi-tenant mais ne précise pas si chaque administration peut créer ses propres quêtes, badges, récompenses, ou si tout est centralisé.                                                                              | Moyen        |
| Comment sera assurée la maintenance 24/7 mentionnée avec une équipe de 5-15 personnes et un budget limité ?             | Le document stipule une disponibilité de 99,5% et une maintenance continue 24/7, mais avec une petite équipe et un budget contraint, cela semble difficilement réalisable sans externalisation.                                                     | Moyen        |
|                                                                                                                         |                                                                                                                                                                                                                                                     |              |
| Quel est le modèle économique de l'application ?                                                                        | Dans les réponses fourni il est déclarer "mois premium offfert" avec les Tampoints.                                                                                                                                                                 | Moyen        |
| Quel sera le montant des abonnements ?                                                                                  | Aucun prix d'abonnement n'a été indiqué dans les documents.                                                                                                                                                                                         | Moyen        |
| Quelles seront les fonctionnalités supplémentaires en tant que premium ?                                                | Aucun fonctionnalité premium n'a été indiqué dans les documents.                                                                                                                                                                                    | Moyen        |
|                                                                                                                         |                                                                                                                                                                                                                                                     |              |
 
## 3. MVP
### 3.1 Fonctionnalités : 
	1.Authentification FranceConnect
	2.Démarche administrative
	3.Gamification
	4.Compte Administrateur
	5.Personnalisation de son compte

### 3.2 Matrice :

| Fonctionnalité                 | Effort | Valeur | Zone           |
| ------------------------------ | ------ | :----- | -------------- |
| Authentification FranceConnect | Haut   | Forte  | Priorité haute |
| Démache administrative         | Haut   | Forte  | Priorité haute |
| Gamification                   | Moyen  | Moyen  | À arbitrer     |
| Espace Administrateur          | Haut   | Forte  | Priorité haute |
| Personnalisation de son compte | Faible | Faible | À discuter     |
### 3.3 Timeline : 
#### 3.3.1 Sprint 1 (10 semaines) :
 1. Setup technique (1 semaine)
 2. FranceConnect (2 semaines). 
 3. Récupération des démarches administrative de l'utilisateur sur son espace (4 semaines).
 4. Personnalisation des données du compte utilisateur (1 semaine).
 5. Démarche #1 : Changement d'adresse (2 semaines)
#### 3.3.2 Sprint 2 (6 semaines):
1. Architecture Démarches Admin (2 semaines).
2. Système XP et Niveaux (1 semaines).
3. Système de Badges (1 semaines).
4. Système de Quêtes (2 semaines).
#### 3.3.3 Sprint 3 (8 semaines):
1. Intégration Gamification ↔ Démarches (2 semaines).
2. Backoffice Admin (2 semaines).
### 3.4 V2
	1. Assitant intelligent
	2. Groupe d'entraide
	3. Classement des utilisateurs
## 4. Risques Majeurs et Mitigation

1. **Exclusion numérique :**
	En gamifiant les démarches administratives, risque de créer un système à deux vitesses où :
	- Les citoyens à l'aise avec le numérique sont récompensés, progressent rapidement, et ont une expérience fluide.
	- Les citoyens en difficulté numérique (seniors) sont **pénalisés, exclus ou découragés**.
	**Scénario concret :** Marie (34 ans, enseignante) gagne des badges, monte en niveau, accède à des récompenses et des services facilités. Jean-Pierre (67 ans, retraité) : 
	- Ne comprend pas les mécaniques de jeu
	- Se sent infantilisé par le système de badges
	- Abandonne la plateforme et doit faire 50km pour aller en préfecture
	- Ressent une **discrimination générationnelle**
	
	**Plan de mitigation :**
	 1. **Mode "Simplifié"**
	    - Désactivation TOTALE des mécaniques de gamification au choix de l'utilisateur
	    - Interface classique sans badges/niveaux/points
	    - Guidage pas-à-pas textuel classique
	    - Accès à toutes les fonctionnalités sans gamification
	 2. **Tests utilisateurs diversifiés AVANT le lancement**
	    - Minimum 30% de testeurs +60 ans
	    - 20% en zone rurale ou périurbaine
	    - 15% de personnes en situation de handicap
	    - 10% de personnes en situation de précarité
	
2. **Résistance des Agents Administratifs**
	Le cahier des charges se concentre à 95% sur les citoyens, mais **ce sont les agents administratifs qui vont faire ou défaire l'adoption**.
	1. **Peur du changement**
		- Ils maîtrisent les processus actuels
		- Peur de l'obsolescence
		- Charge de travail supplémentaire pendant la transition
	2. **Méfiance envers la gamification**
		- Perception d'infantilisation du service public
		- Crainte de décrédibilisation de leur métier
	
	**Plan de mitigation :**
	Transformer les agents en bénéficiaires, pas en victimes
	1. **Tableau de bord agent "Gain de temps"**
		- Affichage du temps gagné grâce à l'automatisation
		- Valorisation de leur nouveau rôle : conseil plutôt qu'administratif
	2. **Alléger leur charge, pas l'augmenter**
	    - Automatisation des tâches répétitives qu'ils détestent
	    - Leur libérer du temps pour l'accompagnement humain
	    - Preuve concrète : mesure de la charge de travail avant/après

## 5. Approche
1. **Méthodologie suggérée** 
	1. Agile :
		La méthode agile est une **méthode de gestion de projet**. L’idée, lorsque l’on utilise cette approche, est d’apporter souplesse et performance à la gestion de projet. Centrée sur l’humain et la communication, elle **permet aux clients de participer au développement d’un produit** tout au long de l’avancement du projet.
2. **Équipe minimale** requise
	1. Un lead développeur
	2. Un product Owner
	3. 4 développeurs full-stack
	4. 1 devOps
	5. 1 QA/testeur
3. **Quick wins** 
		
4. **Next steps**
	

## 6. Bonus
