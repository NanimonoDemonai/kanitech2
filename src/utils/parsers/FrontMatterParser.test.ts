import { frontMatterParser } from "src/utils/parsers/FrontMatterParser";

const src = `
---
title: "イカのページ"
tags: [軟体動物, ページ]
---

# 修正 Innumerasque sacra crede cum interdum Stygia incedit

## Sanguine ambae

Lorem markdownum ipsa ingemit messes te moenia meas neque, se nec. Obvertere
iuvenes faciemque. [Somnus](http://hoc.io/geminos.html) raptaque novercae vobis
mollirique potuit retroque tacitorum pondus precibusque res hoc. Adfixa velat
sumpsit traherent removerat quater ara populos. Illa unam mora lapides, omne
deus sparsit iuppiter tetendi vocatur fertis bella.

Per quae patriorum talibus omnes. Abstinet servaturis in iuvenem patremque
seducunt quibus, fatis quod flebile conscia!

## Fundae cultique conducat propulit

Vidisse in nomenque armis. Pelago nocet annorum sub cernit dinumerat [pervenit
est](http://ora-vincta.net/) antri imi magna, stabula et, semine: in: precor.
Caligine si magos conlaudat concavaque ipsa muneribusque sinat Latona liquidi
non os. Fuit usque; et vidit et non, palluit lacte nam quid erravisse ponendi
retia aera, **bimari Iovis**? Gaudia superis gerit redimitus illis dissimulant
et naribus committitur per iam [quoque auctor
hinc](http://plura.org/aperto.php).

> Ire amor haec, oris indurata Achillea usquam surgit, feram, plenissima domus
> rosarum derectos et. Mixta tum ignaroque secreta difficilis cornua hostem. In
> dis tunc est saecula, pollentibus tura caesariem fontesque.

\`\`\`javascript
alert("hello");
\`\`\`

## Omnia ingeniis utque

O fratres rubore paelice Boebes suo, non abiit regnis, ille coniectos conatibus.
Quia ille Alemonides, usa quippe vultus montibus visum ut illo ignes, miles,
qui.

## Praeferri et oscula medio tempus ferrugine litora

Facto tua terunt monimenta aut, nec honor pro qua Gyaroque, perque ubi satiaque.
Fulserunt sibila sinu concedimus, probavit sitim. Aut aspice paludes, maturus
centum damno. Revinctam variis male exemplis, seu tam exit Achaidos, indeiecta
ego, haud semper. Me raptam fronte cum hactenus aram latentis capiat pendet
sibi.

Ora ingens, dedisse nullaque movi opem furibunda tecum, ingenti? Rutuli Iuno
illa, Glaucus. Sinebat ala atque dis magna, ac in praecordia ignesque signa in
haec. Haut pro, cum ludit corpus; cum attollit
[navigat](http://cancer.org/melumina.aspx) occiduae ferinae certo _superi_, aut
ter!

`.trim();

describe("frontMatterParser", () => {
  test("パースできる", () => {
    const parsed = frontMatterParser(src);
    expect(parsed).toMatchSnapshot();
  });
});
