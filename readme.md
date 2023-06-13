# Mise en place du backend

Une fois le repo cloné ave `git clone https://github.com/CelienFiorelli/CommandProjectAPI.git`
Faire un `npm i` pour récuperer toute les dépendances du projets

## Variable

Créer le fichier `config.json` à la racine du projet
Puis mettre la variable de connection suivante dedans pour utiliser ma base de données
```
{
    "connectString": "mongodb+srv://fio:kkj40VPeagkJjiCd@cluster0.i2hkxwm.mongodb.net/test?retryWrites=true&w=majority"             
}
```

##  Information

Il y a déjà quelque donnée dedans notamment le compte admin par default qui est `admin@admin.fr:admin`

## Lancement du projet

Pour le lancer, utiliser `npm run start:dev`
