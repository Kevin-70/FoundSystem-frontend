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
  async AdminLogin (email, password) {
    try {
      const response = await fetch(`${BASE_URL}/admin/LoginEmail`, {
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
  },
  async AdminRegister (email, username, password) {
    try {
      const response = await fetch(`${BASE_URL}/admin/register`, {
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
  },
  async GetUserInfo (email, satoken) {
    try {
      const response = await fetch(`${BASE_URL}/user/getUserByMail?mail=${email}`, {
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
  async UpdateUserInfo (bio, phoneNumber, sex, satoken) {
    try {
      const response = await fetch(`${BASE_URL}/user/editMyInfo?bio=${bio}&phoneNumber=${phoneNumber}&sex=${sex}`, {
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
