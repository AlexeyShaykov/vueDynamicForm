<template>
  <div class="settings-container" :class="{ 'settings-container--loading': loading }">
    <ValidationObserver ref="registrationForm">
      <form ref="settigsform">
        <setting
          v-for="(setting, index) in settings"
          :id="index"
          :key="setting.name"
          :settings="setting.settings"
          :name="setting.name"
          :delete-handler="deleteSettingHandler"
          :choose-settings="chooseSettingsHandler"
          :clear-settings="clearSettingsHandler"
          :delete-selected-dop-setting="deleteSelectedDopSetting"
          :dop-settings="setting.dopSettings"
        />
      </form>
    </ValidationObserver>
    <div class="add-new-settings-container">
      <div class="text-container">
        <div class="text-container__icon" @click="addNewSettingsHandler" />
        <div class="text-container__title">
          Нажмите, чтобы добавить новое условие выборки.<br>
          Все условия связываются между собой логическим "И"
        </div>
      </div>
    </div>
    <div class="footer-btn-container flex-container" @click="handleSubmit">
      <div class="footer-btn-container__start-test br4">
        Протестировать опрос
      </div>
      <div class="footer-btn-container__next-btn br4" @click="gotToNextForm">
        Далее
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

import Setting from '~/components/Setting.vue'

export default {
  components: {
    Setting,
    ValidationObserver
  },
  data () {
    return {
      settings: [],
      loading: false,
      selectedDopSettings: [],
      formSent: false
    }
  },
  methods: {
    addNewSettingsHandler () {
      this.$toast.show('Загрузка ...', { position: 'bottom-right', type: 'info' })
      this.$api.get('newSetting').then(({ data }) => {
        data.unshift({ name: 'Выберите условие', value: 'default' })
        this.settings.push({
          name: `Условие ${this.settings.length + 1}`,
          settings: data
        })
        this.$toast.clear()
      })
    },
    handleSubmit () {
      if (!this.settings.length) {
        this.$toast.show('Добавьте одно из условий', { duration: 1000, position: 'bottom-right', type: 'error' })
        return
      }
      // eslint-disable-next-line curly
      if (!this.$refs.registrationForm) return
      this.$refs.registrationForm.validate().then((data) => {
        if (!data) {
          this.$toast.show('Форма невалидна', { duration: 1000, position: 'bottom-right', type: 'error' })
          return
        }
        const formData = new FormData(this.$refs.settigsform)
        formData.delete('chooseSetting')
        this.$toast.show('Отправляю ...', { position: 'bottom-right', type: 'info' })
        this.loading = true
        this.$api.post('postForm', formData).then(() => {
          this.$toast.clear()
          console.log('Success request ', JSON.stringify(Object.fromEntries(formData)))
          this.loading = false
          this.formSent = true
          this.$toast.show('Форма отправлена', { duration: 1000, position: 'bottom-right', type: 'success' })
        })
      })
    },
    gotToNextForm () {
      if (!this.formSent) {
        this.$toast.show('Необходимо отправить форму', { duration: 1000, position: 'bottom-right', type: 'error' })
        return
      }
      this.$router.push({ path: '/blank' })
    },
    deleteSettingHandler (settingId) {
      this.settings.splice(settingId, 1)
      this.deleteSelectedDopSetting(settingId, 1)
      this.settings = this.settings.map((setting, index) => ({ ...setting, ...{ name: `Условие ${index + 1}` } }))
    },
    deleteSelectedDopSetting (settingId) {
      this.selectedDopSettings.splice(settingId, 1)
    },
    chooseSettingsHandler (settingId, type, name) {
      if (this.selectedDopSettings.includes(type)) {
        const name = this.settings[0].settings.filter(setting => setting.value === type)[0].name || type
        this.$toast.show(`Условие ${name} уже выбранно`, { duration: 1000, position: 'bottom-right', type: 'error' })
        return true
      }
      this.$toast.show('Загрузка ...', { position: 'bottom-right', type: 'info' })
      this.$api.get(type).then(({ data }) => {
        const setting = this.settings[settingId]
        setting.dopSettings = data
        this.settings.splice(settingId, 1, setting)
        if (this.settings.length === this.selectedDopSettings.length) {
          this.selectedDopSettings.splice(settingId, 1, type)
        } else {
          this.selectedDopSettings.push(type)
        }
        this.$toast.clear()
      })
    },
    clearSettingsHandler (settingId) {
      const setting = this.settings[settingId]
      setting.dopSettings = {}
      this.settings.splice(settingId, 1, setting)
    }
  }
}
</script>

<style lang="scss">
.settings-container {
  padding: 20px 90px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: opacity .5s;

  &--loading {
    opacity: .5;
    pointer-events: none;
  }

  & .add-new-settings-container {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px 0;

   & .text-container {
      max-width: 418px;
      color: green;
      margin: 0 auto;
      text-align: center;

      &__icon {
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        margin: 0 auto;
        cursor: pointer;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40' x='0px' y='0px'%3E%3Cg data-name='1-' fill='%23008000'%3E%3Cpath d='M31,16a1,1,0,0,1-1,1H17V30a1,1,0,0,1-2,0V17H2a1,1,0,0,1,0-2H15V2a1,1,0,0,1,2,0V15H30A1,1,0,0,1,31,16Z'/%3E%3C/g%3E%3C/svg%3E");
      }
    }
  }

  & .footer-btn-container {
    background-color: #cccccc47;
    padding: 20px;
    margin-top: 20px;
    margin-left: -90px;
    width: calc(100% + 180px);
    align-items: center;
    justify-content: space-between;

    &__start-test {
      padding: 10px;
      background: #fff;
      color: green;
      cursor: pointer;
    }

    &__next-btn {
      padding: 10px;
      background: green;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
