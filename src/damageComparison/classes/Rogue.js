export class Rogue {
  constructor(enemyAc, level, options) {
    this.level = level;
    this.advantageAttackOne = false;
    this.advantageAttackTwo = false;
    this.isRanged = !!options?.isRanged;
    this.hasSharpshooter = !!options?.hasSharpshooter;
    this.hasSneakAttack = !!options?.hasSneakAttack;
    this.attackModifier = 5;
    this.proficiency = 5;
    this.toHit = this.attackModifier + this.proficiency;
    this.otherAttackMods = 2;
    this.addedOneTimeAttackDamage = 0;
    this.weaponDamage = 4.5;
    this.enemyAc = enemyAc;
  }

  getTotalDamage() {
    let totalDamage = 0;
    this.applySharpshooter();
    this.applySneakAttack();
    totalDamage += this.getExpectedAttackDamage("ADVANTAGE");

    return totalDamage;
  }

  getExpectedAttackDamage(advantage) {
    let damage = 0;
    if (!this.hasExtraAttack) {
      damage =
        (this.weaponDamage +
          this.attackModifier +
          this.addedOneTimeAttackDamage) *
        this.getChanceToHit(advantage);
    } else {
      damage =
        2 *
          (this.weaponDamage + this.attackModifier) *
          this.getChanceToHit(advantage) *
          (1 - this.getChanceToHit(advantage)) +
        (2 * (this.weaponDamage + this.attackModifier) +
          this.addedOneTimeAttackDamage) *
          Math.pow(this.getChanceToHit(advantage), 2);
    }

    return damage;
  }

  getChanceToHit(advantageType) {
    switch (advantageType) {
      case "ADVANTAGE":
        return (
          2 * this.getChanceToHit() * (1 - this.getChanceToHit()) +
          Math.pow(this.getChanceToHit(), 2)
        );
      default:
        return 1 - (this.enemyAc - 1 - this.toHit - this.otherAttackMods) / 20;
    }
  }

  applySharpshooter() {
    if (this.hasSharpshooter) {
      this.weaponDamage += 10;
      this.toHit -= 5;
    }
  }

  applySneakAttack() {
    if (this.hasSneakAttack) {
      this.addedOneTimeAttackDamage += Math.ceil(this.level / 2) * 3.5;
    }
  }
}
