<template>
  <ul class="side-bar" :class="{ 'flex-container side-bar--horisont': isHorisontal }">
    <li
      v-for="item in tabs"
      :key="item.name"
      class="side-bar-item"
      :class="{ 'side-bar-item--is-active': item.selected, 'side-bar-item--horisont': isHorisontal }"
      @click="changeActiveTabHandler(item)"
    >
      <nuxt-link :to="item.href || '/blank'">
        <div v-if="item.icon" class="side-bar-item__icon" :class="`side-bar-item__icon--${item.icon}`" />
        {{ item.name }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    isHorisontal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tabs: []
    }
  },
  mounted () {
    this.tabs = this.items
  },
  methods: {
    changeActiveTabHandler (selectedItem) {
      this.tabs.forEach((item) => {
        item.selected = (item.name === selectedItem.name)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .side-bar {
    list-style: none;
    padding: 0;
    margin: 0;
    &:not(&--horisont) {
      border-right: 1px solid #ccc;
      padding: 0 10px;
       height: 100%;
    }

    &--horisont {
      color: green;

      .side-bar-item {
        width: calc(100% / 6);
      }
    }
  }
  .side-bar-item {
    padding: 10px;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    transition: all .3s;

    &--is-active:not(&--horisont) {
      color: #cec228;
      border: 1px solid #cec228;
      border-radius: 4px;
      background-color: transparent;
    }
    &:hover:not(.side-bar-item--is-active) {
      background-color: #d0d0d082;
    }
    &--is-active {
      &.side-bar-item--horisont {
        color: #333;
        font-weight: bold;
        position: relative;

        &:after {
            content: '';
            width: 60%;
            height: 2px;
            background-color: #cec228;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
        }
      }
    }
      & a {
        text-decoration: none;
        color: inherit;
        display: block;
      }

      &__icon {
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin: 0 auto;
        &--list {
          background-image: url('~static/img/list.png')
        }
        &--users {
          background-image: url('~static/img/users.png')
        }
        &--flag {
          background-image: url('~static/img/flag.png')
        }
        &--phone {
          background-image: url('~static/img/phone.png')
        }
      }
  }
</style>
