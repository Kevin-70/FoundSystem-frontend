const BASE_URL = 'http://106.55.104.82:8080'

export default {
    async submitExpend (beginTime, endTime, expenditureName, expenditureNumber, expenditureTotalAmount,groupName,satoken) {
        try {
          const response = await fetch(`${BASE_URL}/application/edit/newExpenditureApplication?
          beginTime=${beginTime}&endTime=${endTime}&expenditureName=${expenditureName}
          &expenditureNumber=${expenditureNumber}&expenditureTotalAmount=${expenditureTotalAmount}&groupName=${groupName}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'satoken': satoken,
            },
          })
          const data = await response.json()
          return data
        } catch (error) {
          return console.error(error)
        }
      },
}