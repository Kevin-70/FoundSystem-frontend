const BASE_URL = 'http://106.55.104.82:8080'

export default {
  async StaffLogin (email, password) {
    try {
      const response = await fetch(`${BASE_URL}/user/LoginEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          pwd: password
        })
      })
      const data = await response.json()
      return data
    } catch (error) {
      return console.error(error)
    }
  },
  async AdminLogin (username, password) {
    const response = await fetch(`${BASE_URL}/?username=${username}&password=${password}`)
    return await response.json()
  },
  async StaffRegister (email, username, password) {
    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          name: username,
          pwd: password
        })
      })
      const data = await response.json()
      return data
    } catch (error) {
      return console.error(error)
    }
  }
}
