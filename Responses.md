
## 1. Budget exact alloué au projet (**Critique**)

**Budget développement initial :** Nous avons levé 500K€ en pré-seed (mars 2024) auprès de Bpifrance (300K€) et business angels (200K€). Environ 60% de ce budget est alloué au développement initial.

**Maintenance annuelle :** Nous préparons une levée Seed de 2M€ (Q4 2024) dont 30% sera alloué à la maintenance et l'infrastructure.

**Infrastructure :** Budget cloud prévu : ~5-8K€/mois en année 1 avec scaling prévu.

Je sais que ce n'est pas énorme, c'est pourquoi nous insistons sur un déploiement par phases et une approche pragmatique.

## 2. Administrations intégrées lors du pilote (**Critique**)

**Administrations confirmées pour le pilote :**
- **FranceConnect** : POC technique validé, convention en cours de signature
- **API Particulier** : accès bac à sable obtenu, production prévue Q3 2024

**Administrations en discussion (pas d'engagement formel) :**
- DGFIP : réunions exploratoires en cours

**État des APIs :** FranceConnect et API Particulier ont des APIs bien documentées et fonctionnelles. C'est sur ces deux-là que nous basons notre pilote de 6 mois.

## 3. Taille et composition de l'équipe (**Majeur**)

**Équipe actuelle : 7 personnes**
- 2 co-fondateurs (CEO/CTO)
- 3 développeurs full-stack
- 1 UX/UI designer
- 1 business developer

Nous recrutons 2 développeurs supplémentaires dans les 3 prochains mois. L'équipe devrait être à 9-10 personnes d'ici le lancement du pilote.

## 4. Modèle de récompenses concrètes (**Majeur**)

**Je dois être honnête : PAS d'avantages administratifs réels** (impossible légalement - égalité devant le service public).

**Récompenses concrètes :**
- **Shop in-app avec Tampoints :**
  - Skins pour BureauBot (100-500 Tampoints)
  - Badges décoratifs (200-1000 Tampoints)
  - Mois premium offerts (5000 Tampoints)
  - **Donations à des associations** (conversion 1 Tampoint = 0.01€)

**Important :** Pas d'achat de Tampoints avec argent réel (raison éthique). Les avantages sont purement symboliques/cosmétiques.

## 5. Critères de succès mesurables (KPIs) (**Majeur**)

**KPIs Phase Pilote (6 mois) :**
- Taux d'adoption : 10,000 utilisateurs actifs
- Taux d'achèvement des démarches : > 75% (vs ~50% actuellement)
- NPS (Net Promoter Score) : > 40
- Temps moyen de complétion : -30% vs processus classique

**KPIs Année 1 :**
- 50,000 utilisateurs actifs mensuels
- Taux de rétention 30 jours : > 40%
- Disponibilité plateforme : 99.5%

## 6. Conformité RGPD pour les données de gamification (**Majeur**)

**Stratégie RGPD :**
- **Scores/badges :** Pseudonymisation immédiate pour analytics
- **Classements publics :** Opt-in uniquement, pseudonymes obligatoires (pas de vrais noms)
- **Droit à l'oubli :** Suppression complète des données sur demande (processus automatisé en 48h)
- **Conservation :** 
  - Documents fiscaux : 4 ans (légal)
  - Autres documents : 1 an par défaut
  - Données gamification : suppression après 90 jours d'inactivité

**Anonymisation analytics :** Differential privacy avec minimum 10 utilisateurs par cohorte.

## 7. Stratégie multi-tenant (**Majeur**)

**Réponse claire : Architecture multi-tenant DÈS LA CONCEPTION INITIALE**

C'est critique pour notre modèle économique. Chaque administration doit avoir :
- Son propre espace isolé
- Ses configurations de badges/quêtes
- Ses données cloisonnées

**Timeline :** Infrastructure multi-tenant en Phase 1 (même si un seul tenant actif), déploiement multi-administrations en Phase 2 (mois 13-24).

## 8. Périmètre exact des démarches du MVP (**Majeur**)

**MVP (6 mois) - Démarches prioritaires :**
- Changement d'adresse (toutes administrations)
- Demande/renouvellement carte d'identité
- Déclaration impôts (assistance, pas traitement)
- Inscription Pôle Emploi

**Pourquoi ces 4 ?** Elles sont fréquentes, bien documentées, et les APIs sont disponibles ou en cours.

## 9. Autonomie des administrations partenaires (**Moyen**)

**Phase 1 (Pilote) :** Configuration centralisée par notre équipe

**Phase 2 (Mois 13-24) :** Interface admin permettant :
- Création de badges personnalisés
- Configuration de quêtes spécifiques
- Paramétrage des récompenses
- Dashboard analytics

**Limites :** Gamification de base (niveaux, XP) reste standardisée pour cohérence.

## 10. Maintenance 24/7 avec équipe limitée (**Moyen**)

**Je vais être franc : c'est ambitieux avec notre taille d'équipe.**

**Notre stratégie :**
- **Monitoring automatisé** : alertes critiques seulement
- **Astreintes** : rotation 2 développeurs par semaine
- **Support tier 1** : externalisation prévue (prestataire spécialisé)
- **SLA réaliste** : 99.5% (soit ~43h de downtime/an acceptables)
- **Heures bureau** : Support complet 9h-18h en semaine
- **Nuits/weekends** : Support critique uniquement

Nous prévoyons un contrat avec Orange Business Services pour le support infrastructure.
