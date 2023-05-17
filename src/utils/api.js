// import { da } from "element-plus/es/locale"

const BASE_URL = 'http://43.139.159.107:8080'

export default {
    async Login(email, password, identity) {
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
    async AdminLogin(email, password) {
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
    async Register(email, username, password, identity) {
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
    async GetUserInfo(email, satoken) {
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
    async GetUserInfo(email, identity, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/user/getUserByMailAndIdentity?identity=${identity}&mail=${email}`, {
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
    async GetMyInfo(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/user/getMyInfo`, {
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
    async UpdateUserInfo(bio, phoneNumber, sex, name, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/user/editMyInfo?bio=${bio}&name=${name}&phoneNumber=${phoneNumber}&sex=${sex}`, {
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
    async GetAllGroups(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/getAllGroups`, {
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
    async GetUserByGroupName(groupName, satoken) {
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
    async StaffJoinGroup(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/joinGroup`, {
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
    async ForceJoinGroup(groupname, satoken) {
        try {
            const response = await fetch(`${BASE_URL}/group/edit/JoinApi?groupName=${groupname}`, {
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
    async QuitLogin(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/user/logout`, {
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
    async IfLogin(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/user/isLogin`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            const data = await response.json()
            if (data.code === 200) {
                return data.data === 'isLogin: true'
            } else {
                return false
            }
        } catch (error) {
            return console.error(error)
        }
    },
    async GetAllExpenditure(satoken) {
        try {
            const response = await fetch(`${BASE_URL}/view/getAllExpenditureInfo`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            return await response.json()
        } catch (error) {
            return console.error(error)
        }
    },
    async GetOneExpenditureAllInfo(satoken, expenditureNumber) {
        try {
            const response = await fetch(`${BASE_URL}expenditure/view/getOneExpenditureAllInfo?expenditureNumber=${expenditureNumber}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'satoken': satoken,
                },
            })
            return await response.json()
        } catch (error) {
            return console.error(error)
        }
    },
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