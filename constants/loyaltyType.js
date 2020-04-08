export const loyaltyType = {
  tittle: 'Тип',
  fromType: 'select',
  maxSize: 2,
  data:
  [
    {
      name: 'loyaltyTypeStatus',
      settings: [
        {
          name: 'Gold',
          value: 'gold'
        },
        {
          name: 'Silver',
          value: 'silver'
        },
        {
          name: 'Bronze',
          value: 'bronze'
        }
      ]
    },
    {
      name: 'loyaltyTypeHolder',
      settings: [
        {
          name: 'Именная',
          value: 'named'
        },
        {
          name: 'Неименная',
          value: 'noname'
        }
      ]
    }
  ]
}
