//const mensagem = "Bom te ver aqui!"
//alert(mensagem + (10 * 100) + "abraços")

const perguntas = [
  {
    pergunta: "Qual palavra-chave é usada para declarar uma variável em JavaScript?",
    respostas: [
      "let",
      "var",
      "const",
    ],
    correta: 2
  },
  {
    pergunta: "O que o operador '===' verifica em JavaScript?",
    respostas: [
      "Apenas valor",
      "Valor e tipo de dados",
      "Apenas tipo de dados",
    ],
    correta: 1
  },
  {
    pergunta: "Como você converte uma string para um número em JavaScript?",
    respostas: [
      "toNumber()",
      "parseInt()",
      "convertNumber()",
    ],
    correta: 1
  },
  {
    pergunta: "O que o método 'push()' faz em um array?",
    respostas: [
      "Remove o último elemento",
      "Adiciona um elemento no início",
      "Adiciona um elemento no final",
    ],
    correta: 2
  },
  {
    pergunta: "Qual é a diferença entre 'let' e 'var' em termos de escopo?",
    respostas: [
      "Ambos têm escopo de bloco",
      "'let' tem escopo de bloco, 'var' tem escopo de função",
      "'var' tem escopo de bloco, 'let' tem escopo de função",
    ],
    correta: 1
  },
  {
    pergunta: "O que o operador '%' faz em JavaScript?",
    respostas: [
      "Adição",
      "Subtração",
      "Módulo (resto da divisão)",
    ],
    correta: 2
  },
  {
    pergunta: "Como você declara uma função anônima em JavaScript?",
    respostas: [
      "function myFunction() {}",
      "var anonymous = function() {}",
      "anonymousFunction = () => {}",
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a função do método 'addEventListener' em JavaScript?",
    respostas: [
      "Adiciona um elemento ao DOM",
      "Registra um manipulador de eventos para um elemento",
      "Altera o estilo de um elemento",
    ],
    correta: 1
  },
  {
    pergunta: "O que é 'hoisting' em JavaScript?",
    respostas: [
      "Uma técnica de otimização de código",
      "A elevação de declarações para o topo antes da execução",
      "Um tipo de loop",
    ],
    correta: 1
  },
  {
    pergunta: "Como você verifica se uma variável é indefinida em JavaScript?",
    respostas: [
      "if (myVar === null)",
      "if (myVar === undefined)",
      "(typeof myVar === 'undefined')",
    ],
    correta: 2
  }
];
//traz/importa  os elementos através da querySelector  da identificação da div com id=quiz que esta no html
const quiz = document.querySelector('#quiz')
//traz/importa os elementos através do querySelector da identificação da template que esta no html
const template = document.querySelector('template')



//para fazer as somas dos acertos e tirar os erros da soma. 
//new é uma palavra reservada no js serve pra criar coisas novas e geralmente um tipo de objeto especifico que 
//é chamado de Set() (Set é um conjunto) com ele você pode adicionar ou tirar, você só nunca pode repetir o que 
//tem dentro dele. Agora utilizando o Set vamos adicionar um função add no segundo laço for, dentro do if
const corretas = new Set()
//vai responder o total de itens la dentro
const totalDePerguntas = perguntas.length
// essa vai usar pra substituir os dados do html para trazer aqui pro js. E vai trazer o total
const mostrarTotal = document.querySelector('#acertos span')
//substitui o texto do mostrarTotal e trazer o corretas.size
mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas


// laço de repetição (no formato reduzido da estrututa i=0; i<[].length; i++)(declarando uma nova variavel item)
for(const item of perguntas) {
  //criando a varialvel quizItem, template vem do html, ligada a content que é uma propriedade que disponibiliza 
  //o conteudo de dentro da template, neste caso ele faz um clone dos elementos do template.(sendo true ele copia por
  //inteiro se colocar false ele clona so o primeiro elemento)
  const quizItem = template.content.cloneNode(true)
  // aqui usa o querySelector dentro do quizItem pra pegar o h3 que esta no html e transformar o titulo em pergunta
  // que esta no js
  quizItem.querySelector('h3').textContent = item.pergunta
  
//laço de repetição dentro de outro laço.
//assim como no primeiro laço ele esta no formato reduzido da estrutura i=0; i<[].length; i++
//declarando a nova variavel resposta
  for(let resposta of item.respostas) {
//declarando a variavel const dt e importando através da querySelector os dados da dl e dt que estão no html,
//adicionando tbm um clone dos dados também utilizando o true pra clonar o elemento inteiro.
    const dt = quizItem.querySelector('dl dt').cloneNode(true)
//utilizar o querySelector dentro da variavel dt criada para encontrar o span(span esta no html)
//text content troca para resposta
    dt.querySelector('span').textContent = resposta
//para arrumar a seleção do input colocar o nome de cada um, vamos usar o querySelector pra trazer o input e vamos usar a 
//função setAttribute ela exige dois valores pra funcionar, qual o nome do atributo e depois qual o valor do atributo.
//neste caso name + perguntas.indexOf()(usamos concatenação pra colocar o array perguntas, o indexOf() é uma função que
//vai pesquisar o indice e passo uma informação pra ela neste caso é o item de perguntas que esta la no primeiro for)
    dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(item))
//novamente usando o querySelector no input, mas dessa vez queremos acessar o value para atribuir o valor dele em item.respostas pra procurar o resposta
    dt.querySelector('input').value = item.respostas.indexOf(resposta)
//usar o querySelector dentro do dt novamente para verificar uma ação/evento que esta acontecendo na tela, neste caso evento de mudança do input.
//onchange dentro do universo da don espera que exista uma função a arrow function(() => {})
//event quer dizer que esta tudo interligado o que esta acontecendo, dentro da funçãovai criar uma const estaCorreta e nela atribuir um operador de 
//comparação (event.target.value é o meu click) e o clique vai ser comparado com item.correta (item.correta são elementos do javascript que estão nas perguntas)
//a resposta vai ser um booleano ou ta correto ou não
    dt.querySelector('input').onchange = (event) => {
     const estaCorreta = event.target.value == item.correta

     corretas.delete(item)
     //se estiver correto temos um novo escopo utilizando o if que da um alerta caso a resposta esteja correta
     if(estaCorreta) {
      //adicionou o objeto item inteiro (pergunta e respostas)
      corretas.add(item)
     }
//trouxe pra ca o que quero mudar no laço referente ao total 
     mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas
     //size é uma propriedade que vai responder qual o tamanho do corretas
     //alert(corretas.size)
    }


//usar o querySelector no quizItem que foi criado no primeiro laço para trazer os elementos do dl e acrescentar
//o dt que foi criado no laço
    quizItem.querySelector('dl').appendChild(dt)
  }

//removendo o dl e dt do quizItem pois foi feito o clone no laço de repetição.
  quizItem.querySelector('dl dt').remove()


//coloca a pergunta na tela
  quiz.appendChild(quizItem)
}



