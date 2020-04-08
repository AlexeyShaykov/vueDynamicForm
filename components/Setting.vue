<template>
  <div class="setting-item">
    <div class="form-group">
      <label for="chooseSetting">{{ name }}</label>
      <select id="" name="chooseSetting" @change="onChangeSetting($event)" ref="settingRef">
        <option v-for="setting in settings" :key="setting.value" :value="setting.value">
          {{ setting.name }}
        </option>
      </select>
    </div>
    <div v-for="(dopSetting, index) in choosenDopSettings" :key="dopSetting.name" class="form-group">
      <label :for="dopSetting.name">{{ `${dopSettings.tittle} ${index + 1}` }}</label>
      <select
        v-if="dopSettings.fromType === 'select'"
        :name="dopSetting.name"
      >
        <option v-for="setting in dopSetting.settings" :key="setting.value" :value="setting.value">
          {{ setting.name }}
        </option>
      </select>
      <div v-else class="flex-container age-range-container">
        <ValidationProvider
          v-slot="{ classes }"
          :rules="{
            required: true,
            min_value: 1,
            max_value: 100,
            numeric: true
          }">
          <label>от</label>
          <input :name="`${dopSetting.name.toLocaleLowerCase()}_minValue`" v-model="dopSetting.minValue" :class="classes">
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ classes }"
          :rules="{
            required: true,
            min_value: dopSetting.minValue,
            max_value: 100,
            numeric: true
          }"
        >
          <label>до</label>
          <input :name="`${dopSetting.name.toLocaleLowerCase()}_maxValue`" v-model="dopSetting.maxValue" :class="classes">
        </ValidationProvider>
      </div>
    </div>
    <div v-if="dopSettings && dopSettings.data" class="settings-btns settings-btns--add" @click="addNewSettingsHandler">
      <div class="settings-btns--add--icon settings-btns--icon" />
      <span>Добавить {{ dopSettings.tittle.toLocaleLowerCase() }}</span>
    </div>
    <div class="settings-btns settings-btns--delete" @click="deleteSetingHandler">
      <div class="settings-btns--delete--icon settings-btns--icon" />
      <span> Удалить условие</span>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationProvider
  },
  props: {
    settings: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: 0
    },
    deleteHandler: {
      type: Function,
      default: () => {}
    },
    chooseSettings: {
      type: Function,
      default: () => {}
    },
    dopSettings: {
      type: Object,
      default: () => {}
    },
    clearSettings: {
      type: Function,
      default: () => {}
    },
    deleteSelectedDopSetting: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      choosenDopSettings: []
    }
  },
  watch: {
    dopSettings (newVal) {
      if (newVal && newVal.data) {
        this.choosenDopSettings = newVal.data.slice(0, 1)
      } else {
        this.choosenDopSettings = []
      }
    }
  },
  methods: {
    deleteSetingHandler () {
      this.deleteHandler(this.id)
    },
    onChangeSetting ({ target }) {
      const { value, name } = target
      if (value === 'default') {
        this.clearSettings(this.id)
        this.deleteSelectedDopSetting(this.id)
        return
      }
      if (this.chooseSettings(this.id, value, name)) {
        this.$refs.settingRef.value = 'default'
        this.choosenDopSettings = []
        this.clearSettings(this.id)
      }
    },
    addNewSettingsHandler () {
      if (this.choosenDopSettings.length === this.dopSettings.maxSize) {
        this.$toast.show(`Максимально два ${this.dopSettings.tittle.toLocaleLowerCase()}а для этого условия`, { duration: 1000, position: 'bottom-right', type: 'error' })
        return
      }
      this.choosenDopSettings.push(this.dopSettings.data.slice(this.choosenDopSettings.length, this.choosenDopSettings.length + 1)[0])
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-item {
  position: relative;
  min-height: 120px;
  padding-bottom: 16px;
  .form-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0 20px;
      position: relative;
    & select {
        padding: 5px;
        background-color: #fff;
        border-radius: 4px;
        width: 500px;
    }

    & .age-range-container {
      & input {
          height: 40px;
          padding-left: 10px;
          border: solid 1px #ccc;
          border-radius: 4px;
          width: 100px;
          &.changed.failed {
              border-color: red;
              background: #FDD;
          }
      }

      & span:last-child {
        margin-left: 16px;
      }
    }
  }

  .settings-btns {
    padding: 10px;
    display: flex;
    border: 2px solid #cec228;
    color: #cec228;
    border-radius: 4px;
    max-width: 198px;
    cursor: pointer;
    align-items: center;

    &--icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      background-repeat: no-repeat;
    }

    &--add {
      &--icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40' x='0px' y='0px'%3E%3Cg data-name='1-' fill='%23cec228'%3E%3Cpath d='M31,16a1,1,0,0,1-1,1H17V30a1,1,0,0,1-2,0V17H2a1,1,0,0,1,0-2H15V2a1,1,0,0,1,2,0V15H30A1,1,0,0,1,31,16Z'/%3E%3C/g%3E%3C/svg%3E");
      }
    }

    &--delete {
      border: 2px solid red;
      color: red;
      position: absolute;
      right: 0;
      bottom: 16px;
      height: 44px;

      &--icon {
        height: 27px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 612 990' enable-background='new 0 0 612 792' xml:space='preserve' fill='%23FF0000'%3E%3Cg%3E%3Cg%3E%3Cpath d='M536.943,200.356c0-22.644-18.43-41.073-41.073-41.073H386.83v-14.642c0-19.099-15.542-34.642-34.642-34.642h-92.377 c-19.099,0-34.642,15.542-34.642,34.642v14.642H116.13c-22.644,0-41.073,18.429-41.073,41.073v51.304h23.094v407.28 c0,23.741,19.318,43.06,43.06,43.06h329.568c23.752,0,43.06-19.318,43.06-43.06V251.66h23.094v-51.304H536.943z M248.264,144.642 c0-6.374,5.185-11.547,11.547-11.547h92.377c6.362,0,11.548,5.173,11.548,11.547v14.642H248.264V144.642z M490.755,658.94 c0,11.017-8.961,19.965-19.965,19.965H141.21c-11.016,0-19.965-8.948-19.965-19.965V251.66h369.51V658.94z M513.849,228.566 H98.151v-28.209c0-9.919,8.06-17.979,17.979-17.979h109.04h161.66h109.04c9.919,0,17.979,8.06,17.979,17.979V228.566z'/%3E%3C/g%3E%3Cpath d='M306,648.017c5.726,0,10.373-4.637,10.373-10.373V295.339c0-5.736-4.647-10.373-10.373-10.373s-10.373,4.637-10.373,10.373 v342.305C295.627,643.38,300.274,648.017,306,648.017z'/%3E%3Cpath d='M182.271,648.017c5.726,0,10.373-4.637,10.373-10.373V295.339c0-5.736-4.647-10.373-10.373-10.373 c-5.726,0-10.373,4.637-10.373,10.373v342.305C171.898,643.38,176.545,648.017,182.271,648.017z'/%3E%3Cpath d='M429.729,648.017c5.727,0,10.373-4.637,10.373-10.373V295.339c0-5.736-4.646-10.373-10.373-10.373 c-5.726,0-10.373,4.637-10.373,10.373v342.305C419.355,643.38,424.003,648.017,429.729,648.017z'/%3E%3C/g%3E%3C/svg%3E");
      }
    }
  }
}

</style>
