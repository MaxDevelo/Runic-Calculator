import { Rune } from "../Runes/_rune";
import { Gebo, Kauna, Raidho, Thurisaz } from "../Runes/Rune";
import { Clan } from "./_clan";
import { Archaeologist } from "../Archaeologist/_archaeologist";
import { DefaultConvert } from "../commands/Strategy/Convert/DefaultConvert";
import { LeaRheingold } from "../Archaeologist/LeaRheingold";
import { LeaRheingoldConvert } from "../commands/Strategy/Convert/LeaRheingoldConvert";
import { BjornStraussler } from "../Archaeologist/BjornStraussler";

export class JokulClan extends Clan {
    public override adjustRunesConvert(runeList: Rune[]): Rune[] {
        runeList = runeList.reverse();

        if (runeList[runeList.length - 1] instanceof Raidho) {
            runeList.pop();
        } else if (runeList[0] instanceof Raidho) {
            runeList.shift();
            runeList = runeList.reverse();
        }

        return runeList;
    }

    public override adjustRunesAdd(runeList: Rune[], temp: Rune[]): Rune[][] {
        runeList = runeList.reverse();
        temp = temp.reverse();

        if (runeList[runeList.length - 1] instanceof Raidho) {
            temp.pop();
            runeList.reverse()
            return [runeList, temp];
        } else {
            temp.shift();
            return [runeList, temp];
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override calculateRunes(runeList: Rune[]): number {
        return 0;
    }
}

export class Thorlaug extends Clan {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override adjustRunesConvert(runeList: Rune[]): Rune[] {
        return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override adjustRunesAdd(runeList: Rune[], temp: Rune[]): Rune[][] {
        return [[]];
    }

    public override calculateRunes(runeList: Rune[], archeologist: Archaeologist): number {

        let thorlaugApparition = 0;
        let previous = 1;
        if (archeologist instanceof LeaRheingold && runeList[0] instanceof Gebo) {
            previous = 5;
            thorlaugApparition += 1;
        }
        let total = previous;
        const values = [previous];

        for (let i = 1; i < runeList.length; i++) {
            let current = 0;
            if (archeologist instanceof LeaRheingold && runeList[i] instanceof Gebo) {
                thorlaugApparition += 1;
                current = thorlaugApparition * 5;
                previous = current;
                total += current;
                continue;
            } else if (!(archeologist instanceof LeaRheingold)) {
                if (runeList[i] instanceof Gebo) {
                    total += values[values.length - 1] + values[values.length - 2];
                    continue;
                }
                if (runeList[i - 1] instanceof Gebo) {
                    previous = values[values.length - 1] + values[values.length - 2];
                }
            }
            if (archeologist instanceof LeaRheingold) {
                current = new LeaRheingoldConvert().runeOperation(previous, runeList[i]) as number;
            } else {
                current = new DefaultConvert().runeOperation(previous, runeList[i]) as number;
            }
            previous = current;
            total += current;
            values.push(previous);
        }

        return total;
    }
}

export class Kormak extends Clan {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public adjustRunesConvert(runeList: Rune[]): Rune[] {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public adjustRunesAdd(runeList: Rune[], temp: Rune[]): Rune[][] {
        throw new Error("Method not implemented.");
    }
    public override calculateRunes(runeList: Rune[], archeologist: Archaeologist): number {
        let previous = 1;
        let total = previous;
        const values = [previous];

        for (let i = 1; i < runeList.length; i++) {
            let current = 0;
            if (archeologist instanceof BjornStraussler && runeList[i + 1] instanceof Kauna) {
                if (runeList[i] instanceof Thurisaz) {
                    current = ((runeList[i].decimal * 2) * values[values.length - 1]);
                } else {
                    current = ((runeList[i].decimal * 2) + values[values.length - 1]);
                }
                previous = current;
                total += current;
                i += 1;
                continue
            }
            if (archeologist instanceof LeaRheingold && runeList[i] instanceof Kauna) {
                if (i > 0 && runeList[i - 1] instanceof Rune) {
                    if (previous % 2 == 0) {
                        current = 3;
                    } else {
                        current = 4;
                    }
                    previous = current;
                    total += current;
                    continue;
                }
            }

            if (archeologist instanceof LeaRheingold) {
                current = new LeaRheingoldConvert().runeOperation(previous, runeList[i]) as number;
            } else {
                current = new DefaultConvert().runeOperation(previous, runeList[i]) as number;
            }
            previous = current;
            total += current;
            values.push(previous);
        }

        return total;
    }

}
