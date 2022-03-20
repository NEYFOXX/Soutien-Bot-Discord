# Soutien-Bot-Discord

## Configuration
- Aller dans le fichier `config.js` et modifier ce qu'il y a à modifier

- Aller dans le fichier `structures/client/index.js` et aller à la ligne **21**

- Modifier `password` par votre mot de passe mysql | Modifier `database` par le nom de votre database

- Aller sur Mysql Workbench / HeidiSQL et aller sur votre base de donnée que vous avez renseigné juste avant

- Créer les tables `settings` et `soutien`

- Ajouter les colonnes suivantes à la table `settings` : serverid - (type : VARCHAR | length : 18 ou 25 à mettre en PRIMARY KEY) || prefix (type : VARCHAR | length : 5)

- Ajouter les colonnes suivantes à la table `soutien` : guildId - (type : VARCHAR | length : 18 ou 25 à mettre en PRIMARY KEY) || role (type : VARCHAR | length : 18 ou 25) || status - (type : VARCHAR | length : 50) || soutien (type : VARCHAR | length : 10)


## BONNE UTILISATION
