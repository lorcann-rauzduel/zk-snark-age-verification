# ZK-SNARK Age Verification

## Description

Implémentation d'un simple mécanisme de vérification d'âge utilisant des preuves à divulgation nulle de connaissance (ZK-SNARK) pour la validation d'identité.

## Installation

### Prérequis

1. **Rust** (pour compiler Circom)

```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

2. **[Node.js](https://nodejs.org/)** (v16+ recommandée)

### Installation

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

1. Cloner le repository

```bash
git clone https://github.com/lorcann-rauzduel/zk-snark-age-verification.git
```

2. Installer les dépendances :

```bash
pnpm install
```

3. Compiler le circuit :

```bash
# Compilation du circuit
pnpm compile

# Génération de la trusted setup
pnpm trusted-setup

# Contribution à la trusted setup
pnpm contribute
```

4. Lancer les tests

```bash
npx hardhat test
```

## Utilisation

### Génération de preuve

```typescript
const { proof, publicSignals } = await generateProof({
  age: 22, // Âge à prouver
});
```

### Vérification sur la blockchain

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

### Ressources utiles

- [Documentation Circom 2](https://docs.circom.io/)
- [Documentation snarkjs](https://github.com/iden3/snarkjs)
