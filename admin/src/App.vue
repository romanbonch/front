<template>
  <router-view/>
  <transition name="popup">
    <y-popup-error />
  </transition>
  <transition name="popup">
    <y-popup />
  </transition>
  <transition name="popup">
    <y-popup-warn />
  </transition>
</template>

<script>
export default {
  computed: {

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
:root {
  --font-rubik: 'Rubik', sans-serif;
  --light: hsl(0, 0%, 100%);
  --light-opacity: hsla(0, 0%, 100%, 0.27);
  font-family: var(--font-rubik);
  font-size: calc(.5vw + .5rem);
  color: var(--light);
  --acrylic-blur-dark: rgb(7 8 12 / 53%);
  --acrylic-blur-light: rgba(17, 25, 40, 0.75);/*Прозрачный фон всех элементов*/
  --border-dark: rgba(113 119 144 / 25%);
  --border-light: rgb(113 119 144 / 12%);/*Обводка*/
  --content-bg-dark: rgb(146 151 179 / 13%); /*Второй фон для всех элементов*/
  --inactive-color: rgb(113 119 144 / 78%); /*Цвет неактивных ссылок*/
  --active-color: #faf9fb; /*Цвет активных ссылок*/
  box-sizing: border-box;
  background-image: url('@/assets/img/bg.png');
  background-size: cover;
  background-attachment: fixed;
}

*,
::before,
::after {
  padding: 0;
  border: none;
  margin: 0;
  background: none;
  user-select: none;
  box-sizing: inherit;
  text-decoration: none;
}

.link:link,
.link:visited,
.link:hover,
.link:active {
  color: var(--light);
}

#app {
  position: relative;
}

.popup-enter-active,
.popup-leave-active {
  transform: translateY(0);
  transition: opacity 0.15s ease, translate .15s ease-out;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}
</style>
