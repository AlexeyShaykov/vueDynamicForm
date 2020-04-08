<template>
  <div class="flex-container h100">
    <side-bar
      :items="[
        { name: 'Опросы', selected: false, icon: 'list' },
        { name: 'Пользователи', href: '/', selected: true, icon: 'users' },
        { name: 'Чёрные списки', selected: false, icon: 'flag' },
        { name: 'Колл-центр', selected: false, icon: 'phone' }
      ]"
    />
    <div class="w100 main-container">
      <side-bar
        :items="[
          { name: 'Параметры', selected: false },
          { name: 'Вопросы', selected: false },
          { name: 'Логика', selected: false },
          { name: 'Условия', selected: false },
          { name: 'Респонденты', href: '/', selected: true }
        ]"
        is-horisontal
      />
      <nuxt />
    </div>
  </div>
</template>

<script>
import SideBar from '~/components/SideBar.vue'

export default {
  components: {
    SideBar
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  box-sizing: border-box;
  height: 100vh;

  & body {
    height: 100vh;
    > div {
      height: 100%;
      > div {
        height: 100%;
      }
    }
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.flex-container {
  display: flex;
}

.toasted-container {
  max-height: 55px;
}

.w100 {
  width: 100%;
}

.h100 {
  height: 100%;
}

.br4 {
  border-radius: 4px;
}

.main-container {
  padding: 20px 40px;
}

</style>
