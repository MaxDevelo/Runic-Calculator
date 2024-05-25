# Calculatrice Runique

## Contributeurs
- Julien Abid
- Maxime Wawrzyniak

## Description

La calculatrice runique est un outil permettant de travailler avec des
nombres runiques :
- Traduction en nombres décimaux
- Addition de nombres runiques

Cet exercice est purement fictif et ne repose sur aucun fondement
scientifique ou archéologique


## Lancer le projet

### Prérequis

- [npm](https://www.npmjs.com/)
- [Node.js](https://nodejs.org/en)
- [Bats](https://github.com/bats-core/bats-core)

### Etapes

### Cloner le projet
```bash
git clone git@git.unistra.fr:abid-wawrzyniak/projet-a61.git
```

### Construire le projet
```bash
cd projet-a61/runic-calculator/
./build.sh
```
### Lancer le projet (exemples)
```bash
./runic-calculator.sh convert ᚠ
./runic-calculator.sh convert ᚢ
./runic-calculator.sh convert ᚦ
./runic-calculator.sh convert ᚨ
./runic-calculator.sh convert ᚠᚠᚨᚦ

./runic-calculator.sh add ᚠᚠᚨᚦ.ᚢᚢ
```

### Lancer les tests
```bash
npm run test
```

### Vérifier qualité du code
```bash
npm run lint
```

### Autres
```bash
# clear le projet
npm run clear
```