const originalVerbInventory=[
 {title:'う・つ・る → って',verbs:[['買う（かう）','kau','comprar'],['歌う（うたう）','utau','cantar'],['払う（はらう）','harau','pagar'],['会う（あう）','au','encontrar'],['待つ（まつ）','matsu','esperar'],['立つ（たつ）','tatsu','ficar em pé'],['持つ（もつ）','motsu','segurar / levar'],['帰る（かえる）','kaeru','voltar'],['作る（つくる）','tsukuru','fazer / criar'],['取る（とる）','toru','pegar'],['売る（うる）','uru','vender'],['入る（はいる）','hairu','entrar'],['切る（きる）','kiru','cortar'],['送る（おくる）','okuru','enviar']]},
 {title:'む・ぶ・ぬ → んで',verbs:[['飲む（のむ）','nomu','beber'],['読む（よむ）','yomu','ler'],['休む（やすむ）','yasumu','descansar'],['遊ぶ（あそぶ）','asobu','brincar / divertir-se'],['呼ぶ（よぶ）','yobu','chamar'],['死ぬ（しぬ）','shinu','morrer']]},
 {title:'く → いて',verbs:[['書く（かく）','kaku','escrever'],['聞く（きく）','kiku','ouvir / perguntar'],['歩く（あるく）','aruku','caminhar'],['磨く（みがく）','migaku','escovar / polir'],['働く（はたらく）','hataraku','trabalhar']]},
 {title:'ぐ → いで',verbs:[['泳ぐ（およぐ）','oyogu','nadar'],['脱ぐ（ぬぐ）','nugu','tirar a roupa'],['急ぐ（いそぐ）','isogu','apressar-se'],['稼ぐ（かせぐ）','kasegu','ganhar dinheiro']]},
 {title:'す → して',verbs:[['話す（はなす）','hanasu','falar'],['出す（だす）','dasu','tirar / pôr para fora'],['消す（けす）','kesu','apagar'],['返す（かえす）','kaesu','devolver'],['押す（おす）','osu','empurrar / apertar'],['なくす','nakusu','perder'],['貸す（かす）','kasu','emprestar']]},
 {title:'Grupo 2 → て',verbs:[['食べる（たべる）','taberu','comer'],['寝る（ねる）','neru','dormir'],['教える（おしえる）','oshieru','ensinar / informar'],['つける','tsukeru','ligar / colocar'],['見せる（みせる）','miseru','mostrar'],['覚える（おぼえる）','oboeru','memorizar'],['出かける（でかける）','dekakeru','sair'],['開ける（あける）','akeru','abrir'],['見る（みる）','miru','ver / assistir'],['起きる（おきる）','okiru','acordar / levantar'],['浴びる（あびる）','abiru','tomar banho de chuveiro'],['落ちる（おちる）','ochiru','cair']]},
 {title:'Irregulares',verbs:[['する → して','suru → shite','fazer'],['勉強する → 勉強して','benkyō suru → benkyō shite','estudar'],['来る → 来て','kuru → kite','vir'],['行く → 行って','iku → itte','ir']]}
];

