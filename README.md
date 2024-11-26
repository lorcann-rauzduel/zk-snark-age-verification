# 🔒 ZK-SNARK Age Verification

## 📋 Description du Projet

Implémentation d'un simple mécanisme de vérification d'âge utilisant des preuves à divulgation nulle de connaissance (ZK-SNARK) pour la validation d'identité préservant la confidentialité.

## 🛠 Technologies utilisées

- **Circom 2.1.4** : Langage de conception de circuits pour ZK-SNARK
- **Solidity ^0.8.0** : Développement de contrats intelligents
- **Hardhat** : Environnement de développement Ethereum
- **CircomLib** : Bibliothèque de composants pour circuits ZK
- **Ethereum** : Blockchain cible du projet

## 🏗 Architecture du Système

### 1. Circuit Circom (`circuits/commit.circom`)

- Implémentation logique de la vérification d'âge
- Utilisation du comparateur GreaterThan pour validation
- Génération de preuves cryptographiques

### 2. Contrat de Vérification (`contracts/AgeVerifier.sol`)

- Contrat généré automatiquement via snarkJS
- Validation des preuves ZK-SNARK
- Vérification cryptographique embarquée

### 3. Contrat Passerelle (`contracts/AgeGateway.sol`)

- Interface principale pour les interactions utilisateur
- Gestion des requêtes de vérification
- Stockage sécurisé des résultats de vérification

## 🚀 Installation

### Prérequis

1. **Rust** (pour compiler Circom)

```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

2. **[Node.js](https://nodejs.org/)** (v16+ recommandée)

### Installation de Circom

1. Cloner et compiler Circom :

```bash
git clone https://github.com/iden3/circom.git
cd circom
cargo build --release
cargo install --path circom
```

2. Vérifier l'installation :

```bash
circom --version
```

### Installation de snarkjs

```bash
npm install -g snarkjs
```

### Installation du projet

1. Cloner le repository :

```bash
git clone [URL_DU_REPO]
cd age-verifier-zk
```

2. Installer les dépendances :

```bash
pnpm install
```

3. Compiler le circuit :

```bash
# Compilation du circuit
circom circuits/commit.circom --r1cs --wasm --sym

# Génération de la trusted setup
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution"
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau
snarkjs groth16 setup commit.r1cs pot12_final.ptau commit_0000.zkey
snarkjs zkey contribute commit_0000.zkey commit_0001.zkey --name="1st Contributor"
snarkjs zkey export verificationkey commit_0001.zkey verification_key.json
```

4. Compiler les contrats Solidity :

```bash
npx hardhat compile
```

### 📚 Documentation Utile

- [Documentation Circom 2](https://docs.circom.io/)
- [Documentation snarkjs](https://github.com/iden3/snarkjs)
- [Documentation Hardhat](https://hardhat.org/docs)
- [ZK-SNARKs Expliqués](https://docs.circom.io/background/background/)

### 🔍 Structure des Fichiers

```
.
├── circuits/
│   └── commit.circom      # Circuit de vérification d'âge
├── contracts/
│   ├── AgeGateway.sol     # Interface principale
│   └── AgeVerifier.sol    # Vérificateur généré
├── test/
│   └── age.test.js        # Tests
└── scripts/
    └── deploy.js          # Script de déploiement
```

## 🧪 Tests

Exécuter la suite de tests :

```bash
npx hardhat test
```

## 💻 Utilisation

### Génération de Preuve

```typescript
const { proof, publicSignals } = await generateProof({
  age: 22, // Âge à prouver
});
```

### Vérification sur la Blockchain

```typescript
await ageGateway.verify(
  [proof.pi_a[0], proof.pi_a[1]],
  [
    [proof.pi_b[0][1], proof.pi_b[0][0]],
    [proof.pi_b[1][1], proof.pi_b[1][0]],
  ],
  [proof.pi_c[0], proof.pi_c[1]],
  publicSignals
);
```

## 🔐 Sécurité

- Aucune donnée personnelle n'est exposée
- Preuves cryptographiquement vérifiables
- Protection contre les attaques par rejeu

## 📜 Licence

[Spécifiez votre licence, par exemple MIT]

## 🤝 Contributions

Les contributions sont les bienvenues ! Merci de consulter `CONTRIBUTING.md` pour plus de détails.

## 📞 Contact

[Vos informations de contact ou lien vers votre profil]
