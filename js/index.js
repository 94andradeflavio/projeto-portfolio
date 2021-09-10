//   Clique e arraste

const slider = document.querySelectorAll('.elements');
let isDown = false;
let startX;
let scrollLeft;

slider.forEach(item => {

  item.addEventListener('mousedown', (e) => {
    isDown = true;
    item.classList.add('active');
    startX = e.pageX - item.offsetLeft;
    scrollLeft = item.scrollLeft;
  });
  item.addEventListener('mouseleave', () => {
    isDown = false;
    item.classList.remove('active');
  });
  item.addEventListener('mouseup', () => {
    isDown = false;
    item.classList.remove('active');
  });
  item.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - item.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    item.scrollLeft = scrollLeft - walk;
    // console.log(walk);
  });

})

// Puxar dados do arquivo JSON

let dados = []

fetch('./js/data.json')
  .then(res => res.json())
  .then(data => {

    dados = [...data]

    const itemsCategoria = [
      'c1',
      'c2',
      'c3'
    ]

    itemsCategoria.forEach(itemId => {

      data.filter(i => i.category === itemId).map((item, index) => {

        $(`#${item.category}`).append(`
          <div id="${item.id}" class="el el-${index+1}" style="background: url(${item.path}/1.jpg); background-position: center; background-size: cover">
            <div class="box" id="${item.id}">
              <h6 id="${item.id}">${index+1}</h6>
              <p id="${item.id}">${item.title}</p>
            </div>
          </div>
          `)
      })
    })

    const qtItemsMainCarrossel = 3

    for (let i = 1; i <= qtItemsMainCarrossel; i++) {

      const carrossel = document.querySelector('.mainCarrossel')
      let ordem = data.length - i

      $(carrossel).append(`
        <div id="${data[ordem].id}" class="items item-${i}" style="background: url(${data[ordem].path}/1.jpg); background-position: center; background-size: cover">
          <div class="h-shadow" id="${data[ordem].id}">
            <div class="v-shadow" id="${data[ordem].id}">
              <div class="textArea" id="${data[ordem].id}">
                  <h2 id="${data[ordem].id}">${data[ordem].title}</h2>
                  <p id="${data[ordem].id}">
                    ${data[ordem].description}
                  </p>
              </div>
            </div>
          </div>
      </div>
      `)
    }

    $('.mainCarrossel').not('.slick').slick({
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      fade: true,
      cssEase: 'linear',
      draggable: false,
    });


    // Modal

    let filho = document.querySelectorAll('.v-shadow')

    filho.forEach(item => {

      item.addEventListener('click', e => {

        let pai = e.target.parentNode
        let avo = pai.parentNode

        createModal(data, avo)

      })

    })

    let el = document.querySelectorAll('.el')

    el.forEach(item => {

      item.addEventListener('click', e => {

        createModal(data, e.target)

      })
    })


  })

const createModal = (data, item) => {
  item = item.id
  const selected = data.filter(el => item === el.id)

  if (selected.length === 0) {
    alert('Número de ticket não encontrado')
  } else {

    $('body').css('overflow', 'hidden')
    $('.inner').append(`<div class="modalCarrossel"></div>`)
    document.querySelector('.textTitle').innerHTML = selected[0].title
    document.querySelector('.textDesc').innerHTML = selected[0].description

    $('.modalContent').css({
      transform: 'translateX(0%)',
      filter: 'opacity(1)'
    })

    for (let i = 1; i <= selected[0].images; i++) {

      $('.modalCarrossel').append(`
            <div id="${selected[0].id}" class="items item-${i}" >
              <img src="${selected[0].path}/${i}.jpg" alt="">
            </div>
            `)
    }


    $('.modalCarrossel').not('.slick').slick({
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      autoplay: false,
      fade: false,
      cssEase: 'linear',
      draggable: true,
    });
  }
}


const fechaModal = () => {
  $('body').css('overflow', 'auto')
  $('.modalContent').css({
    transform: 'translateX(101%)',
    filter: 'opacity(0)'
  })

  setTimeout(() => $('.modalCarrossel').remove(), 500)
}

// Mecanismo de busca
const inputText = document.getElementById('searchTicket');

inputText.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    console.log(e.target.value)
    e.target.id = e.target.value
    createModal(dados, e.target)
    e.target.id = ''
    e.target.value = ''
  }

});

inputText.addEventListener('focusout', () => {
  inputText.className -= 'openned'
  inputText.value = ''
  inputText.id = ''
})

document.querySelector('.search').addEventListener('click', () => abreInput())

const abreInput = () => {
  inputText.classList.toggle('openned')

  if ($('.openned').length) {
    inputText.focus()
  }
}


// Scroll suave

function scrollSuave(ev) {
  ev.preventDefault()
  let el = ev.target.getAttribute('value')

  $([document.documentElement, document.body]).animate({
    scrollTop: $(`#${el}`).offset().top - 160
  }, 500)
}

// Nav transparent toggle

window.addEventListener('scroll', () => {

  let nav = document.getElementById('nav')
  nav.className = window.scrollY > 10 ? 'nav purpleNav' : 'nav'

})

// Menu burguer 

const mobileMenu = document.querySelector('.mobile-menu')

mobileMenu.addEventListener('click', () => {
  let menuUl = document.querySelector('.menu-ul')
  let mobileMenu = document.querySelector('.mobile-menu')

  menuUl.classList.toggle('active')
  mobileMenu.classList.toggle('active')

})