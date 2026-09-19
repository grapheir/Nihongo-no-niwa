'use strict';
const $=s=>document.querySelector(s);
const stage=$('#stage');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
const hira=s=>String(s).normalize('NFKC').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96));
const norm=s=>hira(s).toLowerCase().replace(/[’‘]/g,"'").replace(/[\s。、,.!?！？]/g,'');
// Used only to accept kana-based ASCII aliases for lexical answers, never to display sentences.
function asciiReading(s){
 const kana='あいうえおかきくけこがぎぐげござじずぜぞさしすせそたちつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわをん';
 const values='a i u e o ka ki ku ke ko ga gi gu ge go za ji zu ze zo sa shi su se so ta chi tsu te to da ji zu de do na ni nu ne no ha hi fu he ho ba bi bu be bo pa pi pu pe po ma mi mu me mo ya yu yo ra ri ru re ro wa o n'.split(' ');
 const singles=Object.fromEntries([...kana].map((k,i)=>[k,values[i]]));
 const pairs={きゃ:'kya',きゅ:'kyu',きょ:'kyo',ぎゃ:'gya',ぎゅ:'gyu',ぎょ:'gyo',しゃ:'sha',しゅ:'shu',しょ:'sho',じゃ:'ja',じゅ:'ju',じょ:'jo',ちゃ:'cha',ちゅ:'chu',ちょ:'cho',にゃ:'nya',にゅ:'nyu',にょ:'nyo',ひゃ:'hya',ひゅ:'hyu',ひょ:'hyo',びゃ:'bya',びゅ:'byu',びょ:'byo',ぴゃ:'pya',ぴゅ:'pyu',ぴょ:'pyo',みゃ:'mya',みゅ:'myu',みょ:'myo',りゃ:'rya',りゅ:'ryu',りょ:'ryo'};
 let out='',gem=false;const chars=[...hira(s)];
 for(let i=0;i<chars.length;i++){
  const c=chars[i];if(c==='っ'){gem=true;continue}
  if(c==='ん'){out+=/[あいうえおやゆよ]/.test(chars[i+1]||'')?"n'":'n';continue}
  let token=pairs[c+(chars[i+1]||'')];if(token)i++;else token=singles[c]||c;
  if(gem){out+=token.startsWith('ch')?'t':token[0];gem=false}out+=token;
 }
 return out;
}
function acceptedReading(e){return [...new Set([e.kana,e.romaji,asciiReading(e.kana),...(kanjiAlternatives[e.word]||[]),...(romajiAlternatives[e.word]||[]),...(kanjiAlternatives[e.word]||[]).map(asciiReading)])]}
const matches=(answer,aliases)=>aliases.some(x=>norm(x)===norm(answer));
const kanjiKeys=[...new Set(kanjiBank.map(e=>e.k))];
const examKeys=[...examChapter1,...examChapter2];
const grammarItems=[...nagaraForms,...nagaraConcepts];
const states={};
let topic='te',activeKey='',session=[],at=0,results=[],answered=false,roundCounter=0,score=0;
function stateFor(key,keys){return states[key]||(states[key]={queue:shuffle(keys),seen:new Set(),attempts:{},cycle:1})}
function poolInfo(key){
 if(key==='te')return {keys:verbs.map(v=>v.id),name:'Forma て',tag:'CONJUGAÇÃO EM CONTEXTO'};
 if(key==='nagara')return {keys:grammarItems.map(x=>x.id),name:'～ながら',tag:'AÇÕES SIMULTÂNEAS'};
 return {keys:key==='exam'?examKeys:kanjiKeys,name:key==='exam'?'Revisão — capítulos 1 e 2':'Kanji em contexto',tag:key==='exam'?'LISTA DA PROVA':'BANCO GERAL'};
}
function progressText(key){const p=poolInfo(key),s=stateFor(key,p.keys);return s.seen.size+' de '+p.keys.length+' '+(key==='te'?'verbos':key==='nagara'?'itens':'kanji-alvo')+' respondidos nesta visita.'}
function contextMarkup(sentence,target){const i=sentence.indexOf(target);if(i<0)return esc(sentence);return esc(sentence.slice(0,i))+'<mark>'+esc(target)+'</mark>'+esc(sentence.slice(i+target.length))}
function explanationBlock(jp,kana,romaji,meaning){return '<p class="answer-reading"><span lang="ja">'+esc(jp)+(kana?'（'+esc(kana)+'）':'')+'</span><br><strong>'+esc(romaji)+'</strong>'+(meaning?' — '+esc(meaning):'')+'</p>'}
function optionsFor(answer,candidates,n=4){
 const seen=new Set([norm(answer)]),wrong=[];
 for(const c of candidates){if(!seen.has(norm(c))){seen.add(norm(c));wrong.push(c)}if(wrong.length===n-1)break}
 return shuffle([answer,...wrong]);
}
function makeTe(v,mode){
 const base=v.kana.slice(0,-1),masuKana=v.word==='来る'?'きます':v.word.endsWith('する')?v.kana.slice(0,-2)+'します':v.group===2?base+'ます':base+masuEnd[v.kana.slice(-1)]+'ます';
 const wrong=shuffle([base+'て',base+'って',base+'んで',base+'いて',base+'いで',v.kana+'て',masuKana.slice(0,-2)+'て'].filter(x=>x!==v.teKana));
 const prompts=['Complete a lacuna com a forma て do verbo indicado.','Escreva apenas a forma て que completa a frase.','Qual forma て corresponde ao verbo indicado na forma ます?','Corrija a conjugação indicada e complete a lacuna.'];
 const extra=mode===3?'Tentativa a corrigir: '+wrong[0]+' (não é a forma correta).':'';
 return {id:v.id+'-'+mode,key:v.id,cat:v.cat,type:mode%2?'write':'mc',prompt:prompts[mode],context:esc(v.sentence),
 hint:(mode===2?v.masu+'（'+masuKana+'）':v.word+'（'+v.kana+'）')+' — '+v.meaning+'. '+extra,
 answer:v.teKana,aliases:[v.teKana,v.te,v.teRomaji,asciiReading(v.teKana)],options:optionsFor(v.teKana,wrong),
 answerHTML:explanationBlock(v.te,v.teKana,v.teRomaji,v.meaning),
 explanation:v.word+' → '+v.masu+' → '+v.te+'. '+categories[v.cat].rule,
 fullSentence:v.sentence.replace('___',v.te),translation:v.translation,
 note:'A forma て não é uma tradução fixa do gerúndio português. Nesta frase, observe o que vem depois dela.',source:v};
}
function makeNagara(e,mode){
 if(e.options)return {...e,key:e.id,type:'mc',context:esc(e.context),hint:'Escolha a alternativa que corresponde exatamente ao sentido pedido.',options:shuffle(e.options),aliases:[e.answer],answerHTML:explanationBlock(e.answer,'',e.romaji,''),note:'Este módulo trata do uso de simultaneidade de ～ながら; outros usos não estão sendo avaliados.'};
 const v=verbs.find(v=>v.word===e.word),wrong=[e.word+'ながら',(v?v.te:e.word+'て')+'ながら',e.masu+'ながら'];
 return {id:e.id+'-'+mode,key:e.id,cat:'nagaraform',type:mode%2?'write':'mc',prompt:'Complete com a forma em ～ながら do verbo indicado.',context:esc(e.sentence),hint:'Verbo: '+e.word+' / '+e.masu+'. A mesma pessoa realiza as duas ações.',
 answer:e.answer,aliases:[e.answer,e.kana,e.romaji,asciiReading(e.kana)],options:optionsFor(e.answer,wrong),
 answerHTML:explanationBlock(e.answer,e.kana,e.romaji,'enquanto realiza essa ação'),
 explanation:e.masu+' → '+e.masu.slice(0,-2)+' + ながら → '+e.answer+'. Retire ます; não acrescente ながら à forma て.',
 fullSentence:e.sentence.replace('___',e.answer),translation:e.translation,
 note:e.word==='働く'?'Aqui, as duas atividades coexistem no mesmo período da vida; não precisam ocupar exatamente cada segundo.':'A ação principal vem na oração final.',source:e};
}
const meaningBuckets={
 refeicao:['café da manhã','almoço','comida / culinária','jantar','bebida'],
 mes:['maio','junho','julho','agosto','setembro','outubro'],
 semana:['segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado','domingo'],
 corpo:['olho','boca','orelha / ouvido','mão','pé / perna','cabeça','rosto','pescoço'],
 posicao:['esquerda','direita','em cima','embaixo','dentro','fora','ao lado'],
 cor:['branco','preto','azul','vermelho'],
 tempo:['agora','amanhã','ontem','semana passada','ano passado'],
 lugar:['escola','sala de aula','estação','loja','empresa','rio','mar'],
 pessoa:['professor(a)','amigo(a)','minha mãe','meu pai','meu irmão mais velho','minha irmã mais nova'],
 acao:['comer','beber','ler','escrever','nadar','abrir (algo)','fechar (algo)'],
 adjetivo:['novo','barato','forte','longe','perto','antigo / velho'],
 quantidade:['uma unidade','duas unidades','três unidades','quatro unidades','cem ienes','mil ienes'],
 objeto:['livro','água','música','flor','dinheiro','carro','trem']
};
function readingDistractors(e){
 const valid=acceptedReading(e),s=e.kana,variants=[];
 if(s.includes('っ'))variants.push(s.replace('っ',''));
 if(/[ゃゅょ]/.test(s))variants.push(s.replace(/[ゃゅょ]/g,c=>({'ゃ':'や','ゅ':'ゆ','ょ':'よ'}[c])));
 for(let i=1;i<s.length;i++)if('いう'.includes(s[i]))variants.push(s.slice(0,i)+s.slice(i+1));
 const pairs={'が':'か','ぎ':'き','ぐ':'く','げ':'け','ご':'こ','ざ':'さ','じ':'し','ず':'す','ぜ':'せ','ぞ':'そ','だ':'た','で':'て','ど':'と','ば':'は','び':'ひ','ぶ':'ふ','べ':'へ','ぼ':'ほ','ぱ':'は','ぴ':'ひ','ぷ':'ふ','ぺ':'へ','ぽ':'ほ'};
 for(let i=0;i<s.length;i++)if(pairs[s[i]])variants.push(s.slice(0,i)+pairs[s[i]]+s.slice(i+1));
 const nearby=shuffle(kanjiBank.filter(x=>x.id!==e.id&&x.domain===e.domain)).map(x=>x.kana);
 return [...shuffle(variants),...nearby,...shuffle(kanjiBank).map(x=>x.kana)].filter(x=>!matches(x,valid));
}
function makeKanji(e,mode){
 const base={id:e.id+'-'+mode,key:e.k,source:e,hint:'Responda sobre a palavra destacada, não sobre um kanji isolado.',
 fullSentence:e.sentence,translation:e.translation,answerHTML:explanationBlock(e.word,e.kana,e.romaji,e.meaning),
 explanation:'Neste contexto, '+e.word+' significa “'+e.meaning+'”.',
 note:kanjiNotes[e.word]||'Guarde a leitura desta palavra. O mesmo kanji pode ter outra leitura em outra palavra.'};
 if(mode===0||mode===1)return {...base,cat:'reading',type:mode===1?'write':'mc',prompt:mode===1?'Escreva a leitura da palavra destacada.':'Como se lê a palavra destacada nesta frase?',context:contextMarkup(e.sentence,e.word),answer:e.kana,aliases:acceptedReading(e),options:optionsFor(e.kana,readingDistractors(e))};
 if(mode===2){
 const candidates=shuffle(meaningBuckets[e.domain]||meaningBuckets.objeto).filter(x=>x!==e.meaning);
 const safe=candidates.filter(x=>!(e.word==='料理'&&['café da manhã','almoço','jantar'].includes(x)));
 return {...base,cat:'meaning',type:'mc',prompt:'O que significa a palavra destacada neste contexto?',context:contextMarkup(e.sentence,e.word),answer:e.meaning,aliases:[e.meaning],options:optionsFor(e.meaning,[...safe,...shuffle(['telefone','cadeira','janela','sapato'])])};
 }
 const candidates=shuffle(kanjiBank.filter(x=>x.domain===e.domain&&!acceptedReading(e).includes(x.kana))).map(x=>x.word);
 return {...base,cat:'recognition',type:'mc',prompt:'Qual escrita corresponde a 「'+e.kana+'」 nesta frase?',hint:'Escolha a palavra que tem essa leitura e completa a frase.',context:esc(e.sentence.replace(e.word,'___')),answer:e.word,aliases:[e.word],options:optionsFor(e.word,[...candidates,...shuffle(kanjiBank.filter(x=>!acceptedReading(e).includes(x.kana))).map(x=>x.word)])};
}
function rotationNote(){return '<p class="hint">Até 12 questões por rodada. O rodízio prioriza os itens ainda não respondidos no ciclo; no fim, a rodada pode ser menor. O acompanhamento vale enquanto esta página estiver aberta.</p><button class="ghost" onclick="principlesPage()">Critérios de estudo e novas inclusões</button>'}
function inventoryMarkup(){
 return ['utsuru','mubunu','ku','gu','su','group2','irregular','iku'].map(cat=>'<div class="verb-group"><h3>'+esc(categories[cat].title)+'</h3><div class="verb-run">'+verbs.filter(v=>v.cat===cat).map(v=>'<span><b lang="ja">'+esc(v.word)+'（'+esc(v.kana)+'）<small>'+esc(v.masu)+'</small></b><i>'+esc(v.romaji)+'</i><em>'+esc(v.meaning)+'</em></span>').join('')+'</div></div>').join('');
}
function home(t=topic){
 topic=t;session=[];activeKey='';answered=false;
 document.querySelectorAll('.topic').forEach(b=>b.classList.toggle('active',b.dataset.topic===t));
 if(t==='kanji'){
 stage.innerHTML='<div class="intro"><span class="lesson-tag">KANJI EM CONTEXTO</span><h2>Palavras em contexto</h2><p class="hint">Leitura, significado e escrita em frases. O rōmaji e a tradução aparecem depois da resposta.</p><div class="kanji-stats"><span>'+kanjiKeys.length+' kanji-alvo cadastrados</span><span>'+kanjiBank.length+' contextos</span><span>'+examKeys.length+' kanji na lista da prova</span></div><div class="mode-grid"><button class="mode-card" onclick="startQuiz(\'kanji\')"><b>Rodada geral</b><small>'+progressText('kanji')+'</small></button><button class="mode-card special-card" onclick="startQuiz(\'exam\')"><b>Revisão — capítulos 1 e 2</b><small>Somente os kanji-alvo da lista. 使・作・勉・強 estão marcados como novos.<br>'+progressText('exam')+'</small></button></div><p class="hint">As frases podem conter outros caracteres de apoio; a palavra avaliada fica destacada. A lista geral preserva o banco já cadastrado.</p><details class="inventory"><summary>Conferir a lista da prova</summary><div class="inventory-body"><p>Capítulo 1: <span lang="ja">'+[...examChapter1].join('・')+'</span></p><p>Capítulo 2: <span lang="ja">'+[...examChapter2].join('・')+'</span></p></div></details>'+rotationNote()+'</div>';
 }else{
 const te=t==='te';
 stage.innerHTML='<div class="intro"><span class="lesson-tag">'+poolInfo(t).tag+'</span><h2>'+poolInfo(t).name+'</h2><p class="hint">'+(te?'Pratique os '+verbs.length+' verbos cadastrados, alternando múltipla escolha, escrita e correção em frases.':'Forme ～ながら e confira quem realiza as ações, a simultaneidade e o foco da frase.')+'</p><div class="rule">'+(te?'<b>Primeiro, identifique o grupo.</b><br>Grupo 1: う・つ・る → って; む・ぶ・ぬ → んで; く → いて; ぐ → いで; す → して.<br>Grupo 2: retire る e acrescente て.<br>Grupo 3: する → して; 来る → 来て（きて）.<br>行く é grupo 1, mas faz 行って.':'<b>Forma ます sem ます + ながら</b><br>聞きます → 聞きながら.<br>Neste uso, o mesmo sujeito faz duas ações ao mesmo tempo. A ação principal vem na oração final.')+'</div>'+(te?'<details class="inventory"><summary>Conferir lista de verbos por grupo</summary><div class="inventory-body">'+inventoryMarkup()+'</div></details>':'<p lang="ja">音楽を聞きながら、勉強します。</p><p>Estudo enquanto ouço música.</p>')+'<div class="start"><button class="primary" onclick="startQuiz(\''+t+'\')">Começar rodada</button></div><p class="hint">'+progressText(t)+'</p>'+rotationNote()+'</div>';
 }
}
function startQuiz(key){
 activeKey=key;topic=['exam','kanji'].includes(key)?'kanji':key;
 const p=poolInfo(key),s=stateFor(key,p.keys);
 if(!s.queue.length){s.queue=shuffle(p.keys);s.cycle++}
 const keys=s.queue.slice(0,12);
 session=keys.map((id,i)=>{
  const mode=(i+roundCounter)%4;
  if(key==='te')return makeTe(verbs.find(v=>v.id===id),mode);
  if(key==='nagara')return makeNagara(grammarItems.find(x=>x.id===id),mode);
  const variants=kanjiBank.filter(e=>e.k===id),e=variants[(s.attempts[id]||0)%variants.length];return makeKanji(e,mode);
 });
 roundCounter++;at=0;results=[];answered=false;score=0;$('#score').textContent=0;render();
}
function render(){
 answered=false;const q=session[at],p=poolInfo(activeKey);
 const inputs=q.type==='mc'?'<div class="options">'+q.options.map((v,i)=>'<button class="option" onclick="pick('+i+')"><span class="letter">'+String.fromCharCode(65+i)+'</span>'+esc(v)+'</button>').join('')+'</div>':'<form class="write" onsubmit="event.preventDefault();checkWrite()"><label class="sr-only" for="answer">Sua resposta</label><input id="answer" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="'+(q.cat==='reading'?'Leitura da palavra destacada':'Somente a forma solicitada')+'" aria-describedby="input-help"><button class="primary" type="submit">Conferir</button></form><p class="hint" id="input-help">'+(q.cat==='reading'?'Digite em kana ou rōmaji; não copie a palavra em kanji.':'Pode usar kana, kanji com kana ou rōmaji.')+' Vogais longas e っ pequeno contam.</p>';
 stage.innerHTML='<div class="progress-row"><div class="bar"><span style="width:'+at/session.length*100+'%"></span></div><span class="count">'+(at+1)+' de '+session.length+'</span></div><span class="lesson-tag">'+p.tag+(q.source?.k&&newExamKanji.has(q.source.k)?'<span class="new-badge">conteúdo novo</span>':'')+'</span><h2 class="prompt">'+esc(q.prompt)+'</h2><div class="context-box" lang="ja">'+q.context+'</div><p class="hint">'+esc(q.hint)+'</p>'+inputs+'<div id="feedback" class="feedback" role="status" aria-live="polite"></div><div class="actions"><button id="next" class="primary" disabled onclick="next()">'+(at===session.length-1?'Ver resultado':'Próxima')+'</button></div>';
}
function errorGuidance(q,input){
 if(q.cat==='reading'){
  const e=q.source;if(matches(input,[e.word]))return 'A tarefa pede a leitura: copiar os kanji não mostra como você os lê. Escreva em kana ou rōmaji.';
  if(e.kana.includes('っ')&&norm(input)===norm(e.kana.replace('っ','')))return 'Faltou o っ pequeno: ele indica uma pausa/consoante duplicada, não um つ pronunciado.';
  if(q.aliases.some(a=>norm(a).replace(/[ゃゅょ]/g,c=>({'ゃ':'や','ゅ':'ゆ','ょ':'よ'}[c]))===norm(input)))return 'Observe o tamanho do kana: ゃ・ゅ・ょ pequenos se combinam com o som anterior.';
  return 'Compare com a leitura correta, sílaba por sílaba. Verifique duração das vogais, っ pequeno e sinais como ゛.';
 }
 return categories[q.cat].rule;
}
function answerDetails(q){return q.answerHTML+'<p>'+esc(q.explanation)+'</p>'+(q.fullSentence?'<p lang="ja">'+esc(q.fullSentence)+'</p><p>'+esc(q.translation)+'</p>':'')+(q.note?'<p>'+esc(q.note)+'</p>':'')}
function feedback(q,input,ok){
 answered=true;results.push({q,input,ok});
 const s=states[activeKey];s.queue=s.queue.filter(id=>id!==q.key);s.seen.add(q.key);s.attempts[q.key]=(s.attempts[q.key]||0)+1;
 if(ok)score++;$('#score').textContent=score;
 const f=$('#feedback');f.className='feedback show '+(ok?'ok':'no');
 f.innerHTML='<b>'+(ok?'Resposta correta.':'Resposta incorreta — veja a comparação.')+'</b>'+(!ok?'<p>Sua resposta: '+esc(input)+'</p>':'')+answerDetails(q)+(!ok?'<p><strong>Para revisar:</strong> '+esc(errorGuidance(q,input))+'</p>':'');$('#next').disabled=false;
}
function pick(i){
 if(answered)return;const q=session[at],input=q.options[i];if(input===undefined)return;
 const ok=matches(input,q.aliases);
 document.querySelectorAll('.option').forEach((b,j)=>{b.disabled=true;if(matches(q.options[j],q.aliases))b.classList.add('correct');else if(j===i)b.classList.add('wrong')});
 feedback(q,input,ok);
}
function checkWrite(){
 if(answered)return;const input=$('#answer');if(!input.value.trim()){input.setAttribute('aria-invalid','true');$('#feedback').className='feedback show no';$('#feedback').textContent='Digite uma resposta antes de conferir.';return}
 const q=session[at],value=input.value;input.disabled=true;feedback(q,value,matches(value,q.aliases));
}
function next(){if(!answered)return;if(at<session.length-1){at++;render()}else finish()}
function finish(){
 const groups={};for(const r of results){const g=groups[r.q.cat]||(groups[r.q.cat]={total:0,wrong:0});g.total++;if(!r.ok)g.wrong++}
 const sorted=Object.entries(groups).sort((a,b)=>b[1].wrong-a[1].wrong);
 stage.innerHTML='<div class="finish"><h2>Seu diagnóstico desta rodada</h2><div class="bigscore">'+results.filter(r=>r.ok).length+'/'+results.length+'</div><p class="hint">Os números descrevem esta rodada, não todo o assunto. Use a comparação das respostas para decidir o que revisar.</p><div class="diagnosis">'+sorted.map(([cat,g])=>'<button class="diag-row" onclick="review(\''+cat+'\')"><span><b>'+esc(categories[cat].title)+'</b><small>'+(g.wrong?'Clique para comparar suas respostas e estudar.':'Você acertou os itens avaliados; a revisão continua disponível.')+'</small></span><span class="badge">'+g.wrong+' erro'+(g.wrong===1?'':'s')+' / '+g.total+'</span></button>').join('')+'</div><p class="hint">'+progressText(activeKey)+'</p><div class="start"><button class="primary" onclick="review(\'all\')">Revisão detalhada</button><button class="ghost" onclick="startQuiz(\''+activeKey+'\')">Próxima rodada</button><button class="ghost" onclick="home()">Voltar ao menu</button></div>'+(activeKey==='te'?'<details class="inventory"><summary>Lista de verbos para conferência</summary><div class="inventory-body">'+inventoryMarkup()+'</div></details>':'')+'</div>';
}
function review(cat){
 const selected=cat==='all'?[...new Set(results.map(r=>r.q.cat))]:[cat];
 stage.innerHTML='<div class="review-head"><div><span class="lesson-tag">REVISÃO DETALHADA</span><h2>Entenda e compare</h2></div><button class="ghost" onclick="finish()">← Resultado</button></div>'+selected.map(c=>{
  const info=categories[c],rows=results.filter(r=>r.q.cat===c);
  return '<section class="review-section"><h3>'+esc(info.title)+'</h3><div class="review-rule">'+esc(info.rule)+'<p>'+esc(info.example)+'</p></div>'+rows.map(r=>'<div class="mistake"><b>'+(r.ok?'Acerto':'Revisar')+' — '+esc(r.q.prompt)+'</b><div lang="ja">'+r.q.context+'</div><p>Sua resposta: '+esc(r.input)+'</p>'+answerDetails(r.q)+'</div>').join('')+'</section>';
 }).join('');
}
function principlesPage(){
 stage.innerHTML='<span class="lesson-tag">CRITÉRIOS DO BANCO</span><h2>Como este material deve crescer</h2><div class="review-section"><h3>Compromissos de estudo</h3><ul><li>Palavras e frases naturais; o significado cobrado é o da palavra no contexto.</li><li>Rōmaji de kanji somente após a resposta e na revisão; nunca como pista nas alternativas.</li><li>Kun/on apenas quando a explicação ajuda a distinguir palavras reais. Nunca perguntar pela classificação.</li><li>Uma tarefa clara por questão, com alternativas distintas e uma única resposta válida; variantes legítimas são aceitas.</li><li>Explicação em português: resposta, regra e comparação com o erro, sem afirmar uma dificuldade que não foi demonstrada.</li><li>Rodízio com cobertura do banco cadastrado. A lista da prova permanece separada e restrita aos 31 kanji-alvo fornecidos.</li><li>Novos conteúdos exigem origem, grupo/capítulo confirmado, contexto, leitura, rōmaji revisado, tradução, variantes e justificativa das alternativas.</li><li>Mudanças nestes princípios precisam ser discutidas com Anna antes de aplicar ou deixar de aplicar uma melhoria.</li></ul></div><div class="review-section"><h3>Referências abertas da revisão</h3><p><a href="https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/explanation/039.html" target="_blank" rel="noopener">TUFS: grupos verbais</a> · <a href="https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/explanation/043.html" target="_blank" rel="noopener">TUFS: forma て</a> · <a href="https://www.coelang.tufs.ac.jp/mt/ja/gmod/contents/explanation/094.html" target="_blank" rel="noopener">TUFS: conexões entre orações</a> · <a href="https://www.kanjipedia.jp/kotoba/0002419100" target="_blank" rel="noopener">Kanjipedia: 今年</a></p><p class="hint">As fontes estão em japonês. Revisão assistida por IA, sem certificação da escola. O conjunto geral foi preservado; sua correspondência integral com o livro depende das páginas disponíveis.</p></div><button class="ghost" onclick="home()">Voltar ao menu</button>';
}
document.querySelectorAll('.topic').forEach(b=>b.addEventListener('click',()=>home(b.dataset.topic)));
home();
