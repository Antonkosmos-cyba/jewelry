// В кавычнах помещается класс, который должен стать слайдером. В данном случае это
new Swiper('.image-slider', {
   navigation:{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   pagination: {
      el: '.swiper-pagination',
      
      // // bullets
      // type: 'bullets',

      // // кликабельные
      // clickable: true,
      // // Динамические буллеты
      // dynamicBullets: true,
      // // Кастомные буллеты
      // renderBullet: function (index, className) {
      //    return '<span class="' + className + '">' + (index + 1) + '</span>';
      // },
// ------------------------------------------------------------
      // Фракция
      // type: 'fraction',
      // renderFraction: function (currentClass, totalClass) {
      //    return 'Фото <span class="' + currentClass + '"></span>' + ' из ' + '<span class="' + totalClass + '"></span>'
      // },
//-------------------------------------------------------------
      // // Прогресс бар
      // type: 'progressbar',
   },
//------------------------------------------------------------
      //Скролл
      scrollbar: {
         el: '.swiper-scrollbar',
         draggable: true
      },
      // включение/отключение перетаскивания на ПК
      simulateTouch: true,
      // Чувствительность свайпа
      touchRatio: 1,
      // Угод срабатывания свайпа
      touchAngle: 45,
      // Курсор перетаскивания
      grabCursor: true,
      // Переключение при клике на слайд
      slideToClickedSlide: true,

      // Упрвление клавиатурой
      keyboard: {
         enable: true,
         onlyInViewport: true,
         pageUpDown: true,
      },

      // Управление колесом мыши
      mousewheel: {
         sensitivity: 1,
         eventsTarget: ".image-slider"
      },

      // Автовысота
      autoHeight: true,

      // Стартовый слайд
      initialSlide: 0,

      // Бесконечное прокручивание
      loop: false,

      // Количество дублирующих слайдов
      loopedSlides: 3,

      // Автопрокрутка слайдов
      // autoplay: {
         // Задержка просмотра
         // delay: 2000,
         // Автопрокрутка
         // stopOnLastSlyde: false,
         // Остановка при любом действии
         // disableOnInteraction: true,
      // },

      // Скорость смены слайдов
      speed: 800,

      // Вертикальный слайдер
      // direction: 'vertical',

      // & Эффекты --------------------------
      // Листание по умолчанию
      // effect: 'slide',

      // Смена прозрачности
      // effect: 'fade',
      // fadeEffect: {
      //    crossFade: true,
      // }

      // Переворот слайда
      // effect: 'flip',
      // flipEffect: {
         // slideShadows: true,
         // Показ только активного слайда
         // limitRotation: true,
      // },

      // Куб
      // effect: 'cube',
      // cubeEffect:{
      //    slideShaddows: true,
      //    shadow: true,
      //    shadowOffset: 20,
      //    shadowScale: 0.94,
      // },

      // Поток с наплывом
      // effect: 'coverflow',
      // coverFlowEffects: {
         // Угол
         // rotate: 20,
         // Наложение
         // stretch: 50,
         // Тень
      //    slideShadows:true,
      // },

      // Адаптив от одного до трёх
      // breakpoints: {
      //    320: {
      //       slidePerView: 1,
      //    },
      //    480: {
      //       slidePerView: 2,
      //    },
      //    992: {
      //       slidePerView: 3,
      //    }
      // },
     
});