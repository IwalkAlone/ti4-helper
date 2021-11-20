import arborec from "@/assets/factions/arborec.jpg";
import argent from "@/assets/factions/argent.jpg";
import brotherhood from "@/assets/factions/brotherhood.jpg";
import cabal from "@/assets/factions/cabal.jpg";
import empyrean from "@/assets/factions/empyrean.jpg";
import ghosts from "@/assets/factions/ghosts.jpg";
import hacan from "@/assets/factions/hacan.jpg";
import jolnar from "@/assets/factions/jolnar.jpg";
import letnev from "@/assets/factions/letnev.jpg";
import mahact from "@/assets/factions/mahact.jpg";
import mentak from "@/assets/factions/mentak.jpg";
import mindnet from "@/assets/factions/mindnet.jpg";
import muaat from "@/assets/factions/muaat.jpg";
import naalu from "@/assets/factions/naalu.jpg";
import naazrokha from "@/assets/factions/naazrokha.jpg";
import nekrovirus from "@/assets/factions/nekrovirus.jpg";
import nomad from "@/assets/factions/nomad.jpg";
import saar from "@/assets/factions/saar.jpg";
import sardak from "@/assets/factions/sardak.jpg";
import sol from "@/assets/factions/sol.jpg";
import titans from "@/assets/factions/titans.jpg";
import winnu from "@/assets/factions/winnu.jpg";
import xxcha from "@/assets/factions/xxcha.jpg";
import yssaril from "@/assets/factions/yssaril.jpg";

//TODO: is there a way to do this with glob import?
//https://vitejs.dev/guide/features.html#glob-import

let idSequence = 1;

type ComponentSet = "BaseGame" | "ProphecyOfKings";

interface FactionBase {
  name: string;
  nameplateBackground: string;
}

export class Faction {
  id = idSequence++;
  name: string;
  nameplateBackground: string;
  componentSet: ComponentSet;

  constructor(
    { name, nameplateBackground }: FactionBase,
    componentSet: ComponentSet
  ) {
    this.name = name;
    this.nameplateBackground = nameplateBackground;
    this.componentSet = componentSet;
  }
}

const baseGameFactionBases: FactionBase[] = [
  {
    name: "Арбореки",
    nameplateBackground: arborec,
  },
  {
    name: "Братство Инь",
    nameplateBackground: brotherhood,
  },
  {
    name: "Баронат Летнев",
    nameplateBackground: letnev,
  },
  {
    name: "Винну",
    nameplateBackground: winnu,
  },
  {
    name: "Жол-Нарские Университеты",
    nameplateBackground: jolnar,
  },
  {
    name: "Клан Сааров",
    nameplateBackground: saar,
  },
  {
    name: "Клубок Наалу",
    nameplateBackground: naalu,
  },
  {
    name: "Коалиция Ментака",
    nameplateBackground: mentak,
  },
  {
    name: "Королевство Ззча",
    nameplateBackground: xxcha,
  },
  {
    name: "Некровирус",
    nameplateBackground: nekrovirus,
  },
  {
    name: "Племена Иссарилов",
    nameplateBackground: yssaril,
  },
  {
    name: "Призраки Креусса",
    nameplateBackground: ghosts,
  },
  {
    name: "Психосеть Л1З1КС",
    nameplateBackground: mindnet,
  },
  {
    name: "Сардак Н'Орр",
    nameplateBackground: sardak,
  },
  {
    name: "Тлеющие с Муаата",
    nameplateBackground: muaat,
  },
  {
    name: "Федерация Сол",
    nameplateBackground: sol,
  },
  {
    name: "Хаканские Эмираты",
    nameplateBackground: hacan,
  },
];

const prophecyOfKingsFactionBases: FactionBase[] = [
  { name: "The Argent Flight", nameplateBackground: argent },
  { name: "The Empyrean", nameplateBackground: empyrean },
  { name: "The Mahact Gene-Sorcerers", nameplateBackground: mahact },
  { name: "The Naaz-Rokha Alliance", nameplateBackground: naazrokha },
  { name: "The Nomad", nameplateBackground: nomad },
  { name: "The Titans of Ul", nameplateBackground: titans },
  { name: "The Vuil'Raith Cabal", nameplateBackground: cabal },
];

export const baseGameFactions = baseGameFactionBases.map((base) => {
  return new Faction(base, "BaseGame");
});

export const prophecyOfKingsFactions = prophecyOfKingsFactionBases.map(
  (base) => {
    return new Faction(base, "ProphecyOfKings");
  }
);

export const allFactions = baseGameFactions.concat(prophecyOfKingsFactions);
