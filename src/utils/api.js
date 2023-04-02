const BASE_URL = 'http://example.com'

export default {
  StaffLogin (username, password) {
    return fetch(`${BASE_URL}/?username=${username}&password=${password}`)
      .then(response => response.json())
  },
  AdminLogin (username, password) {
    return fetch(`${BASE_URL}/?username=${username}&password=${password}`)
      .then(response => response.json())
  }
}
