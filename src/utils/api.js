const BASE_URL = 'http://106.55.104.82:8080'

export default {
  async Login (email, password, identity) {
    try {
      const response = await fetch(`${BASE_URL}/user/LoginEmail?identity=${identity}`, {
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
      const response = await fetch(`${BASE_URL}/user/LoginEmail?identity=1`, {
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
  async Register (email, username, password, identity) {
    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          name: username,
          pwd: password,
          identity: identity
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
  async UpdateUserInfo (bio, phoneNumber, sex, name, satoken) {
    try {
      const response = await fetch(`${BASE_URL}/user/editMyInfo?bio=${bio}&phoneNumber=${phoneNumber}&sex=${sex}&name=${name}`, {
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
  async GetAllGroups (satoken) {
    try {
      const response = await fetch(`${BASE_URL}/group/view/getAllGroups`, {
        method: 'GET',
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

  async GetUserByGroupName (groupName, satoken) {
    try {
      const response = await fetch(`${BASE_URL}/group/view/getAllGroups?groupName=${groupName}`, {
        method: 'GET',
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

  async StaffJoinGroup (satoken) {
    try {
      const response = await fetch(`${BASE_URL}/group/edit/joinGroup`, {
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
  async ForceJoinGroup (groupname, satoken) {
    try {
      const response = await fetch(`${BASE_URL}/group/edit/JoinApi?groupname=${groupname}`, {
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
