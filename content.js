// Conteúdo revisado: consulte PEDAGOGY.md antes de ampliar o banco.
// Colunas: kanji-alvo | palavra-alvo | leitura | rōmaji revisado | significado no contexto | frase | tradução | campo semântico.
const kanjiText = `
朝|朝ご飯|あさごはん|asagohan|café da manhã|毎日、朝ご飯を食べます。|Tomo café da manhã todos os dias.|refeicao
昼|昼ご飯|ひるごはん|hirugohan|almoço|十二時に昼ご飯を食べます。|Almoço ao meio-dia.|refeicao
夜|夜|よる|yoru|noite|夜、本を読みます。|À noite, leio um livro.|tempo
通|通り|とおり|tōri|rua|この通りに店があります。|Há uma loja nesta rua.|lugar
客|お客さん|おきゃくさん|okyakusan|cliente / visitante|お客さんが来ました。|Um visitante chegou.|pessoa
暑|暑い|あつい|atsui|quente (clima)|今日は暑いです。|Hoje está quente.|adjetivo
寒|寒い|さむい|samui|frio (clima)|今日は寒いです。|Hoje está frio.|adjetivo
料|料理|りょうり|ryōri|comida / culinária|日本の料理が好きです。|Gosto da culinária japonesa.|refeicao
理|料理|りょうり|ryōri|comida / culinária|母は料理が上手です。|Minha mãe cozinha bem.|refeicao
音|音楽|おんがく|ongaku|música|音楽を聞きます。|Ouço música.|objeto
多|多い|おおい|ōi|numeroso / muito|この店は人が多いです。|Esta loja tem muita gente.|adjetivo
少|少ない|すくない|sukunai|pouco / em pequena quantidade|今日は人が少ないです。|Hoje há pouca gente.|adjetivo
近|近い|ちかい|chikai|perto|駅が近いです。|A estação fica perto.|adjetivo
遠|遠い|とおい|tōi|longe|学校が遠いです。|A escola fica longe.|adjetivo
正|正しい|ただしい|tadashii|correto|これは正しい答えです。|Esta é a resposta correta.|adjetivo
室|教室|きょうしつ|kyōshitsu|sala de aula|教室で勉強します。|Estudo na sala de aula.|lugar
目|目|め|me|olho|あの猫は目が大きいです。|Aquele gato tem olhos grandes.|corpo
口|口|くち|kuchi|boca|口を開けてください。|Abra a boca, por favor.|corpo
耳|耳|みみ|mimi|orelha / ouvido|耳が痛いです。|Meu ouvido está doendo.|corpo
手|手|て|te|mão|手を洗います。|Lavo as mãos.|corpo
足|足|あし|ashi|pé / perna|足が痛いです。|Meu pé está doendo.|corpo
頭|頭|あたま|atama|cabeça|頭が痛いです。|Minha cabeça está doendo.|corpo
顔|顔|かお|kao|rosto|顔を洗います。|Lavo o rosto.|corpo
首|首|くび|kubi|pescoço|首が痛いです。|Meu pescoço está doendo.|corpo
名|名前|なまえ|namae|nome|ここに名前を書いてください。|Escreva seu nome aqui, por favor.|objeto
開|開けます|あけます|akemasu|abrir (algo)|ドアを開けます。|Abro a porta.|acao
閉|閉めます|しめます|shimemasu|fechar (algo)|窓を閉めます。|Fecho a janela.|acao
使|使います|つかいます|tsukaimasu|usar|パソコンを使います。|Uso o computador.|acao
作|作ります|つくります|tsukurimasu|preparar / fazer|晩ご飯を作ります。|Preparo o jantar.|acao
勉|勉強|べんきょう|benkyō|estudo|日本語の勉強をします。|Estudo japonês.|objeto
強|強い|つよい|tsuyoi|forte|今日は風が強いです。|Hoje o vento está forte.|adjetivo
一|一つ|ひとつ|hitotsu|uma unidade|りんごを一つください。|Uma maçã, por favor.|quantidade
二|二つ|ふたつ|futatsu|duas unidades|りんごが二つあります。|Há duas maçãs.|quantidade
三|三つ|みっつ|mittsu|três unidades|みかんを三つ買います。|Compro três mexericas.|quantidade
四|四つ|よっつ|yottsu|quatro unidades|パンを四つください。|Quatro pães, por favor.|quantidade
五|五月|ごがつ|gogatsu|maio|五月に日本へ行きます。|Vou ao Japão em maio.|mes
六|六月|ろくがつ|rokugatsu|junho|六月に旅行します。|Vou viajar em junho.|mes
七|七月|しちがつ|shichigatsu|julho|七月は忙しいです。|Julho é um mês corrido.|mes
八|八月|はちがつ|hachigatsu|agosto|八月に友だちが来ます。|Meu amigo vem em agosto.|mes
九|九月|くがつ|kugatsu|setembro|九月に試験があります。|Há uma prova em setembro.|mes
十|十月|じゅうがつ|jūgatsu|outubro|十月に日本へ行きます。|Vou ao Japão em outubro.|mes
月|月曜日|げつようび|getsuyōbi|segunda-feira|月曜日に日本語を勉強します。|Estudo japonês na segunda-feira.|semana
火|火曜日|かようび|kayōbi|terça-feira|火曜日に働きます。|Trabalho na terça-feira.|semana
水|水|みず|mizu|água|水を飲みます。|Bebo água.|objeto
木|木|き|ki|árvore|木の下に猫がいます。|Há um gato debaixo da árvore.|objeto
金|お金|おかね|okane|dinheiro|お金を払います。|Pago o dinheiro.|objeto
土|土曜日|どようび|doyōbi|sábado|土曜日に休みます。|Descanso no sábado.|semana
日|日曜日|にちようび|nichiyōbi|domingo|日曜日に映画を見ます。|Assisto a um filme no domingo.|semana
時|七時|しちじ|shichiji|sete horas|七時に起きます。|Acordo às sete horas.|tempo
分|十分|じゅっぷん|juppun|dez minutos|駅まで歩いて十分かかります。|Leva dez minutos a pé até a estação.|tempo
半|七時半|しちじはん|shichiji han|sete e meia|七時半に起きます。|Acordo às sete e meia.|tempo
何|何時|なんじ|nanji|que horas|今、何時ですか。|Que horas são agora?|tempo
今|今|いま|ima|agora|今、勉強しています。|Estou estudando agora.|tempo
食|食べます|たべます|tabemasu|comer|ご飯を食べます。|Faço uma refeição.|acao
飲|飲みます|のみます|nomimasu|beber|水を飲みます。|Bebo água.|acao
見|見ます|みます|mimasu|ver / assistir|テレビを見ます。|Assisto à televisão.|acao
行|行きます|いきます|ikimasu|ir|学校へ行きます。|Vou à escola.|acao
来|来ました|きました|kimashita|veio / chegou|友だちが家に来ました。|Meu amigo veio à minha casa.|acao
山|富士山|ふじさん|Fujisan|monte Fuji|富士山の写真を見ます。|Vejo uma foto do monte Fuji.|lugar
川|川|かわ|kawa|rio|川の近くに住んでいます。|Moro perto do rio.|lugar
田|田中|たなか|Tanaka|Tanaka (sobrenome)|田中さんは先生です。|Tanaka é professor(a).|pessoa
大|大きい|おおきい|ōkii|grande|大きいかばんを買います。|Compro uma bolsa grande.|adjetivo
小|小さい|ちいさい|chiisai|pequeno|小さい犬がいます。|Há um cachorro pequeno.|adjetivo
白|白い|しろい|shiroi|branco|白い花を買います。|Compro flores brancas.|cor
黒|黒い|くろい|kuroi|preto|黒い猫がいます。|Há um gato preto.|cor
青|青い|あおい|aoi|azul|空が青いです。|O céu está azul.|cor
赤|赤い|あかい|akai|vermelho|赤い花が好きです。|Gosto de flores vermelhas.|cor
店|店|みせ|mise|loja|この店で本を買います。|Compro livros nesta loja.|lugar
広|広い|ひろい|hiroi|espaçoso|この部屋は広いです。|Este quarto é espaçoso.|adjetivo
明|明るい|あかるい|akarui|bem iluminado|この部屋は明るいです。|Este quarto é bem iluminado.|adjetivo
休|休みます|やすみます|yasumimasu|descansar|日曜日に休みます。|Descanso no domingo.|acao
海|海|うみ|umi|mar|海で泳ぎます。|Nado no mar.|lugar
毎|毎朝|まいあさ|maiasa|todas as manhãs|毎朝、コーヒーを飲みます。|Tomo café todas as manhãs.|tempo
天|天気|てんき|tenki|tempo (clima)|今日は天気がいいです。|Hoje o tempo está bom.|objeto
気|天気|てんき|tenki|tempo (clima)|明日の天気はどうですか。|Como estará o tempo amanhã?|objeto
元|元気|げんき|genki|bem / saudável|母は元気です。|Minha mãe está bem.|adjetivo
先|先生|せんせい|sensei|professor(a)|先生に質問します。|Faço uma pergunta ao professor.|pessoa
生|先生|せんせい|sensei|professor(a)|日本語の先生です。|É professor(a) de japonês.|pessoa
本|本|ほん|hon|livro|日本語の本を読みます。|Leio um livro em japonês.|objeto
人|日本人|にほんじん|Nihonjin|pessoa japonesa|田中さんは日本人です。|Tanaka é japonês/japonesa.|pessoa
百|百円|ひゃくえん|hyakuen|cem ienes|このパンは百円です。|Este pão custa cem ienes.|quantidade
千|千円|せんえん|sen'en|mil ienes|この本は千円です。|Este livro custa mil ienes.|quantidade
万|一万円|いちまんえん|ichiman'en|dez mil ienes|このかばんは一万円です。|Esta bolsa custa dez mil ienes.|quantidade
円|円|えん|en|iene|日本のお金は円です。|A moeda do Japão é o iene.|objeto
高|高い|たかい|takai|alto|あの山は高いです。|Aquela montanha é alta.|adjetivo
長|長い|ながい|nagai|longo|姉は髪が長いです。|Minha irmã mais velha tem cabelo comprido.|adjetivo
語|日本語|にほんご|Nihongo|língua japonesa|日本語を勉強します。|Estudo japonês.|objeto
学|学校|がっこう|gakkō|escola|学校へ行きます。|Vou à escola.|lugar
校|学校|がっこう|gakkō|escola|学校で友だちに会います。|Encontro um amigo na escola.|lugar
母|母|はは|haha|minha mãe|母は先生です。|Minha mãe é professora.|pessoa
父|父|ちち|chichi|meu pai|父は会社員です。|Meu pai trabalha em uma empresa.|pessoa
兄|兄|あに|ani|meu irmão mais velho|兄が一人います。|Tenho um irmão mais velho.|pessoa
弟|弟|おとうと|otōto|meu irmão mais novo|弟が一人います。|Tenho um irmão mais novo.|pessoa
姉|姉|あね|ane|minha irmã mais velha|姉は東京に住んでいます。|Minha irmã mais velha mora em Tóquio.|pessoa
妹|妹|いもうと|imōto|minha irmã mais nova|妹は学生です。|Minha irmã mais nova é estudante.|pessoa
午|午後|ごご|gogo|período após o meio-dia|午後三時に会います。|Nos encontramos às três da tarde.|tempo
前|午前|ごぜん|gozen|período antes do meio-dia|午前九時に働きます。|Trabalho às nove da manhã.|tempo
後|後|あと|ato|depois|授業の後、帰ります。|Volto para casa depois da aula.|tempo
左|左|ひだり|hidari|esquerda|次の角を左に曲がります。|Viro à esquerda na próxima esquina.|posicao
右|右|みぎ|migi|direita|次の角を右に曲がります。|Viro à direita na próxima esquina.|posicao
上|上|うえ|ue|em cima|机の上に本があります。|Há um livro em cima da mesa.|posicao
下|下|した|shita|embaixo|机の下に猫がいます。|Há um gato debaixo da mesa.|posicao
中|中|なか|naka|dentro|かばんの中に本があります。|Há um livro dentro da bolsa.|posicao
外|外|そと|soto|fora|家の外にいます。|Estou fora de casa.|posicao
横|横|よこ|yoko|ao lado|駅の横に店があります。|Há uma loja ao lado da estação.|posicao
安|安い|やすい|yasui|barato|この本は安いです。|Este livro é barato.|adjetivo
話|話します|はなします|hanashimasu|falar|日本語を話します。|Falo japonês.|acao
待|待ちます|まちます|machimasu|esperar|駅で友だちを待ちます。|Espero um amigo na estação.|acao
買|買います|かいます|kaimasu|comprar|本を買います。|Compro um livro.|acao
売|売ります|うります|urimasu|vender|この店で本を売ります。|Vendo livros nesta loja.|acao
読|読みます|よみます|yomimasu|ler|本を読みます。|Leio um livro.|acao
聞|聞きます|ききます|kikimasu|ouvir|音楽を聞きます。|Ouço música.|acao
書|書きます|かきます|kakimasu|escrever|名前を書きます。|Escrevo meu nome.|acao
泳|泳ぎます|およぎます|oyogimasu|nadar|海で泳ぎます。|Nado no mar.|acao
電|電車|でんしゃ|densha|trem|電車で学校へ行きます。|Vou à escola de trem.|objeto
車|車|くるま|kuruma|carro|車で会社へ行きます。|Vou de carro ao trabalho.|objeto
好|好き|すき|suki|gostar / ser do agrado|猫が好きです。|Gosto de gatos.|adjetivo
教|教えます|おしえます|oshiemasu|ensinar|日本語を教えます。|Ensino japonês.|acao
会|会います|あいます|aimasu|encontrar alguém|友だちに会います。|Encontro um amigo.|acao
社|会社|かいしゃ|kaisha|empresa|会社で働きます。|Trabalho em uma empresa.|lugar
新|新しい|あたらしい|atarashii|novo|新しい本を買います。|Compro um livro novo.|adjetivo
古|古い|ふるい|furui|antigo / velho|これは古い本です。|Este é um livro antigo.|adjetivo
女|女の人|おんなのひと|onna no hito|mulher|あの女の人は先生です。|Aquela mulher é professora.|pessoa
男|男の人|おとこのひと|otoko no hito|homem|あの男の人は先生です。|Aquele homem é professor.|pessoa
子|女の子|おんなのこ|onna no ko|menina|女の子が遊んでいます。|Uma menina está brincando.|pessoa
年|今年|ことし|kotoshi|este ano|今年、日本へ行きます。|Vou ao Japão este ano.|tempo
週|毎週|まいしゅう|maishū|toda semana|毎週、日本語を勉強します。|Estudo japonês toda semana.|tempo
間|一週間|いっしゅうかん|isshūkan|uma semana (duração)|一週間、日本にいます。|Fico no Japão durante uma semana.|tempo
花|花|はな|hana|flor|花を買います。|Compro flores.|objeto
駅|駅|えき|eki|estação|駅で友だちに会います。|Encontro um amigo na estação.|lugar
友|友だち|ともだち|tomodachi|amigo(a)|友だちと話します。|Converso com um amigo.|pessoa
夜|夜中|よなか|yonaka|meio da noite|夜中に目が覚めました。|Acordei no meio da noite.|tempo
通|通ります|とおります|tōrimasu|passar por|毎日、この道を通ります。|Passo por este caminho todos os dias.|acao
通|通います|かよいます|kayoimasu|frequentar / ir regularmente|学校に通います。|Frequento a escola.|acao
通|さくら通り|さくらどおり|Sakura-dōri|rua Sakura|さくら通りを歩きます。|Caminho pela rua Sakura.|lugar
音|音|おと|oto|som|ピアノの音が聞こえます。|Dá para ouvir o som do piano.|objeto
少|少し|すこし|sukoshi|um pouco|日本語が少しわかります。|Entendo um pouco de japonês.|quantidade
近|近所|きんじょ|kinjo|vizinhança|近所に店があります。|Há uma loja na vizinhança.|lugar
口|入口|いりぐち|iriguchi|entrada|入口はここです。|A entrada é aqui.|lugar
手|握手|あくしゅ|akushu|aperto de mão|友だちと握手します。|Aperto a mão de um amigo.|acao
首|首都|しゅと|shuto|capital (cidade)|日本の首都は東京です。|A capital do Japão é Tóquio.|lugar
名|有名|ゆうめい|yūmei|famoso|この店は有名です。|Esta loja é famosa.|adjetivo
開|開きます|あきます|akimasu|abrir-se|ドアが開きます。|A porta se abre.|acao
閉|閉まります|しまります|shimarimasu|fechar-se|ドアが閉まります。|A porta se fecha.|acao
作|作文|さくぶん|sakubun|redação (texto)|日本語で作文を書きます。|Escrevo uma redação em japonês.|objeto
強|勉強|べんきょう|benkyō|estudo|日本語の勉強をします。|Estudo japonês.|objeto
夜|夜間|やかん|yakan|período noturno|この学校には夜間の授業があります。|Esta escola tem aulas noturnas.|tempo
`;
const examChapter1='朝昼夜通客暑寒料理音多少近遠正室';
const examChapter2='目口耳手足頭顔首名開閉使作勉強';
const newExamKanji=new Set(['使','作','勉','強']);
const kanjiBank=kanjiText.trim().split('\n').map((line,i)=>{
 const [k,word,kana,romaji,meaning,sentence,translation,domain]=line.split('|');
 return {id:'kanji-'+i,k,word,kana,romaji,meaning,sentence,translation,domain,
 chapter:examChapter1.includes(k)?1:examChapter2.includes(k)?2:0};
});
// Accepted alternatives are explicit; never infer that all readings of a kanji fit this word.
const kanjiAlternatives={
 '七時':['ななじ'], '七時半':['ななじはん'], '十分':['じっぷん'], '日本人':['にっぽんじん'], '今年':['こんねん']
};
const romajiAlternatives={'七時':['nanaji'],'七時半':['nanaji han'],'十分':['jippun'],'日本人':['Nipponjin'],'今年':["kon'nen",'konnen']};
const kanjiNotes={
 '料理':'料理 é a palavra “comida/culinária”. Não traduza 料 como “taxa” ou 理 como “lógica” para deduzir o sentido desta palavra.',
 '勉強':'勉強 significa “estudo”; 勉強する é “estudar”. Aqui, 強 tem leitura on きょう (kyō), diferente da leitura kun em 強い（つよい / tsuyoi, forte）.',
 '強い':'強い é “forte”. Aqui a leitura é kun; compare com 勉強（べんきょう / benkyō, estudo）, em que 強 se lê きょう (on).',
 '先生':'Aprenda 先生 como palavra: せんせい (sensei), professor(a). 生 aqui se lê せい (on); não significa que a palavra seja traduzida como “vida”.',
 '今年':'A leitura cotidiana 今年（ことし / kotoshi）é uma leitura especial da palavra inteira (jukujikun). A leitura formal こんねん (konnen) também é aceita. Não divida automaticamente ことし entre os dois kanji.',
 'さくら通り':'Nesta expressão, 通り é o sufixo どおり (dōri), usado no nome da via. Compare この通り（このとおり / kono tōri）, esta rua.',
 '日曜日':'Nesta palavra, 日 aparece duas vezes: にち no início e び no final. Não existe uma única leitura para 日 em todos os contextos.',
 '通り':'Nesta expressão, observe também o que vem antes: この通り é kono tōri; em さくら通り, o sufixo é dōri. Não são leituras intercambiáveis neste exercício.',
 '通ります':'通る（とおる / tōru）é passar por um local; 通う（かよう / kayou）é ir regularmente. São verbos diferentes com o mesmo kanji.',
 '通います':'通う（かよう / kayou）é ir regularmente. Compare com 通る（とおる / tōru）, passar por um local. Não troque apenas a leitura.',
 '少し':'少し（すこし / sukoshi）é “um pouco”; 少ない（すくない / sukunai）é um adjetivo: “pouco / em pequena quantidade”. Observe こ e く.',
 '少ない':'少ない（すくない / sukunai）qualifica a quantidade. 少し（すこし / sukoshi）é “um pouco”; não são substitutos automáticos.',
 '暑い':'暑い é calor do clima. Para um objeto ou uma bebida quente, costuma-se usar 熱い, também あつい (atsui). O contexto determina a escrita.',
 '七月':'O nome do mês é しちがつ (shichigatsu). A leitura do número muda conforme a palavra; não aplique なな automaticamente.',
 '九月':'Setembro é くがつ (kugatsu), não きゅうがつ. Aprenda o nome do mês inteiro.',
 '十分':'Neste contexto, 十分 é “dez minutos”: じゅっぷん (juppun); じっぷん (jippun) também é aceito. Em outro contexto, 十分（じゅうぶん / jūbun）significa “suficiente”.',
 '開けます':'ドアを開けます: alguém abre a porta. Compare ドアが開きます: a porta se abre. A mudança de verbo também muda a estrutura.',
 '開きます':'ドアが開きます: a porta se abre. Compare ドアを開けます: alguém abre a porta.',
 '閉めます':'窓を閉めます: alguém fecha a janela. Compare 窓が閉まります: a janela se fecha.',
 '閉まります':'ドアが閉まります: a porta se fecha. Compare ドアを閉めます: alguém fecha a porta.',
 '来ました':'来る（くる / kuru）, 来ます（きます / kimasu）, 来ました（きました / kimashita）: o verbo é irregular. Aqui não se lê くました.',
 '田中':'田中（たなか / Tanaka）é um sobrenome. Não traduza o nome como “meio do arrozal”. Nomes próprios devem ter a leitura confirmada.',
 '好き':'好き é um adjetivo do tipo な, embora a tradução natural seja “gostar”. Neste exemplo: 猫が好きです。',
 '高い':'Aqui se fala da altura de uma montanha. Em この本は高いです, a mesma palavra pode significar “caro”.',
 '母':'母（はは / haha）é usado, em contexto neutro, para falar da própria mãe com outras pessoas. Não confunda com お母さん.',
 '父':'父（ちち / chichi）é usado, em contexto neutro, para falar do próprio pai com outras pessoas. Não confunda com お父さん.',
 '学校':'がっこう tem っ pequeno (pausa antes de k) e こう com vogal longa. Compare gakkō, não gakō nem gakko.',
 '一週間':'いっしゅうかん tem っ pequeno e しゅう com vogal longa. O conjunto indica duração: uma semana.',
 '近所':'近い（ちかい / chikai, perto）usa leitura kun; em 近所（きんじょ / kinjo, vizinhança）, 近 usa a leitura on きん.',
 '入口':'入口 se lê いりぐち (iriguchi). 口 sozinho pode ser くち (kuchi); aqui ocorre mudança de som para ぐち.',
 '握手':'Em 握手（あくしゅ / akushu）, 手 se lê しゅ (on). Em 手を洗います, a leitura é て (te, kun).',
 '首都':'Em 首都（しゅと / shuto）, 首 se lê しゅ (on). Para pescoço, 首 é くび (kubi, kun).',
 '有名':'Em 有名（ゆうめい / yūmei）, 名 se lê めい (on). Compare 名前（なまえ / namae）, nome.',
 '作文':'作文（さくぶん / sakubun）é uma redação. 作 tem leitura on さく; em 作る（つくる / tsukuru）, usa leitura kun.',
 '夜間':'夜間（やかん / yakan）é o período noturno; 夜 usa leitura on や. Compare 夜（よる / yoru）, noite.'
};