const verbContexts=`
買う|パンを___、家に帰ります。|Compro pão e volto para casa.
歌う|みんなで___ください。|Cantem juntos, por favor.
払う|お金を___ください。|Pague, por favor.
会う|友だちに___、話します。|Encontro um amigo e conversamos.
待つ|ここで___ください。|Espere aqui, por favor.
立つ|ここに___ください。|Fique em pé aqui, por favor.
持つ|このかばんを___ください。|Segure esta bolsa, por favor.
帰る|家に___、休みます。|Volto para casa e descanso.
作る|晩ご飯を___、食べます。|Preparo o jantar e como.
取る|この本を___ください。|Pegue este livro, por favor.
売る|古い本を___、新しい本を買います。|Vendo livros antigos e compro livros novos.
入る|どうぞ、部屋に___ください。|Entre no quarto, por favor.
切る|紙を___ください。|Corte o papel, por favor.
送る|メールを___ください。|Envie um e-mail, por favor.
飲む|水を___ください。|Beba água, por favor.
読む|この本を___ください。|Leia este livro, por favor.
休む|少し___ください。|Descanse um pouco, por favor.
遊ぶ|公園で___、家に帰ります。|Brinco no parque e volto para casa.
呼ぶ|先生を___ください。|Chame o professor, por favor.
死ぬ|この物語では、王が___、国が変わります。|Nesta história, o rei morre e o país muda.
書く|ここに名前を___ください。|Escreva seu nome aqui, por favor.
聞く|音楽を___、休みます。|Ouço música e descanso.
歩く|駅まで___、電車に乗ります。|Caminho até a estação e pego o trem.
磨く|歯を___、寝ます。|Escovo os dentes e vou dormir.
働く|会社で___、六時に帰ります。|Trabalho na empresa e volto às seis.
泳ぐ|海で___、休みます。|Nado no mar e descanso.
脱ぐ|靴を___ください。|Tire os sapatos, por favor.
急ぐ|少し___ください。|Apresse-se um pouco, por favor.
稼ぐ|お金を___、旅行します。|Ganho dinheiro e viajo.
話す|ゆっくり___ください。|Fale devagar, por favor.
出す|宿題を___ください。|Entregue a tarefa, por favor.
消す|電気を___ください。|Apague a luz, por favor.
返す|本を___ください。|Devolva o livro, por favor.
押す|このボタンを___ください。|Aperte este botão, por favor.
なくす|財布を___、困っています。|Perdi a carteira e estou em dificuldade.
貸す|ペンを___ください。|Empreste-me uma caneta, por favor.
食べる|ご飯を___、出かけます。|Faço uma refeição e saio.
寝る|よく___、元気になりました。|Dormi bem e me recuperei.
教える|電話番号を___ください。|Informe seu número de telefone, por favor.
つける|電気を___ください。|Acenda a luz, por favor.
見せる|写真を___ください。|Mostre a foto, por favor.
覚える|この言葉を___、使ってみます。|Memorizo esta palavra e tento usá-la.
出かける|友だちと___、映画を見ます。|Saio com um amigo e assistimos a um filme.
開ける|窓を___ください。|Abra a janela, por favor.
見る|この写真を___ください。|Veja esta foto, por favor.
起きる|六時に___、朝ご飯を食べます。|Acordo às seis e tomo café da manhã.
浴びる|シャワーを___、寝ます。|Tomo banho de chuveiro e vou dormir.
落ちる|コップが___、割れました。|O copo caiu e quebrou.
する|宿題を___、寝ます。|Faço a tarefa e vou dormir.
勉強する|日本語を___、休みます。|Estudo japonês e descanso.
来る|明日、ここに___ください。|Venha aqui amanhã, por favor.
行く|学校に___、勉強します。|Vou à escola e estudo.
`;
const verbContextMap=new Map(verbContexts.trim().split('\n').map(x=>{const [word,sentence,translation]=x.split('|');return [word,{sentence,translation}]}));
const groupIds=['utsuru','mubunu','ku','gu','su','group2','irregular'];
const teEnd={'う':'って','つ':'って','る':'って','む':'んで','ぶ':'んで','ぬ':'んで','く':'いて','ぐ':'いで','す':'して'};
const masuEnd={'う':'い','つ':'ち','る':'り','む':'み','ぶ':'び','ぬ':'に','く':'き','ぐ':'ぎ','す':'し'};
const romajiTeEnd={u:['u','tte'],tsu:['tsu','tte'],ru:['ru','tte'],mu:['mu','nde'],bu:['bu','nde'],nu:['nu','nde'],ku:['ku','ite'],gu:['gu','ide'],su:['su','shite']};
const verbs=originalVerbInventory.flatMap((g,gi)=>g.verbs.map((v,i)=>{
 const word=v[0].split(/[（ →]/)[0];
 const special={'する':'する','勉強する':'べんきょうする','来る':'くる','行く':'いく'};
 const kana=special[word]||(v[0].match(/（(.+)）/)||[])[1]||word;
 const romaji=v[1].split(' → ')[0];
 const group=gi===5?2:gi===6&&word!=='行く'?3:1;
 const cat=word==='行く'?'iku':groupIds[gi];
 const last=kana.slice(-1);
 let te,teKana,teRomaji,masu;
 if(group===2){te=word.slice(0,-1)+'て';teKana=kana.slice(0,-1)+'て';teRomaji=romaji.slice(0,-2)+'te';masu=word.slice(0,-1)+'ます'}
 else if(word==='来る'){te='来て';teKana='きて';teRomaji='kite';masu='来ます'}
 else if(word.endsWith('する')){te=word.slice(0,-2)+'して';teKana=kana.slice(0,-2)+'して';teRomaji=romaji.slice(0,-4)+'shite';masu=word.slice(0,-2)+'します'}
 else {const ending=word==='行く'?'って':teEnd[last];te=word.slice(0,-1)+ending;teKana=kana.slice(0,-1)+ending;masu=word.slice(0,-1)+masuEnd[last]+'ます';const endings={'う':['u','tte'],'つ':['tsu','tte'],'る':['ru','tte'],'む':['mu','nde'],'ぶ':['bu','nde'],'ぬ':['nu','nde'],'く':['ku','ite'],'ぐ':['gu','ide'],'す':['su','shite']};const [cut,add]=endings[last];teRomaji=word==='行く'?'itte':romaji.slice(0,-cut.length)+add}
 return {id:'verb-'+word,word,kana,romaji,meaning:word==='浴びる'?'banhar-se / receber sobre o corpo (シャワーを浴びる: tomar banho de chuveiro)':v[2],group,cat,te,teKana,teRomaji,masu,...verbContextMap.get(word)};
}));
const categories={
 utsuru:{title:'Grupo 1: う・つ・る → って',rule:'No grupo 1, essas terminações mudam para って. Nem todo verbo em る é do grupo 2: 帰る, 入る e 切る são do grupo 1.',example:'帰る → 帰って（かえって / kaette）; 食べる (grupo 2) → 食べて（たべて / tabete）.'},
 mubunu:{title:'Grupo 1: む・ぶ・ぬ → んで',rule:'Retire a última sílaba e acrescente んで. Preserve o ん e o som de で.',example:'読む → 読んで（よんで / yonde）; 遊ぶ → 遊んで（あそんで / asonde）.'},
 ku:{title:'Grupo 1: く → いて',rule:'Nos verbos deste grupo, く muda para いて. 行く é a exceção: 行って.',example:'書く → 書いて（かいて / kaite）; 聞く → 聞いて（きいて / kiite）.'},
 gu:{title:'Grupo 1: ぐ → いで',rule:'ぐ muda para いで, com で, não て. Não troque o som sonoro de g/d pelo surdo k/t.',example:'泳ぐ → 泳いで（およいで / oyoide）.'},
 su:{title:'Grupo 1: す → して',rule:'す muda para して. O し faz parte da forma correta.',example:'話す → 話して（はなして / hanashite）.'},
 group2:{title:'Grupo 2: retire る e acrescente て',rule:'Para um verbo confirmado como grupo 2, substitua る por て. Não coloque っ automaticamente.',example:'食べる → 食べて（たべて / tabete）; 見る → 見て（みて / mite）.'},
 irregular:{title:'Grupo 3: する e 来る',rule:'する → して; 来る → 来て（きて）. Os compostos com する seguem する. Aprenda 来る（くる）, 来ます（きます）e 来て（きて）juntos.',example:'勉強する → 勉強して（べんきょうして / benkyō shite）.'},
 iku:{title:'行く: exceção da forma て',rule:'行く pertence ao grupo 1, mas sua forma て é 行って, não 行いて. Não o classifique como grupo 3.',example:'行く → 行きます → 行って（いって / itte）.'},
 nagaraform:{title:'～ながら: formação',rule:'Use a base da forma ます: retire ます e acrescente ながら. Não use a forma de dicionário nem a forma て antes de ながら.',example:'聞く → 聞きます → 聞きながら（ききながら / kikinagara）.'},
 mainaction:{title:'～ながら: ação principal',rule:'No uso de simultaneidade praticado aqui, a ação principal vem na oração final. Inverter as ações pode produzir outra frase correta, mas muda o foco.',example:'音楽を聞きながら、勉強します。Estudo enquanto ouço música.'},
 subject:{title:'～ながら: quem faz as ações',rule:'Para expressar duas ações simultâneas com este padrão, elas são realizadas pelo mesmo sujeito. “Enquanto” em português também liga ações de pessoas diferentes; essa tradução não autoriza usar ながら automaticamente.',example:'私は音楽を聞きながら、勉強します。Eu ouço música e estudo.'},
 sequence:{title:'Simultaneidade × sequência',rule:'～ながら indica simultaneidade neste módulo. Para “primeiro uma ação e depois outra”, use a construção de sequência adequada; て pode conectar as ações, mas não significa “enquanto” em todos os casos.',example:'ご飯を食べて、歯を磨きます。Como e depois escovo os dentes.'},
 reading:{title:'Kanji: leitura em contexto',rule:'Leia a palavra inteira, incluindo okurigana. Observe vogais longas, っ pequeno, ゃ・ゅ・ょ e ゛. Não tente usar uma única leitura do kanji em todas as palavras.',example:'学校（がっこう / gakkō）; 今年（ことし / kotoshi）.'},
 meaning:{title:'Kanji: significado da palavra',rule:'O significado pedido é o da palavra destacada nesta frase. O sentido isolado de um componente não substitui a tradução da palavra.',example:'料理（りょうり / ryōri）= comida/culinária; não “taxa + lógica”.'},
 recognition:{title:'Kanji: escrita e reconhecimento',rule:'Associe a leitura à palavra que cabe na frase. Compare os componentes visuais e o sentido; não escolha só por um caractere familiar.',example:'買います（かいます / kaimasu）= comprar; 売ります（うります / urimasu）= vender.'}
};
const nagaraText=`
聞く|聞きます|聞きながら|ききながら|kikinagara|音楽を___、勉強します。|Estudo enquanto ouço música.
食べる|食べます|食べながら|たべながら|tabenagara|ご飯を___、家族と話します。|Converso com minha família enquanto faço a refeição.
歩く|歩きます|歩きながら|あるきながら|arukinagara|公園を___、友だちと話します。|Converso com um amigo enquanto caminho pelo parque.
遊ぶ|遊びます|遊びながら|あそびながら|asobinagara|猫と___、テレビを見ます。|Assisto à TV enquanto brinco com o gato.
見る|見ます|見ながら|みながら|minagara|地図を___、道を探します。|Procuro o caminho enquanto olho o mapa.
飲む|飲みます|飲みながら|のみながら|nominagara|コーヒーを___、本を読みます。|Leio um livro enquanto tomo café.
話す|話します|話しながら|はなしながら|hanashinagara|友だちと___、料理を作ります。|Preparo a comida enquanto converso com um amigo.
歌う|歌います|歌いながら|うたいながら|utainagara|歌を___、部屋を掃除します。|Limpo o quarto enquanto canto.
待つ|待ちます|待ちながら|まちながら|machinagara|バスを___、本を読みます。|Leio um livro enquanto espero o ônibus.
働く|働きます|働きながら|はたらきながら|hatarakinagara|___、大学で勉強しています。|Estudo na universidade enquanto trabalho.
`;
const nagaraForms=nagaraText.trim().split('\n').map((x,i)=>{const [word,masu,answer,kana,romaji,sentence,translation]=x.split('|');return {id:'nagara-'+i,word,masu,answer,kana,romaji,sentence,translation}});
const nagaraConcepts=[
 {id:'nagara-main',cat:'mainaction',prompt:'Qual é a ação principal nesta frase?',context:'テレビを見ながら、ご飯を食べます。',options:['Comer a refeição.','Assistir à televisão.','As duas são obrigatoriamente o foco principal.'],answer:'Comer a refeição.',explanation:'食べます está na oração final: é a ação principal. A frase diz “Como enquanto assisto à TV”.',romaji:'Terebi o minagara, gohan o tabemasu.'},
 {id:'nagara-coffee',cat:'mainaction',prompt:'Qual frase destaca LER enquanto se toma café?',context:'A mesma pessoa faz as duas coisas ao mesmo tempo.',options:['コーヒーを飲みながら、本を読みます。','本を読みながら、コーヒーを飲みます。','コーヒーを飲んでから、本を読みます。'],answer:'コーヒーを飲みながら、本を読みます。',explanation:'A leitura é o foco, por isso 読みます vem no final. A segunda frase também é gramatical, mas destaca tomar café. A terceira indica ler depois de tomar café.',romaji:'Kōhī o nominagara, hon o yomimasu.'},
 {id:'nagara-subject',cat:'subject',prompt:'Qual situação pode ser expressa pelo padrão de simultaneidade com ～ながら?',context:'Considere quem realiza cada ação.',options:['Eu ouço música e estudo ao mesmo tempo.','Eu estudo enquanto meu marido cozinha.','Eu termino o jantar e só depois leio.'],answer:'Eu ouço música e estudo ao mesmo tempo.',explanation:'O sujeito das duas ações é o mesmo. Duas pessoas fazendo coisas diferentes pedem outra construção; a terceira alternativa é sequência, não simultaneidade.',romaji:'Ongaku o kikinagara, benkyō shimasu.'},
 {id:'nagara-sequence',cat:'sequence',prompt:'Qual frase descreve primeiro comer e depois escovar os dentes?',context:'As ações não acontecem simultaneamente.',options:['ご飯を食べて、歯を磨きます。','ご飯を食べながら、歯を磨きます。','歯を磨きながら、ご飯を食べます。'],answer:'ご飯を食べて、歯を磨きます。',explanation:'Neste contexto, て liga ações em sequência. ながら indicaria tentar comer e escovar os dentes ao mesmo tempo.',romaji:'Gohan o tabete, ha o migakimasu.'},
 {id:'nagara-tense',cat:'nagaraform',prompt:'Qual frase diz “Estudei enquanto ouvia música”?',context:'As duas ações ocorreram no passado.',options:['音楽を聞きながら、勉強しました。','音楽を聞きましたながら、勉強しました。','音楽を聞いてながら、勉強しました。'],answer:'音楽を聞きながら、勉強しました。',explanation:'O tempo aparece no predicado final: しました. A construção 聞きながら permanece igual; não se anexa ながら a ました nem a て.',romaji:'Ongaku o kikinagara, benkyō shimashita.'},
 {id:'nagara-scope',cat:'mainaction',prompt:'O que muda quando invertemos as ações?',context:'① 音楽を聞きながら、勉強します。\n② 勉強しながら、音楽を聞きます。',options:['As duas podem ser gramaticais, mas a ação destacada muda.','A segunda é sempre gramaticalmente errada.','Uma está no presente e a outra no passado.'],answer:'As duas podem ser gramaticais, mas a ação destacada muda.',explanation:'Em ①, estudar é o foco; em ②, ouvir música é o foco. Não marque uma frase válida como incorreta sem especificar o sentido solicitado.',romaji:'① Ongaku o kikinagara, benkyō shimasu. ② Benkyō shinagara, ongaku o kikimasu.'}
];

