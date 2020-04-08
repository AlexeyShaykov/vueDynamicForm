export const loyaltyCardStatus = {
  tittle: 'Статус',
  maxSize: 2,
  fromType: 'select',
  data:
  [
    {
      name: 'loyaltyCardOption',
      settings: [
        {
          name: 'Активна',
          value: 'active'
        },
        {
          name: 'Неактивна',
          value: 'noactive'
        }
      ]
    },
    {
      name: 'loyaltyCardCacheBack',
      settings: [
        {
          name: 'С кеш-беком',
          value: 'withcaheback'
        },
        {
          name: 'Без кеш-бека',
          value: 'withoutcacheback'
        }
      ]
    }
  ]
}
